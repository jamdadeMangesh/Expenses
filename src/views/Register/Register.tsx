import React, { useRef } from "react";

import "./Register.scss";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import { useHeaderContext } from "../../context/HeaderContext";

export const Register = () => {
	const { setTitle, setShowBackArrow } = useHeaderContext();
	React.useEffect(() => {
		setTitle("Register");
		setShowBackArrow(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
        getValues
	} = useForm();

	const password = useRef({});
	password.current = watch("password", "");

	const onSubmit = (data: any) => {
		console.log(data);
	};
	return (
		<>
			<div className="loginWrapper">
				<form onSubmit={handleSubmit(onSubmit)} className="appWrapper__form">
					<Form.Group className="mb-3" controlId="name">
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
					<Form.Group className="mb-3" controlId="email">
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
							placeholder="Enter your email"
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
					<Form.Group className="mb-3" controlId="password">
						<Form.Label>
							Password
							<sup>
								<span>
									<CgAsterisk style={{ color: "#D82C0D" }} />
								</span>
							</sup>
						</Form.Label>
						<Form.Control
							type="password"
							placeholder="*****"
							{...register("password", {
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
						/>
						{errors.password && (
							<p className="loginWrapper__errorMsg">
								{errors?.password?.message?.toString()}
							</p>
						)}
					</Form.Group>
					<Form.Group className="mb-3" controlId="confirmPassword">
						<Form.Label>
							Confirm Password
							<sup>
								<span>
									<CgAsterisk style={{ color: "#D82C0D" }} />
								</span>
							</sup>
						</Form.Label>
						<Form.Control
							type="password"
							placeholder="*****"
							{...register("confirm_password", {
								required: "Please re enter your password",
								validate: (value) => {
                                    const { password } = getValues();
                                    return password === value || "Password must be same";
                                  }
							})}
						/>
						{errors.confirm_password && (
							<p className="loginWrapper__errorMsg">
								{errors?.confirm_password?.message?.toString()}
							</p>
						)}
					</Form.Group>

					<div className="login__submit">
						<Button
							variant="primary"
							type="submit"
							className="w-100 buttonHeight"
							//onClick={() => logInWithEmailAndPassword(email, password)}
						>
							Register
						</Button>
					</div>
					<div className="divider__common"></div>
				</form>

				<div className="login__register my-3">
					<div className="text-center mb-3">Already have an account? </div>
					<Button
						variant="outline-primary"
						type="submit"
						className="w-100 buttonHeight"
						onClick={() => navigate("/login")}
						//onClick={() => logInWithEmailAndPassword(email, password)}
					>
						Login
					</Button>
				</div>
			</div>
		</>
	);
};
