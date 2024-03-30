import React, { useEffect, useMemo, useState } from "react";
import "./TransactionsList.scss";
import { Button } from "react-bootstrap";
import { Transactions } from "../../components/Transactions/Transactions";
import { FiDownload } from "react-icons/fi";
import { useSelector } from "react-redux";
import { selectUserData } from "../Login/LoginSlice";
import { getAllTransactions, totalExpenses } from "../../shared/constant";
import { LuDot, LuIndianRupee } from "react-icons/lu";
import { selectFilterData } from "../../components/FilterData/FilterSlice";
import noResult from "../../../src/assets/icons/no-results.png";
import FileSaver from "file-saver";
import XLSX from "sheetjs-style";
export const Expense = () => {
	const { name, role } = useSelector(selectUserData);
	const [transactionsData, setTransactionsData] = useState([]);

	const { financialYear, searchTerm, selectedCategoryList } =
		useSelector(selectFilterData);

	useEffect(() => {
		getAllTransactions().then((res) => {
			res.sort(function (a: any, b: any) {
				return +new Date(b?.createdAt) - +new Date(a?.createdAt);
			});
			setTransactionsData(res);
		});
	}, []);

	/* Fetch and update the state once */
	// eslint-disable-next-line react-hooks/exhaustive-deps
	// const selectedCategory = ['Pooja material', 'Flex', 'Snacks'];

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
							item?.transactionDate >= yearStartDate &&
							item?.transactionDate <= yearEndDate
					);

				case "user":
					return transactionsData?.filter(
						(item: any) =>
							item?.personName === name &&
							item?.transactionDate >= yearStartDate &&
							item?.transactionDate <= yearEndDate
					);
			}
		}
        if (selectedCategoryList.length > 0) {
            return transactionsData.filter((el: any) => {
                return selectedCategoryList.some((f: any) => {
                    return f === el.category;
                });
            });
			// switch (role) {
			// 	case "admin":
					
			// }
		}
		if (searchTerm) {
			const lowercasedValue = searchTerm.toLowerCase().trim();
			switch (role) {
				case "admin":
					return transactionsData.filter((item: any) => {
						const searchByName = item?.personName
							.toLowerCase()
							.includes(lowercasedValue);
						const searchByCategory = item?.category
							.toLowerCase()
							.includes(lowercasedValue);
						return searchByName || searchByCategory;
					});

				case "user":
					return transactionsData.filter((item: any) => {
						const searchByCategory =
							item?.personName === name &&
							item?.category.toLowerCase().includes(lowercasedValue);
						return searchByCategory;
					});
			}
		}
		
		filteredData = transactionsData?.filter(
			(item: any) => item?.personName === name
		);
		if (role === "admin") {
			return transactionsData;
		} else {
			return filteredData;
		}
	}, [
		financialYear,
		name,
		role,
		searchTerm,
		transactionsData,
		selectedCategoryList,
	]);

	const total = totalExpenses(filteredValues);

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
				"Person Name": item?.personName,
				Category: item?.category,
				Amount: parseFloat(item?.amount),
				"Transaction Date": item?.transactionDate,
				Description: item?.description,
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
						<Transactions data={item} key={item.id} transactionId={item.id} />
					))
				)}
			</div>
		</>
	);
};
