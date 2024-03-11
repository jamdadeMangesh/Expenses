import React, { useEffect, useState } from "react";
import "./Users.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { PiUserDuotone } from "react-icons/pi";
import { getDocs, collection } from "firebase/firestore";
import { database } from "../../shared/firebase";

export const Users = () => {
	const { setTitle, setShowBackArrow } = useHeaderContext();
	const [usersData, setUsersData] = useState([]);
	React.useEffect(() => {
		setTitle("All Users");
		setShowBackArrow(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getAllUsers();
	}, []);
	const getAllUsers = async () => {
		const doc_refs = await getDocs(collection(database, "users"));

		const res: any = [];

		doc_refs.forEach((item) => {
			res.push({
				id: item.id,
				...item.data(),
			});
		});

		setUsersData(res);
		return res;
	};
	console.log("result:", usersData);

	return (
		<>
			<div className="loginWrapper" data-testid="loginWrapper">
				{usersData.map((item: any) => (
					<div
						className="usersList"
						key={item.id}
						//onClick={() => navigate("/user/" + data.id)}
					>
						<div className="usersList__image">
							<PiUserDuotone style={{ fontSize: "30px" }} />
						</div>
						<div className="usersList__grid">
							<div className="usersList__name">{item?.data?.name}</div>
							<div className="usersList__mobile">
								{item?.data?.mobileNumber}
							</div>
						</div>
						<div className="usersList__grid-right">
							<div
								className={`usersList__role ${
									item?.data?.role === "admin"
										? "usersList__role-admin"
										: "usersList__role-user"
								}`}
							>
								{item?.data?.role === "admin" ? "Admin" : "User"}
							</div>
							{/* <div className="membersList__preference">{data.preference}</div> */}
						</div>
					</div>
				))}
			</div>
		</>
	);
};
