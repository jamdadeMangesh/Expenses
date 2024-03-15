import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { LuIndianRupee } from "react-icons/lu";
import { RiChatHistoryFill } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { Transactions } from "../../components/Transactions/Transactions";
import { useNavigate } from "react-router-dom";
import {
	Greetings,
	getAllTransactions,
	totalExpenses,
} from "../../shared/constant";
import { authentication } from "../../shared/firebase";

import { useSelector } from "react-redux";
import { selectUserData } from "../Login/LoginSlice";
import { onAuthStateChanged } from "firebase/auth";

export const Dashboard = () => {
	const { name, role } = useSelector(selectUserData);
	const [transactionsData, setTransactionsData] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		onAuthStateChanged(authentication, (user) => {
			if (user) {
				navigate("/dashboard");
			} else {
				navigate("/login");
			}
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getAllUsers();
	}, [name]);
	const getAllUsers = async () => {
		//const doc_refs = await query(collection(database, "transactions"), where("personName", "==", name));
		let filteredAdminData: any = [];
		let filteredData: any = [];
		getAllTransactions().then((res) => {
			filteredAdminData = res?.sort(function (a: any, b: any) {
				return (
					+new Date(b?.data?.transactionDate) -
					+new Date(a.data?.transactionDate)
				);
			});

			filteredData = res
				?.filter((item: any) => item?.data?.personName === name)
				.sort(function (a: any, b: any) {
					return (
						+new Date(b?.data?.transactionDate) -
						+new Date(a.data?.transactionDate)
					);
				});
			setTransactionsData(role === "admin" ? filteredAdminData : filteredData);
		});
	};

	const total = totalExpenses(transactionsData);

	return (
		<>
			<div
				className="dashboard__greeting"
				data-testid="dashboardWrapper__greeting"
			>
				<div
					className="dashboard__greeting-title"
					data-testid="dashboard__greeting_title"
				>
					Welcome {name}
				</div>
				<div
					className="dashboard__greeting-subTitle"
					data-testid="dashboard__greeting_subtitle"
				>
					{Greetings()}

					<div
						className={`dashboard__greeting-role ${
							role === "admin"
								? "dashboard__greeting-role--admin"
								: "dashboard__greeting-role--user"
						}`}
					>
						{role === "admin" ? "Admin" : "User"}
					</div>
				</div>
			</div>
			<div className="dashboardWrapper" data-testid="dashboardWrapper">
				<div className="dashboard__stats blob-layer  text-center shadow-sm">
					<div
						className="dashboard__stats-title"
						data-testid="dashboard__stats_title"
					>
						Your Total Expenses
					</div>
					<div
						className="dashboard__stats-amount mt-1"
						data-testid="dashboard__stats_amount"
					>
						<LuIndianRupee /> {total}
					</div>
					<div
						className="dashboard__stats-monthlyAmount mt-3"
						data-testid="dashboard__stats_monthlyAmount"
					>
						Last month's transactions :{" "}
						<span>
							<LuIndianRupee /> 12654
						</span>
					</div>
				</div>
				<div className="dashboard__controls shadow">
					<div
						className="dashboard__controls-grid"
						onClick={() => navigate("/addExpense")}
					>
						<div className="dashboard__controls-grid--icon">
							<IoIosAddCircle />
						</div>
						<div className="dashboard__controls-grid--text mt-2">Add New</div>
					</div>
					<div
						className="dashboard__controls-grid"
						onClick={() => navigate("/transactionsList")}
					>
						<div className="dashboard__controls-grid--icon">
							<RiChatHistoryFill />
						</div>
						<div className="dashboard__controls-grid--text mt-2">History</div>
					</div>
				</div>
				<div className="dashboard__content">
					<div className="transactions">
						<div className="transactions__header mb-3">Last 5 transactions</div>

						{transactionsData.slice(0, 5).map((item: any) => (
							<Transactions
								data={item?.data}
								key={item.id}
								transactionId={item.id}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
