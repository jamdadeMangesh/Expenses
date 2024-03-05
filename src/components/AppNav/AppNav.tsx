import React from "react";
import { HiHome, HiOutlineHome } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiOutlineQueueList, HiQueueList } from "react-icons/hi2";
import { RiUser2Line } from "react-icons/ri";
import "./AppNav.scss";
import { ApplicationRoutes } from "../../shared/constant";
import { useLocation, useNavigate } from "react-router-dom";

export const AppNav = () => {
	const routes = ApplicationRoutes;
	const location = useLocation();
	const navigate = useNavigate();
	const splitUrl = "/" + location.pathname.split("/")[1];
	const showNav =
		routes.find((r) =>
			splitUrl === "/" || splitUrl === "/login" || splitUrl === "/register"
				? r.route === splitUrl
				: r.route === location.pathname
		)?.showNav ?? true;

	return (
		<>
			{showNav && (
				<div className="AppNavWrapper">
					<div
						className={`AppNavWrapper__grid ${
							splitUrl === "/dashboard" && "AppNavWrapper__grid-active"
						}`}
						onClick={() => navigate("/dashboard")}
					>
						<div className="AppNavWrapper__grid-icon">
							{splitUrl === "/dashboard" ? <HiHome /> : <HiOutlineHome />}
						</div>
						<div className="AppNavWrapper__grid-text">Home</div>
					</div>
					<div
						className="AppNavWrapper__grid"
						onClick={() => navigate("/login")}
					>
						<div className="AppNavWrapper__grid-icon">
							<IoMdAddCircleOutline />
							{/* <IoMdAddCircle /> */}
						</div>
						<div className="AppNavWrapper__grid-text">Add</div>
					</div>
					<div
						className={`AppNavWrapper__grid ${
							splitUrl === "/transactionsList" && "AppNavWrapper__grid-active"
						}`}
						onClick={() => navigate("/transactionsList")}
					>
						<div className="AppNavWrapper__grid-icon">
                            {splitUrl === "/transactionsList" ? <HiQueueList /> : <HiOutlineQueueList />}
							{/* <HiQueueList /> */}
						</div>
						<div className="AppNavWrapper__grid-text">List</div>
					</div>
					<div className="AppNavWrapper__grid">
						<div className="AppNavWrapper__grid-icon">
							<RiUser2Line />
							{/* <RiUser2Fill /> */}
						</div>
						<div className="AppNavWrapper__grid-text">Profile</div>
					</div>
				</div>
			)}
		</>
	);
};
