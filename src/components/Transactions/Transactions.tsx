import React from "react";
import "./Transactions.scss";
import { LuIndianRupee, LuDot } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserData } from "../../views/Login/LoginSlice";
import {DateTime} from "luxon";
import { getCategoryIcon } from "../../shared/constant";



type TransactionType = {
	data: any;
    transactionId: string;
};
export const Transactions = ({ data, transactionId }: TransactionType) => {
    const { role } = useSelector(selectUserData);
	const navigate = useNavigate();
	const onClickTransaction = () => {
		navigate("/expenseDetails/" + transactionId, {state:{data}});
	};
	return (
		<>
			<div
				className="transactions__grid"
				key={data.id}
				onClick={onClickTransaction}
				data-testid="transactions__grid"
			>
				<div
					className="transactions__grid-icon shadow"
					data-testid="transactions__grid_icon"
				>
                    <img src={getCategoryIcon(data.category)} alt={data.category} />
                </div>
				<div className="transactions__grid-group">
					<div
						className="transactions__grid-group--name"
						data-testid="transactions__grid_category"
					>
						{data.category}
					</div>
					<div
						className="transactions__grid-group--date"
					>
						{role === "admin" && <span data-testid="transactions__grid_name">
							{data.personName !== "" && data.personName}{" "}
						</span>}
						<span data-testid="transactions__grid_spentDate">
							{(data.personName!== "" && role === "admin")  && <LuDot />} {DateTime.fromISO(data.transactionDate).toFormat("dd MMM yyyy")}
						</span>
					</div>
				</div>
				<div
					className="transactions__grid-amount"
					data-testid="transactions__grid_amount"
				>
					-<LuIndianRupee />
					{data.amount}
				</div>
			</div>
		</>
	);
};
