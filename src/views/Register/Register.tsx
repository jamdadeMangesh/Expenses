import React, { useRef, useState } from "react";

import "./Register.scss";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import { useHeaderContext } from "../../context/HeaderContext";
import { GoCopy } from "react-icons/go";

export const Register = () => {
	const { setTitle, setShowBackArrow } = useHeaderContext();
	const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);
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
	} = useForm();

	const password = useRef({});
	password.current = watch("password", "");
	const onSubmit = (data: any) => {
		console.log(data);
		if (data) {
			setShowCopyToClipboard(true);
		}
	};
	return (
		<>
			<div className="loginWrapper">
				<form onSubmit={handleSubmit(onSubmit)} className="loginWrapper__form">
					<div className="loginWrapper__form-content">
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
								>
									<GoCopy className="iconSize20"/> Copy to clipboard
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
							//onClick={() => logInWithEmailAndPassword(email, password)}
						>
							{isSubmitting ? "Adding new user..." : "Register"}
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};
