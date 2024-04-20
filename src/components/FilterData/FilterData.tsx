import React, { useState } from "react";
import { Button, Form, ToggleButton } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
    SET_CATEGORY_LIST,
    SET_FILTER_TYPE,
    SET_FINANCIAL_YEAR,
    selectFilterData,
} from "./FilterSlice";
import "./FilterData.scss";
import { categories, incomeCategory } from "../../shared/constant";

type FilterDataProps = {
    openFilter: boolean;
    setOpenFilter: () => void;
};
export const FilterData = ({ openFilter, setOpenFilter }: FilterDataProps) => {
    const [selectedYear, setSelectedYear] = useState<string>("");
    const dispatch = useDispatch();
    const { financialYear, selectedCategoryList, listType } = useSelector(selectFilterData);
    const [selected, setSelected] = useState<any>(selectedCategoryList);
    const onFinancialYearChangeHandler = (event: any) => {
        setSelectedYear(event.target.value);
    };

    const submitFilter = () => {
        if (selectedYear) {
            dispatch(SET_FINANCIAL_YEAR(selectedYear));
            dispatch(SET_FILTER_TYPE("financialYear"));
        }
        if (selected) {
            //dispatch(SET_FILTER_TYPE('category'))
            dispatch(SET_CATEGORY_LIST(selected));
        }
        setOpenFilter();
    };
    const clearFilter = () => {
        setSelectedYear("");
        setSelected([]);
        dispatch(SET_FINANCIAL_YEAR(""));
        dispatch(SET_FILTER_TYPE(""));
        dispatch(SET_CATEGORY_LIST([]));
    };

    const chooseCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const index: any = selected?.indexOf(value);
        if (index > -1) {
            setSelected([...selected.slice(0, index), ...selected.slice(index + 1)]);
        } else {
            setSelected([...selected, ...[value]]);
        }
    };

    return (
        <>
            <div className={`filterPanel ${openFilter && "filterPanelOpened"}`}>
                <div className='filterPanel__header'>
                    Filter
                    <div className='filterPanel__close'>
                        <IoMdClose onClick={setOpenFilter} />
                    </div>
                </div>
                <div className='filterPanel__content'>
                    <div className='filterPanel__grid'>
                        <div className='filterPanel__filter-name'>Financial year</div>
                        <Form.Select
                            aria-label='Default select example'
                            onChange={onFinancialYearChangeHandler}
                            defaultValue={financialYear}
                        >
                            <option value=''>Please choose year</option>
                            <option value='2022-2023'>2022-2023</option>
                            <option value='2023-2024'>2023-2024</option>
                            <option value='2024-2025'>2024-2025</option>
                        </Form.Select>
                    </div>
                    {listType ? <div className='filterPanel__grid'>
                        <div className='filterPanel__filter-name'>Income Category</div>
                        <div>
                            {incomeCategory.map((category: string) => (
                                <ToggleButton
                                    key={category}
                                    className='filterPanel__checkbox mb-2'
                                    id={category}
                                    type='checkbox'
                                    variant='outline-primary'
                                    value={category}
                                    checked={selected.includes(category) ? true : false}
                                    onChange={chooseCheckbox}
                                >
                                    {category}
                                </ToggleButton>
                            ))}
                        </div>
                    </div> :
                        <div className='filterPanel__grid'>
                            <div className='filterPanel__filter-name'>Expense Category</div>
                            <div>
                                {categories.map((category: string) => (
                                    <ToggleButton
                                        key={category}
                                        className='filterPanel__checkbox mb-2'
                                        id={category}
                                        type='checkbox'
                                        variant='outline-primary'
                                        value={category}
                                        checked={selected.includes(category) ? true : false}
                                        onChange={chooseCheckbox}
                                    >
                                        {category}
                                    </ToggleButton>
                                ))}
                            </div>
                        </div>
                    }
                </div>
                <div className='filterPanel__gridButton mt-4'>
                    <Button
                        variant='outline-danger'
                        className='filterPanel__button buttonHeight'
                        onClick={clearFilter}
                    >
                        Clear
                    </Button>
                    <Button
                        variant='primary'
                        className='filterPanel__button buttonHeight'
                        onClick={submitFilter}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </>
    );
};
