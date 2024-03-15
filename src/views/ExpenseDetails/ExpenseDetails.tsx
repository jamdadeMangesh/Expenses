import React, { useEffect } from "react";
import "./ExpenseDetails.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { Button } from "react-bootstrap";
import { LuIndianRupee } from "react-icons/lu";
import { useLocation} from "react-router-dom";
import placeholder from "../../assets/placeholder.jpg";
import { DateTime } from "luxon";
export const ExpenseDetails = () => {
	const { setTitle, setShowBackArrow } = useHeaderContext();
	const location = useLocation();
	const { data } = location.state;
	
	useEffect(() => {
		setTitle("Expense details");
		setShowBackArrow(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="expenseDetailsWrapper">
				<div className="expenseDetails__section">
					<div className="expenseDetails__grid w-50">
						<div className="expenseDetails__grid-header">Amount</div>
						<div className="expenseDetails__grid-description text-danger">
							<LuIndianRupee style={{ marginTop: "-5px", fontSize: "15px" }} />{" "}
							{data?.amount}
						</div>
					</div>
					<div className="expenseDetails__grid w-50">
						<div className="expenseDetails__grid-header">Category</div>
						<div className="expenseDetails__grid-description">{data?.category}</div>
					</div>
				</div>
				<div className="expenseDetails__section">
					<div className="expenseDetails__grid w-100">
						<div className="expenseDetails__grid-header">Person name</div>
						<div className="expenseDetails__grid-description">
                            {data?.personName}
						</div>
					</div>
				</div>
				<div className="expenseDetails__section">
					<div className="expenseDetails__grid w-100">
						<div className="expenseDetails__grid-header">Transaction date</div>
						<div className="expenseDetails__grid-description">
							{DateTime.fromISO(data?.transactionDate).toFormat("dd MMM yyyy")}
						</div>
					</div>
				</div>
				<div className="expenseDetails__section">
					<div className="expenseDetails__grid w-100">
						<div className="expenseDetails__grid-header">Description</div>
						<div className="expenseDetails__grid-description">
                            {data?.description ? data?.description : "-"}
						</div>
					</div>
				</div>
				<div className="expenseDetails__section">
					<div className="expenseDetails__grid w-100">
						<div className="expenseDetails__grid-header">Receipt</div>
						<div className="expenseDetails__grid-description w-50">
							<img
								src={data?.receipt ? data?.receipt : placeholder}
								alt="receiptimage"
								className="img-fluid mt-2"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="expenseDetailsDelete">
				<Button variant="danger" className="w-100 buttonHeight">
					Delete
				</Button>
			</div>
		</>
	);
};
