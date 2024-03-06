import React from "react";
import "./Transactions.scss";
import { LuIndianRupee, LuDot } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

type TransactionType = {
	data: any;
};
export const Transactions = ({ data }: TransactionType) => {
	const navigate = useNavigate();
	const onClickTransaction = () => {
		navigate("/expenseDetails/" + data.id);
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
					className="transactions__grid-icon"
					data-testid="transactions__grid_icon"
				></div>
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
						<span data-testid="transactions__grid_name">
							{data.personName !== "" && data.personName}{" "}
						</span>
						<span data-testid="transactions__grid_spentDate">
							{data.personName !== "" && <LuDot />} {data.spentDate}
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
