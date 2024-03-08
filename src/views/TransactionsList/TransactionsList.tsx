import React from "react";
import "./TransactionsList.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { Button, Form } from "react-bootstrap";
import { FiFilter } from "react-icons/fi";
import { Transactions } from "../../components/Transactions/Transactions";
import { FiDownload } from "react-icons/fi";
import { FaTag, FaUser } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { transactionsData } from "../../shared/data";

export const TransactionsList = () => {
	const { setTitle, setShowBackArrow } = useHeaderContext();
	React.useEffect(() => {
		setTitle("All transactions");
		setShowBackArrow(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<div
				className="transactionsListWrapper"
				data-testid="transactionsListWrapper"
			>
				<div
					className="transactions__search mb-3"
					data-testid="transactionsListWrapper_search"
				>
					<div className="transactions__search-input">
						<Form.Group controlId="search">
							<Form.Control
								type="text"
								placeholder="Search"
								data-testid="transactionsListWrapper_searchInput"
							/>
						</Form.Group>
					</div>
					<div
						className="transactions__search-filter"
						data-testid="transactionsListWrapper_filter"
					>
						<FiFilter />
					</div>
				</div>
				<div
					className="transactions__appliedFilter mb-3"
					data-testid="transactionsListWrapper_appliedFilter"
				>
					<div className="transactions__appliedFilter-list">
						<FaUser /> <span>Mangesh</span> <LuDot />
						<FaTag /> <span>Snacks</span> <span>Travel</span>
					</div>
					<div
						className="transactions__download"
						data-testid="transactionsListWrapper__download"
					>
						<Button variant="success">
							<FiDownload />
						</Button>
					</div>
				</div>
				<div
					className="transactions__content"
					data-testid="transactionsListWrapper_content"
				>
					{transactionsData.map((item: any) => (
						<Transactions data={item} key={item.id} />
					))}
				</div>
			</div>
		</>
	);
};
