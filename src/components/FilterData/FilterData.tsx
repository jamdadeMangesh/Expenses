import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
	SET_FILTER_TYPE,
	SET_FINANCIAL_YEAR,
	selectFilterData,
} from "./FilterSlice";
import "./FilterData.scss";

type FilterDataProps = {
	openFilter: boolean;
	setOpenFilter: () => void;
};
export const FilterData = ({ openFilter, setOpenFilter }: FilterDataProps) => {
	const [selectedYear, setSelectedYear] = useState<string>("");

	const dispatch = useDispatch();
	const { financialYear } = useSelector(selectFilterData);

	const onFinancialYearChangeHandler = (event: any) => {
		setSelectedYear(event.target.value);
	};

	const submitFilter = () => {
		if (selectedYear) {
			dispatch(SET_FINANCIAL_YEAR(selectedYear));
			dispatch(SET_FILTER_TYPE("financialYear"));
		}
		setOpenFilter();
	};
	const clearFilter = () => {
		setSelectedYear("");
		dispatch(SET_FINANCIAL_YEAR(""));
		dispatch(SET_FILTER_TYPE(""));
	};

	return (
		<>
			<div className={`filterPanel ${openFilter && "filterPanelOpened"}`}>
				<div className="filterPanel__header">
					Filter
					<div className="filterPanel__close">
						<IoMdClose onClick={setOpenFilter} />
					</div>
				</div>
				<div className="filterPanel__content">
					<div className="filterPanel__grid">
						<div className="filterPanel__filter-name">Financial year</div>
						<Form.Select
							aria-label="Default select example"
							onChange={onFinancialYearChangeHandler}
							defaultValue={financialYear}
						>
							<option value="">Please choose year</option>
							<option value="2022-2023">2022-2023</option>
							<option value="2023-2024">2023-2024</option>
							<option value="2024-2025">2024-2025</option>
						</Form.Select>
					</div>
				</div>
				<div className="filterPanel__gridButton mt-4">
					<Button
						variant="outline-danger"
						className="filterPanel__button buttonHeight"
						onClick={clearFilter}
					>
						Clear
					</Button>
					<Button
						variant="primary"
						className="filterPanel__button buttonHeight"
						onClick={submitFilter}
					>
						Submit
					</Button>
				</div>
			</div>
		</>
	);
};
