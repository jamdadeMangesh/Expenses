import React, { useEffect, useState } from "react";
import "./Users.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { authentication } from "../../shared/firebase";
import { getAllUsers } from "../../shared/constant";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const Users = () => {
	const { setTitle, setShowBackArrow } = useHeaderContext();
	const [usersData, setUsersData] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(authentication, (user) => {
			if (user) {
				navigate("/users");
			} else {
				navigate("/login");
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setTitle("All Users");
		setShowBackArrow(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getAllUsersInfo();
	}, []);
	const getAllUsersInfo = async () => {
		const res: any = [];
		getAllUsers().then((result) => {
			result.forEach((item) => {
				res.push({
					id: item.id,
					...item.data(),
				});
			});
			setUsersData(res);
		});
	};

	return (
		<>
			<div className="loginWrapper" data-testid="loginWrapper">
				{usersData.map((item: any) => (
					<div
						className="usersList"
						key={item.id}
					>
						<div className="usersList__grid">
							<div className="usersList__name">
								{item?.data?.name}{" "}
								<div
									className={`usersList__role ${
										item?.data?.role === "admin"
											? "usersList__role-admin"
											: "usersList__role-user"
									}`}
								>
									{item?.data?.role === "admin" ? "Admin" : "User"}
								</div>
							</div>
							<div className="usersList__mobile">
								{item?.data?.email}
							</div>
							<div className="usersList__mobile">
								 {item?.data?.mobileNumber}
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};
