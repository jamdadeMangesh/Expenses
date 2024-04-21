import React, { useRef, useState } from "react";

import "./Register.scss";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import { useHeaderContext } from "../../context/HeaderContext";
import { GoCopy } from "react-icons/go";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { authentication, database } from "../../shared/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Alerts } from "../../components/Alerts/Alerts";
import { authenticationErrors } from "../../shared/constant";

export const Register = () => {
	const { setTitle, setShowBackArrow } = useHeaderContext();
	const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);
	const [showErrors, setShowErrors] = useState(false);
	const [copyData, setCopyData] = useState("");
	const [firebaseErrors, setFirebaseErrors] = useState<string>("");

	React.useEffect(() => {
		setTitle("Create a new user");
		setShowBackArrow(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		reset
	} = useForm();

	const password = useRef({});
	password.current = watch("password", "");

	const onSubmit = (data: any) => {

		const getFirstName = data?.name.split(" ")[0];
		const mobileLastDigit = data?.mobileNumber.slice(-4);
		const password = getFirstName + "@" + mobileLastDigit;
		data['canAccess'] = true;

		if (data) {
			createUserWithEmailAndPassword(authentication, data?.email, password)
				.then(async (userCredential) => {
					await setDoc(doc(database, "users", userCredential.user.uid), {
						canAccess: true,
						email: data?.email,
						mobileNumber: data?.mobileNumber,
						name: data?.name,
						role: data?.role
					});
					navigator.clipboard.writeText("email: " + data.email + ", password: " + password)
					reset();
				})
				.then(() => {
					setCopyData("email: " + data.email + ", password: " + password);
					setShowCopyToClipboard(true);
					signOut(authentication);
					setTimeout(() => {
						setShowCopyToClipboard(false);
					}, 20000);
				})
				.catch((error) => {
					if (error) {
						setFirebaseErrors(authenticationErrors(error.code) as string);
						setShowErrors(true);
						console.log("errors:", error);
					}
					console.log(
						"Error code:",
						error.code,
						"Error message:",
						error.message
					);
				});
		}
	};

	return (
		<>
			<div className="loginWrapper">
				<form onSubmit={handleSubmit(onSubmit)} className="loginWrapper__form">
					<div className="loginWrapper__form-content">
						<div className="loginWrapper__form-group">
							<Alerts
								errors={firebaseErrors}
								show={showErrors}
								setShow={() => setShowErrors(false)}
								isSuccess={false}
							/>
						</div>
						<Form.Group className="loginWrapper__form-group" controlId="name">
							<Form.Label>
								Name{" "}
								<sup>
									<span>
										<CgAsterisk style={{ color: "#D82C0D" }} />
									</span>
								</sup>
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your name"
								{...register("name", {
									required: "Please enter your name",
									pattern: {
										value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/,
										message: "Please enter a valid name",
									},
								})}
								autoComplete="off"
							/>
							{errors.name && (
								<p className="loginWrapper__errorMsg">
									{errors?.name?.message?.toString()}
								</p>
							)}
						</Form.Group>
						<Form.Group className="loginWrapper__form-group" controlId="email">
							<Form.Label>
								Email{" "}
								<sup>
									<span>
										<CgAsterisk style={{ color: "#D82C0D" }} />
									</span>
								</sup>
							</Form.Label>
							<Form.Control
								type="email"
								placeholder="exampple@mail.com"
								{...register("email", {
									required: "Please enter your email",
									pattern: {
										value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
										message: "Please enter a valid email",
									},
								})}
								autoComplete="off"
							/>
							{errors.email && (
								<p className="loginWrapper__errorMsg">
									{errors?.email?.message?.toString()}
								</p>
							)}
						</Form.Group>
						<Form.Group
							className="loginWrapper__form-group"
							controlId="mobileNumber"
						>
							<Form.Label>
								Mobile Number
								<sup>
									<span>
										<CgAsterisk style={{ color: "#D82C0D" }} />
									</span>
								</sup>
							</Form.Label>
							<Form.Control
								type="number"
								placeholder="9876543210"
								{...register("mobileNumber", {
									required: "Please enter your mobile number",
									pattern: {
										value: /^[6-9]\d{9}$/,
										message: "Please enter valid mobile number",
									},
								})}
							/>
							{errors.mobileNumber && (
								<p className="loginWrapper__errorMsg">
									{errors?.mobileNumber?.message?.toString()}
								</p>
							)}
						</Form.Group>
						<Form.Group className="loginWrapper__form-group" controlId="role">
							<Form.Label>Role</Form.Label>
							<div>
								<Form.Check
									type="radio"
									label="Admin"
									value="admin"
									inline
									{...register("role", {
										required: "Please select role",
									})}
								/>
								<Form.Check
									type="radio"
									label="User"
									value="user"
									inline
									{...register("role")}
								/>
							</div>
							{errors.role && (
								<p className="loginWrapper__errorMsg">
									{errors.role.message?.toString()}
								</p>
							)}
						</Form.Group>
						{showCopyToClipboard && (
							<div className="loginWrapper__form-group">
								<div className="divider__common"></div>
								<p>Plase copy this credentials and share it to user.</p>
								<Button
									variant="success"
									className="w-100 buttonHeight"
									onClick={() => navigator.clipboard.writeText(copyData)}
								>
									<GoCopy className="iconSize20" /> Copy to clipboard
								</Button>
							</div>
						)}
					</div>
					<div className="loginWrapper__submit">
						<Button
							variant="primary"
							type="submit"
							className="w-100 buttonHeight"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Adding new user..." : "Register"}
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};
