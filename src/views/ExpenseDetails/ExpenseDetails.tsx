import React from "react";
import "./ExpenseDetails.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { Button } from "react-bootstrap";
import { LuIndianRupee } from "react-icons/lu";

export const ExpenseDetails = () => {
	const { setTitle, setShowBackArrow } = useHeaderContext();
	React.useEffect(() => {
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
						<div className="expenseDetails__grid-description text-danger"><LuIndianRupee style={{marginTop: "-5px", fontSize: "15px"}} /> 3500.00</div>
					</div>
					<div className="expenseDetails__grid w-50">
						<div className="expenseDetails__grid-header">Category</div>
						<div className="expenseDetails__grid-description">Snacks</div>
					</div>
				</div>
				<div className="expenseDetails__section">
					<div className="expenseDetails__grid w-100">
						<div className="expenseDetails__grid-header">Person name</div>
						<div className="expenseDetails__grid-description">
							Mangesh Shrihari Jamdade
						</div>
					</div>
				</div>
				<div className="expenseDetails__section">
					<div className="expenseDetails__grid w-100">
						<div className="expenseDetails__grid-header">Transaction date</div>
						<div className="expenseDetails__grid-description">
							15th Feb 2014
						</div>
					</div>
				</div>
				<div className="expenseDetails__section">
					<div className="expenseDetails__grid w-100">
						<div className="expenseDetails__grid-header">Description</div>
						<div className="expenseDetails__grid-description">
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry. Lorem Ipsum has been the industry's standard dummy text
							ever since the 1500s.
						</div>
					</div>
				</div>
				<div className="expenseDetails__section">
					<div className="expenseDetails__grid w-100">
						<div className="expenseDetails__grid-header">Receipt</div>
						<div className="expenseDetails__grid-description w-50">
							<img
								src="https://placehold.co/600x400"
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
