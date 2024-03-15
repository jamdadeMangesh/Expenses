import React from "react";
import { HiHome, HiOutlineHome, HiUserGroup } from "react-icons/hi";
import { IoMdAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import {
	HiOutlineQueueList,
	HiQueueList,
	HiOutlineUserGroup,
} from "react-icons/hi2";
import { RiUser2Fill, RiUser2Line } from "react-icons/ri";
import "./AppNav.scss";
import { ApplicationRoutes } from "../../shared/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserData } from "../../views/Login/LoginSlice";

export const AppNav = () => {
	const { role } = useSelector(selectUserData);
	const routes = ApplicationRoutes;
	const location = useLocation();
	const navigate = useNavigate();
	const splitUrl = "/" + location.pathname.split("/")[1];
	const showNav =
		routes.find((r) =>
			splitUrl === "/" ||
			splitUrl === "/login" ||
			splitUrl === "/register" ||
			splitUrl === "/expenseDetails"
				? r.route === splitUrl
				: r.route === location.pathname
		)?.showNav ?? true;

	return (
		<>
			{showNav && (
				<div className="AppNavWrapper">
					<div
						className={`AppNavWrapper__grid ${
							splitUrl === "/dashboard" ? "AppNavWrapper__grid-active" : ""
						}`}
						onClick={() => navigate("/dashboard")}
					>
						<div className="AppNavWrapper__grid-icon">
							{splitUrl === "/dashboard" ? <HiHome /> : <HiOutlineHome />}
						</div>
						<div className="AppNavWrapper__grid-text">Home</div>
					</div>
					<div
						className={`AppNavWrapper__grid ${
							splitUrl === "/addExpense" ? "AppNavWrapper__grid-active" : ""
						}`}
						onClick={() => navigate("/addExpense")}
					>
						<div className="AppNavWrapper__grid-icon">
							{splitUrl === "/addExpense" ? (
								<IoMdAddCircle />
							) : (
								<IoMdAddCircleOutline />
							)}
						</div>
						<div className="AppNavWrapper__grid-text">Add</div>
					</div>
					<div
						className={`AppNavWrapper__grid ${
							splitUrl === "/transactionsList"
								? "AppNavWrapper__grid-active"
								: ""
						}`}
						onClick={() => navigate("/transactionsList")}
					>
						<div className="AppNavWrapper__grid-icon">
							{splitUrl === "/transactionsList" ? (
								<HiQueueList />
							) : (
								<HiOutlineQueueList />
							)}
						</div>
						<div className="AppNavWrapper__grid-text">List</div>
					</div>
					{role === "admin" && (
						<div
							className={`AppNavWrapper__grid ${
								splitUrl === "/users" ? "AppNavWrapper__grid-active" : ""
							}`}
							onClick={() => navigate("/users")}
						>
							<div className="AppNavWrapper__grid-icon">
								{splitUrl === "/users" ? (
									<HiUserGroup />
								) : (
									<HiOutlineUserGroup />
								)}
							</div>
							<div className="AppNavWrapper__grid-text">Users</div>
						</div>
					)}
					<div
						className={`AppNavWrapper__grid ${
							splitUrl === "/profile" ? "AppNavWrapper__grid-active" : ""
						}`}
						onClick={() => navigate("/profile")}
					>
						<div className="AppNavWrapper__grid-icon">
							{splitUrl === "/profile" ? <RiUser2Fill /> : <RiUser2Line />}
						</div>
						<div className="AppNavWrapper__grid-text">Profile</div>
					</div>
				</div>
			)}
		</>
	);
};
