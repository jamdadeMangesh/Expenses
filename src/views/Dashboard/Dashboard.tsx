import React, { useEffect } from "react";
import "./Dashboard.scss";
import { LuIndianRupee } from "react-icons/lu";
import { RiChatHistoryFill } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { Transactions } from "../../components/Transactions/Transactions";
import { useNavigate } from "react-router-dom";
import { transactionsData } from "../../shared/data";
import { Greetings } from "../../shared/constant";
import { useAuthState } from "react-firebase-hooks/auth";
import { authentication } from "../../shared/firebase";

export const Dashboard = () => {
    const [user, loading] = useAuthState(authentication);
	const navigate = useNavigate();
    useEffect(() => {
        if(!user) navigate("/login");
    })
    console.log('loadingloading:', loading);
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
						Welcome Mangesh
					</div>
					<div
						className="dashboard__greeting-subTitle"
						data-testid="dashboard__greeting_subtitle"
					>
						{Greetings()}
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
						<LuIndianRupee /> 5000.00
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

						{transactionsData.slice(0,5).map((item: any) => (
							<Transactions data={item} key={item.id}/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
