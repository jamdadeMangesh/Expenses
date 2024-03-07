import React, { useState } from "react";
import "./Profile.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { Button } from "react-bootstrap";
import { Logout } from "../../components/Logout/Logout";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
	const { setTitle, setShowBackArrow } = useHeaderContext();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

	React.useEffect(() => {
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
						<div className="userWrapper__grid-description">
							Mangesh Shrihari Jamdade
						</div>
					</div>
					<div className="userWrapper__grid">
						<div className="userWrapper__grid-header">Email</div>
						<div className="userWrapper__grid-description">
							jamdademangesh1993@gmail.com
						</div>
					</div>
					<div className="userWrapper__grid">
						<div className="userWrapper__grid-header">Role</div>
						<div className="userWrapper__grid-description">Super Admin</div>
					</div>
				</div>
				<div className="userWrapper__section shadow-sm px-3 py-2">
					<div className="userWrapper__grid">
						<div className="userWrapper__grid-header">App version</div>
						<div className="userWrapper__grid-description">0.0.0.1</div>
					</div>
				</div>
                <div className="userWrapper__section shadow-sm px-3 py-2">
					<div className="userWrapper__grid">
						<div className="userWrapper__grid-header">Users (For admin only)</div>
						<div className="userWrapper__grid-description">
							<Button
								variant="success"
								className="mt-2"
                                size="sm"
                                onClick={() => navigate("/register")}
							>
								Add New User
							</Button>
						</div>
					</div>
				</div>
                <div className="userWrapper__section shadow-sm px-3 py-2">
					<div className="userWrapper__grid">
						<div className="userWrapper__grid-header">Passwords</div>
						<div className="userWrapper__grid-description">
							<Button
								variant="secondary"
								className="mt-2"
                                size="sm"
                            >
								Reset Password
							</Button>
						</div>
					</div>
				</div>
				<div className="userWrapper__section shadow-sm px-3 py-2">
					<div className="userWrapper__grid">
						<div className="userWrapper__grid-header">Account</div>
						<div className="userWrapper__grid-description">
							<Button
								variant="danger"
								className="mt-2"
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
