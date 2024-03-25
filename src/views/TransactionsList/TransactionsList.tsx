import React, { useEffect, useState } from "react";
import "./TransactionsList.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { Badge, Form } from "react-bootstrap";
import { FiFilter } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../Login/LoginSlice";
import {
	getAllIncomeTransactions,
	getAllTransactions,
	totalExpenses,
} from "../../shared/constant";
import { LuIndianRupee } from "react-icons/lu";
import { FilterData } from "../../components/FilterData/FilterData";
import {
	SET_SEARCH_TERM,
	SET_TYPE,
	selectFilterData,
} from "../../components/FilterData/FilterSlice";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "../../shared/firebase";
import { useNavigate } from "react-router-dom";
import {
	BiSolidCaretDownCircle,
	BiSolidCaretUpCircle,
	BiSolidChevronDownCircle,
	BiSolidChevronUpCircle,
} from "react-icons/bi";
import { Expense } from "./Expense";
import { Income } from "./Income";

export const TransactionsList = () => {
	const { setTitle, setShowBackArrow, setShowAddNewButton } =
		useHeaderContext();
	const { role } = useSelector(selectUserData);
	const [expenseData, setExpenseData] = useState([]);
	const [incomeData, setIncomeData] = useState([]);
	const [openFilter, setOpenFilter] = useState<boolean>(false);

	const { financialYear, updatedTransactionId, listType, transactionType } =
		useSelector(selectFilterData);
	const navigate = useNavigate();
	const dispatch = useDispatch();
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
	console.log("transactionType:", transactionType);
	useEffect(() => {
		if (updatedTransactionId !== "" && transactionType === "Income") {
			navigate("/incomeDetails/" + updatedTransactionId, {
				state: { id: updatedTransactionId },
			});
		}
		if (updatedTransactionId !== "" && transactionType === "Expense") {
			navigate("/expenseDetails/" + updatedTransactionId, {
				state: { id: updatedTransactionId },
			});
		}
	}, [navigate, updatedTransactionId, transactionType]);

	useEffect(() => {
		setTitle("All transactions");
		setShowBackArrow(false);
		setShowAddNewButton(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getAllTransactions().then((res) => {
			setExpenseData(res);
		});
	}, []);

	useEffect(() => {
		getAllIncomeTransactions().then((res) => {
			setIncomeData(res);
		});
	}, []);

	const totalExpense = totalExpenses(expenseData);
	const totalIncome = totalExpenses(incomeData);
	const totalBalance = totalIncome - totalExpense;
	const filterBySearch = (event: any) => {
		dispatch(SET_SEARCH_TERM(event));
	};

	return (
		<>
			<div
				className="transactionsListWrapper"
				data-testid="transactionsListWrapper"
			>
				{role === "admin" && (
					<div className="transactions__content--balance">
						<div className="transactions__content--balance-amt">
							<BiSolidCaretUpCircle
								style={{ color: "#2D864B", fontSize: "15px" }}
							/>{" "}
							{totalIncome} -{" "}
							<BiSolidCaretDownCircle
								style={{ color: "#d82c0d", fontSize: "15px" }}
							/>{" "}
							{totalExpense}
						</div>
						<div className="transactions__content--balance-total">
							<LuIndianRupee style={{ fontSize: "13px" }} /> {totalBalance}
						</div>
					</div>
				)}
				<div
					className="transactions__search mb-3"
					data-testid="transactionsListWrapper_search"
				>
					{role === "admin" && (
						<div
							className="transactions__download"
							data-testid="transactionsListWrapper__showIncomeExpense"
						>
							{listType ? (
								<BiSolidChevronUpCircle
									className="showComponent showComponent__income"
									onClick={() => dispatch(SET_TYPE(!listType))}
								/>
							) : (
								<BiSolidChevronDownCircle
									className="showComponent showComponent__expense"
									onClick={() => dispatch(SET_TYPE(!listType))}
								/>
							)}
						</div>
					)}
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
				{role === "admin" ? listType ? <Income /> : <Expense /> : <Expense />}
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
