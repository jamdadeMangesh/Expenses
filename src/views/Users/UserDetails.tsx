import React, { useEffect, useState } from "react";
import { useHeaderContext } from "../../context/HeaderContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { database } from "../../shared/firebase";

export const UserDetails = () => {
	const { setTitle, setShowBackArrow, setShowAddNewButton } =
		useHeaderContext();
	const location = useLocation();
	const { data, id } = location.state;
	const userDetails = data;
	const [changeAccess, setChangeAccess] = useState<boolean>(
		userDetails?.canAccess
	);
	const navigate = useNavigate();

	useEffect(() => {
		setTitle(userDetails?.name);
		setShowBackArrow(true);
		setShowAddNewButton(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updateUser = () => {
		const taskDocRef = doc(database, "users", id);

		updateDoc(taskDocRef, {
			email: userDetails?.email,
			name: userDetails?.name,
			mobileNumber: userDetails?.mobileNumber,
			role: userDetails?.role,
			canAccess: changeAccess,
		})
			.then(() => {
				toast.success("User info updated successfully!", {
					autoClose: 4000,
				});
				setTimeout(() => {
					navigate("/users/");
				}, 5000);
			})
			.catch((error: any) => {
				if (error) {
					toast.error("User info not been updated successfully!", {
						autoClose: 4000,
					});
				}
			});
	};

	return (
		<div className="profileWrapper">
			<div className="userWrapper__grid">
				<div className="userWrapper__grid-header">Name</div>
				<div className="userWrapper__grid-description">{userDetails?.name}</div>
			</div>
			<div className="userWrapper__grid">
				<div className="userWrapper__grid-header">Email</div>
				<div className="userWrapper__grid-description">
					{userDetails?.email}
				</div>
			</div>
			<div className="userWrapper__grid">
				<div className="userWrapper__grid-header">Mobile Number</div>
				<div className="userWrapper__grid-description">
					{userDetails?.mobileNumber}
				</div>
			</div>
			<div className="userWrapper__grid">
				<div className="userWrapper__grid-header">Role</div>
				<div className="userWrapper__grid-description">
					{userDetails?.role === "admin" ? "Admin" : "User"}
				</div>
			</div>
			<div className="userWrapper__grid ">
				<div className="userWrapper__grid-header">Access</div>
				<div className="userWrapper__grid-description">
					<div className="d-flex justify-content-between">
						<div className="userWrapper__grid-description">
							Change access for user
						</div>

						<Form.Check
							type="switch"
							id="custom-switch"
							defaultChecked={changeAccess}
							onChange={(e) => setChangeAccess(!changeAccess)}
						/>
					</div>
				</div>
			</div>
			<div className="divider__login mt-4"></div>
			<Button
				variant="success"
				size="sm"
				className="mt-4"
				disabled={userDetails?.canAccess === changeAccess}
				onClick={updateUser}
			>
				Submit
			</Button>
			<ToastContainer position="bottom-center" autoClose={false} />
		</div>
	);
};
