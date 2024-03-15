import React, { useEffect, useState } from "react";
import { Button, Form, ToggleButton } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
	ADD_FILTER_DATA,
	SET_CATEGORY_LIST,
	SET_FILTER_TYPE,
	SET_USERNAME,
	selectFilterData,
} from "./FilterSlice";
import "./FilterData.scss";
import { getAllUsers } from "../../shared/constant";

type FilterDataProps = {
	openFilter: boolean;
	setOpenFilter: () => void;
};
export const FilterData = ({ openFilter, setOpenFilter }: FilterDataProps) => {
	const [checkedValues, setCheckedValues] = useState<any>("");
	const [selectedUserName, setSelectedUserName] = useState<string>("");
	const [usersNameList, setUsersNameList] = useState([]);
	const [categoryList, setCategoryList] = useState<any>([]);

	const dispatch = useDispatch();
	const { selectedFilteredUsername, selectedCategoryList } =
		useSelector(selectFilterData);
	console.log("selectedUsername in filter:", selectedFilteredUsername);
	console.log("selectedCategoryList in filter:", selectedCategoryList);
	//const { year, preferenceValues } = useSelector(selectFilterData);

	useEffect(() => {
		getAllUsersName();
	}, []);
	const getAllUsersName = async () => {
		const res: any = [];
		getAllUsers().then((result: any) => {
			result.forEach((item: any) => {
				res.push({
					id: item.id,
					name: item.data().data?.name,
				});
			});
			setUsersNameList(res);
		});
	};
	console.log("usersNameList:", usersNameList);

	const onUserNameChangeHandler = (event: any) => {
		setSelectedUserName(event.target.value);
	};

	const submitFilter = () => {
		const filterValues: any = [];
		filterValues.push({
			//year: selectedYear,
			preferenceValues: checkedValues,
		});
		if (selectedUserName) {
			dispatch(SET_USERNAME(selectedUserName));
			dispatch(SET_FILTER_TYPE("personName"));
		} else if (categoryList) {
			dispatch(SET_CATEGORY_LIST(categoryList));
			dispatch(SET_FILTER_TYPE("category"));
		}
		dispatch(ADD_FILTER_DATA(filterValues[0]));
		setOpenFilter();
	};
	const clearFilter = () => {
		setCheckedValues("");
		//setSelectedYear("");
		setSelectedUserName("");
        setCategoryList(['']);
		dispatch(SET_USERNAME(""));
		dispatch(SET_CATEGORY_LIST([""]));
		dispatch(SET_FILTER_TYPE(""));
		//const filterValues: any = [];
		// filterValues.push({
		// 	year: "",
		// 	preferenceValues: "",
		// });
		// dispatch(ADD_FILTER_DATA(filterValues[0]));
	};

	// const handleChangeCategory = (event: any, value: string) => {
	// 	setCategoryList([...categoryList, value]);
	// };
	const handleChangeCategory = (event: any) => {
		const { value, checked } = event.target;
		if (checked) {
			setCategoryList((prev: any) => [...prev, value]);
		} else {
			setCategoryList((prev: any) =>
				prev.filter((item: any) => item !== value)
			);
		}
		console.log("id:", value);
		console.log("checked:", checked);
	};
	console.log("tempItemTypesToDisplay:", categoryList);

	const categoryArray = [
		{ id: 1, name: "Snacks" },
		{ id: 2, name: "Material" },
		{ id: 3, name: "Travel" },
	];

	const defaultCheckedCategory = (value: string) => {
		const result = selectedCategoryList.includes(value);
		console.log("defaultCheckedCategory:::", result);
		return result;
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
						<div className="filterPanel__filter-name">Person name</div>
						<Form.Select
							aria-label="Default select example"
							onChange={onUserNameChangeHandler}
                            //defaultValue={selectedFilteredUsername}
                            defaultValue={selectedFilteredUsername}
						>
							<option value="">Please choose person name</option>
							{usersNameList.map((item: any) => {
								return (
									<option key={item.id} value={item.name.toString()}>
										{item.name.toString()}
									</option>
								);
							})}
						</Form.Select>
					</div>
					<div className="filterPanel__grid">
						<div className="filterPanel__filter-name">Category</div>
						<div className="mb-3">
							{categoryArray?.map((category: any) => (
								<ToggleButton
									id={category.name}
                                    className="filterPanel__filter-category"
									type="checkbox"
									variant="outline-primary"
									size="sm"
									value={category.name}
									onChange={handleChangeCategory}
									checked={defaultCheckedCategory(category.name.toString()) || categoryList.includes(category.name)}
									//defaultChecked={defaultCheckedCategory(category.name.toString())}
									defaultChecked={true}
								>
									{category.name}
								</ToggleButton>
							))}
						</div>
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
