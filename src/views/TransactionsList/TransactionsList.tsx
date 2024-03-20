import React, { useEffect, useMemo, useState } from "react";
import "./TransactionsList.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { Badge, Button, Form } from "react-bootstrap";
import { FiFilter } from "react-icons/fi";
import { Transactions } from "../../components/Transactions/Transactions";
import { FiDownload } from "react-icons/fi";
import { useSelector } from "react-redux";
import { selectUserData } from "../Login/LoginSlice";
import { getAllTransactions, totalExpenses } from "../../shared/constant";
import { LuDot, LuIndianRupee } from "react-icons/lu";
import { FilterData } from "../../components/FilterData/FilterData";
import { selectFilterData } from "../../components/FilterData/FilterSlice";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "../../shared/firebase";
import { useNavigate } from "react-router-dom";
import noResult from "../../../src/assets/icons/no-results.png";
import FileSaver from "file-saver";
import XLSX from "sheetjs-style";

export const TransactionsList = () => {
	const { setTitle, setShowBackArrow } = useHeaderContext();
	const { name, role } = useSelector(selectUserData);
	const [transactionsData, setTransactionsData] = useState([]);
	const [openFilter, setOpenFilter] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>("");

	const { financialYear, updatedTransactionId } = useSelector(selectFilterData);
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
		if (updatedTransactionId) {
			navigate("/expenseDetails/" + updatedTransactionId, {
				state: { id: updatedTransactionId },
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate]);

	useEffect(() => {
		setTitle("All transactions");
		setShowBackArrow(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		//allTransactions();
		getAllTransactions().then((res) => {
			res.sort(function (a: any, b: any) {
				return +new Date(b?.data?.createdAt) - +new Date(a.data?.createdAt);
			});
			setTransactionsData(res);
		});
	}, []);

	/* Fetch and update the state once */

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
		if (financialYear !== "") {
			const getMinYear = financialYear.split("-")[0];
			const getMaxYear = financialYear.split("-")[1];
			const yearStartDate = getMinYear + "-04-01";
			const yearEndDate = getMaxYear + "-03-31";

			switch (role) {
				case "admin":
					return transactionsData?.filter(
						(item: any) =>
							item?.data?.transactionDate >= yearStartDate &&
							item?.data?.transactionDate <= yearEndDate
					);

				case "user":
					return transactionsData?.filter(
						(item: any) =>
							item?.data?.personName === name &&
							item?.data?.transactionDate >= yearStartDate &&
							item?.data?.transactionDate <= yearEndDate
					);
			}
		}
		if (searchTerm) {
			const lowercasedValue = searchTerm.toLowerCase().trim();
			switch (role) {
				case "admin":
					return transactionsData.filter((item: any) => {
						const searchByName = item?.data?.personName
							.toLowerCase()
							.includes(lowercasedValue);
						const searchByCategory = item?.data?.category
							.toLowerCase()
							.includes(lowercasedValue);
						return searchByName || searchByCategory;
					});

				case "role":
					return transactionsData.filter((item: any) => {
						const searchByCategory =
							item?.data?.personName === name &&
							item?.data?.category.toLowerCase().includes(lowercasedValue);
						return searchByCategory;
					});
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
	}, [financialYear, name, role, searchTerm, transactionsData]);

	const total = totalExpenses(filteredValues);

	const filterBySearch = (event: any) => {
		setSearchTerm(event);
	};

	const exportFile = () => {
		const fileType =
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF=8";
		const fileExtension = ".xlsx";
		const filename = financialYear
			? "ExpensesData-" + financialYear
			: "ExpensesData";

		const excelData: any = [];
		filteredValues.filter((item: any) =>
			excelData.push({
				"Person Name": item?.data?.personName,
				Category: item?.data?.category,
				Amount: parseFloat(item?.data?.amount),
				"Transaction Date": item?.data?.transactionDate,
				Description: item?.data?.description,
			})
		);

		const ws = XLSX.utils.json_to_sheet(excelData);
		const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, filename + fileExtension);
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
						{financialYear.length > 0 && (
							<Badge
								bg="primary"
								className="transactions__search-filter--badge"
							>
								1
							</Badge>
						)}
					</div>
				</div>
				<div
					className="transactions__appliedFilter mb-3"
					data-testid="transactionsListWrapper_appliedFilterAmount"
				>
					<div className="transactions__appliedFilter-total">
						Amount : <LuIndianRupee />
						{total}
						<LuDot /> Total: {filteredValues.length}
					</div>
					{role === "admin" && (
						<div
							className="transactions__download"
							data-testid="transactionsListWrapper__download"
						>
							<Button
								variant="success"
								onClick={exportFile}
								disabled={filteredValues.length === 0}
							>
								<FiDownload />
							</Button>
						</div>
					)}
				</div>
				{/* <div
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
				</div> */}
				<div
					className="transactions__content"
					data-testid="transactionsListWrapper_content"
				>
					{filteredValues.length === 0 ? (
						<div className="transactions__content-noData">
							<img src={noResult} alt="no results" />
							Data not found. Add new data or search with different keywords!
						</div>
					) : (
						filteredValues?.map((item: any) => (
							<Transactions
								data={item?.data}
								key={item.id}
								transactionId={item.id}
							/>
						))
					)}
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
