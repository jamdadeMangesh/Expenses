import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { Button } from "react-bootstrap";
import { Logout } from "../../components/Logout/Logout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserData } from "../Login/LoginSlice";
import { authentication } from "../../shared/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";

export const Profile = () => {
	const { setTitle, setShowBackArrow } = useHeaderContext();
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const navigate = useNavigate();
	const { name, email, mobileNumber, role } = useSelector(selectUserData);
	const [user, loading] = useAuthState(authentication);
	console.log("name;:::", name);
	console.log("loading;:::", loading);
	useEffect(() => {
		// if (user) {
		// 	navigate("/profile");
		// }
		onAuthStateChanged(authentication, (user) => {
			if (user) {
				navigate("/profile");
			} else {
				navigate("/login");
			}
		});
	}, []);

	useEffect(() => {
		setTitle("Profile");
		setShowBackArrow(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<div className="profileWrapper">
				<div className="userWrapper__section shadow-sm px-3 py-2">
					<div className="userWrapper__grid">
						<div className="userWrapper__grid-header">Name</div>
						<div className="userWrapper__grid-description">{name}</div>
					</div>
					<div className="userWrapper__grid">
						<div className="userWrapper__grid-header">Email</div>
						<div className="userWrapper__grid-description">{email}</div>
					</div>
					<div className="userWrapper__grid">
						<div className="userWrapper__grid-header">Mobile Number</div>
						<div className="userWrapper__grid-description">{mobileNumber}</div>
					</div>
					<div className="userWrapper__grid">
						<div className="userWrapper__grid-header">Role</div>
						<div className="userWrapper__grid-description">
							{role === "admin" ? "Admin" : "User"}
						</div>
					</div>
				</div>
				<div className="userWrapper__section shadow-sm px-3 py-2">
					<div className="userWrapper__grid d-flex justify-content-between">
						<div className="userWrapper__grid-header">App version</div>
						<div className="userWrapper__grid-description">0.0.0.1</div>
					</div>
				</div>
				{role === "admin" && (
					<div className="userWrapper__section shadow-sm px-3 py-2">
						<div className="userWrapper__grid d-flex justify-content-between">
							<div className="userWrapper__grid-header">
								Users (For admin only)
							</div>
							<div className="userWrapper__grid-description">
								<Button
									variant="success"
									size="sm"
									onClick={() => navigate("/register")}
								>
									Add New User
								</Button>
							</div>
						</div>
					</div>
				)}
				<div className="userWrapper__section shadow-sm px-3 py-2">
					<div className="userWrapper__grid d-flex justify-content-between">
						<div className="userWrapper__grid-header">Passwords</div>
						<div className="userWrapper__grid-description">
							<Button variant="secondary" size="sm">
								Reset Password
							</Button>
						</div>
					</div>
				</div>
				<div className="userWrapper__section shadow-sm px-3 py-2">
					<div className="userWrapper__grid d-flex justify-content-between">
						<div className="userWrapper__grid-header">Account</div>
						<div className="userWrapper__grid-description">
							<Button
								variant="danger"
								size="sm"
								onClick={() => setShowLogoutModal(true)}
							>
								Logout
							</Button>
						</div>
					</div>
				</div>
			</div>
			{showLogoutModal && (
				<Logout
					showModal={showLogoutModal}
					hideModal={() => setShowLogoutModal(false)}
				/>
			)}
		</>
	);
};
