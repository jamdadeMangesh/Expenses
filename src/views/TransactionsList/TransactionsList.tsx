import React from "react";
import "./TransactionsList.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { Button, Form } from "react-bootstrap";
import { FiFilter } from "react-icons/fi";
import { Transactions } from "../../components/Transactions/Transactions";
import { FiDownload } from "react-icons/fi";

export const TransactionsList = () => {
	const { setTitle, setShowBackArrow } = useHeaderContext();
	React.useEffect(() => {
		setTitle("All transactions");
		setShowBackArrow(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<div className="transactionsListWrapper">
				<div className="transactions__search mb-3">
					<div className="transactions__search-input">
						<Form.Group controlId="search">
							<Form.Control type="text" placeholder="Search" />
						</Form.Group>
					</div>
                    <div className="transactions__search-filter">
                        <FiFilter />
                    </div>
				</div>
                <div className="transactions__appliedFilter mb-3">
                    <div className="transactions__download">
                        <Button variant="success"><FiDownload /> Download</Button>
                    </div>
                </div>
                <div className="transactions__content">
                    <Transactions />
                </div>
			</div>
		</>
	);
};
