import React, { useEffect, useRef, useState } from "react";
import "./Profile.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { Button, Form, Modal } from "react-bootstrap";
import { Logout } from "../../components/Logout/Logout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserData } from "../Login/LoginSlice";
import { authentication } from "../../shared/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
	onAuthStateChanged,
	reauthenticateWithCredential,
	updatePassword,
	EmailAuthProvider,
} from "firebase/auth";
import { Alerts } from "../../components/Alerts/Alerts";
import { useForm } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../../components/Loader/Loader";

export const Profile = () => {
	const { setTitle, setShowBackArrow, setShowAddNewButton } = useHeaderContext();
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
	const [showErrors, setShowErrors] = useState(false);
	const [firebaseErrors, setFirebaseErrors] = useState<string>("");
	const navigate = useNavigate();
	const { name, email, mobileNumber, role } = useSelector(selectUserData);
	const [user, loading] = useAuthState(authentication);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset,
	} = useForm();

	const password = useRef({});
	password.current = watch("newPassword", "");

	useEffect(() => {
		onAuthStateChanged(authentication, (user) => {
			if (user) {
				navigate("/profile");
			} else {
				navigate("/login");
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setTitle("Profile");
		setShowBackArrow(false);
        setShowAddNewButton(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmit = async (data: any) => {
		if (data) {
			const reauthenticate = (currentPassword: any) => {
				var cred = EmailAuthProvider.credential(email, currentPassword);
				return reauthenticateWithCredential(
					authentication.currentUser as any,
					cred
				);
			};

			reauthenticate(data?.currentPassword)
				.then(() => {
					updatePassword(user as any, data?.newPassword)
						.then(() => {
							setShowUpdatePasswordModal(false);
							reset();
							toast.success("Password updated successfully!");
						})
						.catch((error) => {
							console.log(error);
							setFirebaseErrors("Something went wrong!");
							toast.error("Something went wrong!");
						});
				})
				.catch((error) => {
					console.log(error);
					toast.error("Something went wrong!");
				});
		}
	};
	return (
		<>
			<div className="profileWrapper">
				{loading ? (
					<Loader />
				) : (
					<>
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
								<div className="userWrapper__grid-description">
									{mobileNumber}
								</div>
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
								<div className="userWrapper__grid-description">dev.0.0.0.5</div>
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
									<Button
										variant="secondary"
										size="sm"
										onClick={() => setShowUpdatePasswordModal(true)}
									>
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
					</>
				)}
			</div>
			{showLogoutModal && (
				<Logout
					showModal={showLogoutModal}
					hideModal={() => setShowLogoutModal(false)}
				/>
			)}
			{showUpdatePasswordModal && (
				<Modal
					show={showUpdatePasswordModal}
					onHide={() => setShowUpdatePasswordModal(false)}
					backdrop="static"
					keyboard={false}
					className="updatePassword__modal"
					centered
				>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="loginWrapper__form"
					>
						<Modal.Header closeButton>
							<Modal.Title>Update password</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className="loginWrapper__form-content">
								<div className="loginWrapper__form-group">
									<Alerts
										errors={firebaseErrors}
										show={showErrors}
										setShow={() => setShowErrors(false)}
										isSuccess={false}
									/>
								</div>

								<Form.Group
									className="loginWrapper__form-group mb-3"
									controlId="password"
								>
									<Form.Label data-testid="loginWrapper__labelPassword">
										Current Password
										<sup>
											<span>
												<CgAsterisk style={{ color: "#D82C0D" }} />
											</span>
										</sup>
									</Form.Label>
									<Form.Control
										type="password"
										placeholder="*****"
										{...register("currentPassword", {
											required: "Please enter your password",
										})}
										data-testid="loginWrapper__inputPassword"
										className={errors.currentPassword && "inputError"}
									/>
									{errors.currentPassword && (
										<p className="loginWrapper__errorMsg">
											{errors?.currentPassword?.message?.toString()}
										</p>
									)}
								</Form.Group>

								<Form.Group
									className="loginWrapper__form-group mb-3"
									controlId="password"
								>
									<Form.Label data-testid="loginWrapper__labelPassword">
										New Password
										<sup>
											<span>
												<CgAsterisk style={{ color: "#D82C0D" }} />
											</span>
										</sup>
									</Form.Label>
									<Form.Control
										type="password"
										placeholder="*****"
										{...register("newPassword", {
											required: "Please enter your password",
											pattern: {
												value:
													/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
												message:
													"Password must have atleast a symbol, upper & lower case letter and number",
											},
											minLength: {
												value: 8,
												message: "Password must have at least 8 characters",
											},
										})}
										data-testid="loginWrapper__inputPassword"
										className={errors.newPassword && "inputError"}
									/>
									{errors.newPassword && (
										<p className="loginWrapper__errorMsg">
											{errors?.newPassword?.message?.toString()}
										</p>
									)}
								</Form.Group>
								<Form.Group
									className="loginWrapper__form-group mb-3"
									controlId="password"
								>
									<Form.Label data-testid="loginWrapper__labelPassword">
										Confirm New Password
										<sup>
											<span>
												<CgAsterisk style={{ color: "#D82C0D" }} />
											</span>
										</sup>
									</Form.Label>
									<Form.Control
										type="password"
										placeholder="*****"
										{...register("confirmNewPassword", {
											required: "Please enter your password",
											validate: (value) =>
												value === password.current ||
												"Passwords must be same as new password",
										})}
										data-testid="loginWrapper__inputPassword"
										className={errors.confirmNewPassword && "inputError"}
									/>
									{errors.confirmNewPassword && (
										<p className="loginWrapper__errorMsg">
											{errors?.confirmNewPassword?.message?.toString()}
										</p>
									)}
								</Form.Group>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="secondary"
								onClick={() => setShowUpdatePasswordModal(false)}
							>
								Close
							</Button>
							<Button variant="primary" type="submit">
								Update
							</Button>
						</Modal.Footer>
					</form>
				</Modal>
			)}
			<ToastContainer position="bottom-center" autoClose={5000} closeOnClick />
		</>
	);
};
