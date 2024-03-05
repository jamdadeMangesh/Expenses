import React from "react";
import "./Transactions.scss";
import { LuIndianRupee } from "react-icons/lu";

export const Transactions = () => {
	return (
		<>
			<div className="transactions__grid">
				<div className="transactions__grid-icon"></div>
				<div className="transactions__grid-group">
					<div className="transactions__grid-group--name">Snacks</div>
					<div className="transactions__grid-group--date">15th Feb 2024</div>
				</div>
				<div className="transactions__grid-amount">
					-<LuIndianRupee />
					800.00
				</div>
			</div>
			<div className="transactions__grid">
				<div className="transactions__grid-icon"></div>
				<div className="transactions__grid-group">
					<div className="transactions__grid-group--name">Travel</div>
					<div className="transactions__grid-group--date">1st Feb 2024</div>
				</div>
				<div className="transactions__grid-amount">
					-<LuIndianRupee />
					3500.00
				</div>
			</div>
			<div className="transactions__grid">
				<div className="transactions__grid-icon"></div>
				<div className="transactions__grid-group">
					<div className="transactions__grid-group--name">Materials</div>
					<div className="transactions__grid-group--date">15th Jan 2024</div>
				</div>
				<div className="transactions__grid-amount">
					-<LuIndianRupee />
					5000.00
				</div>
			</div>
			<div className="transactions__grid">
				<div className="transactions__grid-icon"></div>
				<div className="transactions__grid-group">
					<div className="transactions__grid-group--name">Snacks</div>
					<div className="transactions__grid-group--date">15th Feb 2024</div>
				</div>
				<div className="transactions__grid-amount">
					-<LuIndianRupee />
					800.00
				</div>
			</div>
			<div className="transactions__grid">
				<div className="transactions__grid-icon"></div>
				<div className="transactions__grid-group">
					<div className="transactions__grid-group--name">Travel</div>
					<div className="transactions__grid-group--date">1st Feb 2024</div>
				</div>
				<div className="transactions__grid-amount">
					-<LuIndianRupee />
					3500.00
				</div>
			</div>
			<div className="transactions__grid">
				<div className="transactions__grid-icon"></div>
				<div className="transactions__grid-group">
					<div className="transactions__grid-group--name">Materials</div>
					<div className="transactions__grid-group--date">15th Jan 2024</div>
				</div>
				<div className="transactions__grid-amount">
					-<LuIndianRupee />
					5000.00
				</div>
			</div>
		</>
	);
};
