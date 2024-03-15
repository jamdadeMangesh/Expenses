import React, { useEffect, useMemo, useState } from "react";
import "./TransactionsList.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { Button, Form } from "react-bootstrap";
import { FiFilter } from "react-icons/fi";
import { Transactions } from "../../components/Transactions/Transactions";
import { FiDownload } from "react-icons/fi";
import { FaTag, FaUser } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { useSelector } from "react-redux";
import { selectUserData } from "../Login/LoginSlice";
import { getAllTransactions, totalExpenses } from "../../shared/constant";
import { LuIndianRupee } from "react-icons/lu";
import { FilterData } from "../../components/FilterData/FilterData";
import { selectFilterData } from "../../components/FilterData/FilterSlice";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "../../shared/firebase";
import { useNavigate } from "react-router-dom";

export const TransactionsList = () => {
	const { setTitle, setShowBackArrow } = useHeaderContext();
	const { name, role } = useSelector(selectUserData);
	const [transactionsData, setTransactionsData] = useState([]);
	const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

	const { selectedFilteredUsername, filterType, selectedCategoryList } = useSelector(selectFilterData);
	const navigate = useNavigate();
    useEffect(() => {
		onAuthStateChanged(authentication, (user) => {
			if (user) {
				navigate("/transactionsList");
			} else {
				navigate("/login");
			}
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
    
    useEffect(() => {
		setTitle("All transactions");
		setShowBackArrow(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		//allTransactions();
		getAllTransactions().then((res) => {
			res.sort(function (a: any, b: any) {
				return (
					+new Date(b?.data?.transactionDate) -
					+new Date(a.data?.transactionDate)
				);
			});
			setTransactionsData(res);
		});
	}, []);

	console.log("transactionsData:", transactionsData);

	// const filteredValues = useMemo(() => {
	// 	let filteredDataArray: any = [];
	// 	let filteredData: any = [];
	// 	switch (filterType) {
	// 		case "personName": {
	// 			filteredDataArray = transactionsData?.filter(
	// 				(item: any) => item?.data?.personName === selectedFilteredUsername
	// 			);
	// 			return filteredDataArray;
	// 		}
    //         case "category": {
    //             // filteredDataArray = transactionsData?.filter(
	// 			// 	(item: any) => item?.category?.includes(selectedCategoryList)
	// 			// );
    //             // filteredDataArray = transactionsData.filter(
    //             //     function(e) {
    //             //       return selectedCategoryList.indexOf(e) < 0;
    //             //     }
    //             // );
                
    //             filteredDataArray = transactionsData.filter((itemX: any) => selectedCategoryList.includes(itemX?.data.category));
	// 			return filteredDataArray;
    //         }
	// 		default: {
    //             if(searchTerm) {
    //                 const lowercasedValue = searchTerm.toLowerCase().trim();
    //                 return transactionsData.filter((item: any) => {
    //                     const searchByName = item?.data?.personName.toLowerCase().includes(lowercasedValue);
    //                     const searchByCategory = item?.data?.category.toLowerCase().includes(lowercasedValue);
    //                     return searchByName || searchByCategory;
    //                 })
    //             }
	// 			filteredData = transactionsData?.filter(
	// 				(item: any) => item?.data?.personName === name
	// 			);
	// 			if (role === "admin") {
	// 				return transactionsData;
	// 			} else {
	// 				return filteredData;
	// 			}
    //         }
	// 	}
	// }, [filterType, selectedFilteredUsername, transactionsData, searchTerm, selectedCategoryList]);

    const filteredValues = useMemo(() => {
        let filteredData: any = [];
        if(searchTerm) {
            const lowercasedValue = searchTerm.toLowerCase().trim();
            if(role === "admin") {
                return transactionsData.filter((item: any) => {
                    const searchByName = item?.data?.personName.toLowerCase().includes(lowercasedValue);
                    const searchByCategory = item?.data?.category.toLowerCase().includes(lowercasedValue);
                    return searchByName || searchByCategory;
                })
            } else {
                return transactionsData.filter((item: any) => {
                    const searchByCategory = item?.data?.personName === name && item?.data?.category.toLowerCase().includes(lowercasedValue);
                    return searchByCategory;
                })
            }
            
        }
        filteredData = transactionsData?.filter(
            (item: any) => item?.data?.personName === name
        );
        if (role === "admin") {
            return transactionsData;
        } else {
            return filteredData;
        }
    }, [name, role, searchTerm, transactionsData]);

	const total = totalExpenses(filteredValues);

	console.log("filteredValues:", filteredValues);

    const filterBySearch = (event: any) => {
		setSearchTerm(event);
	};
	return (
		<>
			<div
				className="transactionsListWrapper"
				data-testid="transactionsListWrapper"
			>
				<div
					className="transactions__search mb-3"
					data-testid="transactionsListWrapper_search"
				>
					<div className="transactions__search-input">
						<Form.Group controlId="search">
							<Form.Control
								type="text"
								placeholder="Search"
								data-testid="transactionsListWrapper_searchInput"
                                onChange={(e) => filterBySearch(e.target.value)}
							/>
						</Form.Group>
					</div>
					<div
						className="transactions__search-filter"
						data-testid="transactionsListWrapper_filter"
					>
						<FiFilter onClick={() => setOpenFilter(true)} />
					</div>
				</div>
				<div
					className="transactions__appliedFilter mb-3"
					data-testid="transactionsListWrapper_appliedFilter"
				>
					<div className="transactions__appliedFilter-total">
						Total Amount : <LuIndianRupee />
						{total}
					</div>
					{role === "admin" && (
						<div
							className="transactions__download"
							data-testid="transactionsListWrapper__download"
						>
							<Button variant="success">
								<FiDownload />
							</Button>
						</div>
					)}
				</div>
				<div
					className="transactions__appliedFilter mb-3"
					data-testid="transactionsListWrapper_appliedFilter"
				>
					<div className="transactions__appliedFilter-list">
						{selectedFilteredUsername && (
							<>
								<FaUser />
								<span>{selectedFilteredUsername}</span>
								<LuDot />
							</>
						)}
						<FaTag /> <span>Snacks</span> <span>Travel</span>
					</div>
				</div>
				<div
					className="transactions__content"
					data-testid="transactionsListWrapper_content"
				>
					{filteredValues?.map((item: any) => (
						<Transactions data={item?.data} key={item.id} transactionId={item.id} />
					))}
				</div>
			</div>
			{openFilter && (
				<>
					<div
						className="filterBackground"
						onClick={() => setOpenFilter(false)}
					></div>
					<FilterData
						openFilter={openFilter}
						setOpenFilter={() => setOpenFilter(false)}
					/>
				</>
			)}
            <ToastContainer position="bottom-center" autoClose={false} />
		</>
	);
};
