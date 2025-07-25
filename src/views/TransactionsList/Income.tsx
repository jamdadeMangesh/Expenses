import React, { useEffect, useMemo, useState } from "react";
import "./TransactionsList.scss";
import { Button } from "react-bootstrap";
import { FiDownload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../Login/LoginSlice";
import {
	getAllIncomeTransactions,
	getCategoryIcon,
	totalExpenses,
} from "../../shared/constant";
import { LuDot, LuIndianRupee } from "react-icons/lu";
import { selectFilterData, SET_TOTAL_INCOME } from "../../components/FilterData/FilterSlice";
import { useNavigate } from "react-router-dom";
import noResult from "../../../src/assets/icons/no-results.png";
import FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { DateTime } from "luxon";

export const Income = () => {
	const { name, role } = useSelector(selectUserData);
	const [transactionsData, setTransactionsData] = useState([]);
	const dispatch = useDispatch();

	const { financialYear, searchTerm, selectedCategoryList } = useSelector(selectFilterData);
	const navigate = useNavigate();

	useEffect(() => {
		getAllIncomeTransactions().then((res) => {
			res.sort(function (a: any, b: any) {
				return +new Date(b?.createdAt) - +new Date(a?.createdAt);
			});
			setTransactionsData(res);
		});
	}, []);

	/* Fetch and update the state once */

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
					return f === el.incomeCategory;
				});
			});
		}
		if (searchTerm) {
			const lowercasedValue = searchTerm.toLowerCase().trim();
			switch (role) {
				case "admin":
					return transactionsData.filter((item: any) => {
						const searchByName = item?.personName
							.toLowerCase()
							.includes(lowercasedValue);
						const searchByCategory = item?.incomeCategory
							?.toLowerCase()
							.includes(lowercasedValue);
						return searchByName || searchByCategory;
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
	}, [financialYear, name, role, searchTerm, transactionsData, selectedCategoryList]);

	const total = totalExpenses(filteredValues);

	useEffect(() => {
		dispatch(SET_TOTAL_INCOME(totalExpenses(filteredValues)))
	}, [dispatch, filteredValues]);

	const exportFile = () => {
		const fileType =
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF=8";
		const fileExtension = ".xlsx";
		const filename = financialYear
			? "IncomeData-" + financialYear
			: "IncomeData";

		const excelData: any = [];
		filteredValues.filter((item: any) =>
			excelData.push({
				"Received From": item?.receivedFrom,
				"Payment mode": item?.paymentMode,
				Amount: parseFloat(item?.amount),
				Category: item?.incomeCategory,
				"Bank Name": item?.bankName,
				"Transaction Date": item?.transactionDate,
				"Person Name": item?.personName,
				Description: item?.description,
			})
		);

		const ws = XLSX.utils.json_to_sheet(excelData);
		const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, filename + fileExtension);
	};

	const onClickIncome = (id: string) => {
		navigate("/incomeDetails/" + id, {
			state: { id: id },
		});
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
						<div
							className="transactions__grid"
							key={item.id}
							onClick={() => onClickIncome(item.id)}
							data-testid="transactions__grid"
						>
							<div
								className="transactions__grid-icon shadow-sm"
								data-testid="transactions__grid_icon"
							>
								<img
									src={getCategoryIcon(item.incomeCategory)}
									alt={item.incomeCategory}
								/>
							</div>
							<div className="transactions__grid-group">
								<div
									className="transactions__grid-group--name"
									data-testid="transactions__grid_category"
								>
									{item.incomeCategory}
								</div>
								<div className="transactions__grid-group--date">
									{role === "admin" && (
										<span data-testid="transactions__grid_name">
											{item.personName !== "" && item.personName}{" "}
										</span>
									)}
									<span data-testid="transactions__grid_spentDate">
										{item.personName !== "" && role === "admin" && <LuDot />}{" "}
										{DateTime.fromISO(item.transactionDate).toFormat(
											"dd MMM yyyy"
										)}
									</span>
								</div>
							</div>
							<div
								className="transactions__grid-amount transactions__grid-amount--income"
								data-testid="transactions__grid_amount"
							>
								+<LuIndianRupee />
								{item.amount}
							</div>
						</div>
					))
				)}
			</div>
		</>
	);
};
