import React from "react";
import "./AppHeader.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ApplicationRoutes } from "../../shared/constant";
import { useHeaderContext } from "../../context/HeaderContext";
import { BiSolidPlusCircle } from "react-icons/bi";
import { selectUserData } from "../../views/Login/LoginSlice";
import { useSelector } from "react-redux";

export const AppHeader = () => {
	const navigate = useNavigate();
	const routes = ApplicationRoutes;
	const { title, showBackArrow, showAddNewButton } = useHeaderContext();
	const { role } = useSelector(selectUserData);
	const splitUrl = "/" + window.location.pathname.split("/")[1];

	const showHeader =
		routes.find((r) =>
			splitUrl === "/" || splitUrl === "/dashboard"
				? r.route === splitUrl
				: r.route === window.location.href
		)?.showHeader ?? true;

	return (
		<>
			{showHeader && (
				<div className="appHeader">
					<div className="appHeader__grid">
						{showBackArrow && (
							<div className="appHeader__backArrow">
								<IoIosArrowBack onClick={() => navigate(-1)} />
							</div>
						)}
						<div className="appHeader__title">{title}</div>
					</div>
                    <div className="appHeader__grid-button">
					{showAddNewButton && role === "admin" && (
						<div className="appHeader__addIncome">
							<BiSolidPlusCircle  style={{ color: "#2D864B" }} />
						</div>
					)}
                    </div>
				</div>
			)}
		</>
	);
};
