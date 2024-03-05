import React, { useRef, useState } from "react";

import "./Login.scss";
import { Button, Form, Overlay, Tooltip } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import { FcInfo } from "react-icons/fc";
import { useHeaderContext } from "../../context/HeaderContext";

export const Login = () => {
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const isLoginForUser = location.state;

	const { setTitle, setShowBackArrow } = useHeaderContext();
	React.useEffect(() => {
        setTitle(isLoginForUser?.isUserLogin ? "Login for Users" : "Login for Super Admin");
		setShowBackArrow(true);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	

	const [show, setShow] = useState(false);
	const target = useRef(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data: any) => {
		console.log(data);
	};
	return (
		<>
			<div className="loginWrapper" data-testid="loginWrapper">
				<form onSubmit={handleSubmit(onSubmit)} className="loginWrapper__form">
					<Form.Group className="mb-3" controlId="email">
						<Form.Label data-testid="loginWrapper__labelEmail">
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
                            data-testid="loginWrapper__inputEmail"
						/>
						{errors.email && (
							<p className="loginWrapper__errorMsg">
								{errors?.email?.message?.toString()}
							</p>
						)}
					</Form.Group>
					<Form.Group className="mb-3" controlId="password">
						<Form.Label data-testid="loginWrapper__labelPassword">
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
                            data-testid="loginWrapper__inputPassword"
						/>
						{errors.password && (
							<p className="loginWrapper__errorMsg">
								{errors?.password?.message?.toString()}
							</p>
						)}
					</Form.Group>
					<Form.Group className="mb-3" controlId="loginCode">
						<Overlay target={target.current} show={show} placement="bottom">
							{(props) => (
								<Tooltip id="overlay-example" {...props}>
									Login code is special code given by super admin. Each user has
									different login code.
								</Tooltip>
							)}
						</Overlay>
						<Form.Label className="w-100" data-testid="loginWrapper__labelLoginCode">
							<div className="loginWrapper__label">
								<span>
									Login Code
									<sup>
										<span>
											<CgAsterisk style={{ color: "#D82C0D" }} />
										</span>
									</sup>
								</span>
								<span ref={target}>
									<FcInfo onClick={() => setShow(!show)} />
								</span>
							</div>
						</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter your login code"
							{...register("loginCode", {
								required: "Please enter your login code",
							})}
                            data-testid="loginWrapper__inputLoginCode"
						/>

						{errors.loginCode && (
							<p className="loginWrapper__errorMsg">
								{errors?.loginCode?.message?.toString()}
							</p>
						)}
					</Form.Group>

					<div
						className="login__forgotPassword mt- 3 mb-4"
                        data-testid="loginWrapper__forgotPassword"
						//	onClick={() => setShowResetModal(true)}
					>
						Forgot password?
					</div>
					<div className="login__submit">
						<Button
							variant="primary"
							type="submit"
							className="w-100 buttonHeight"
                            data-testid="loginWrapper__loginBtn"
							//onClick={() => logInWithEmailAndPassword(email, password)}
                            onClick={() => navigate("/dashboard")}
						>
							Login
						</Button>
					</div>
					<div className="divider__common"></div>
				</form>

				<div className="login__register my-3">
					<div className="text-center mb-3" data-testid="loginWrapper__accountText">Don't have an account? </div>
					<Button
						variant="outline-primary"
						type="submit"
						className="w-100 buttonHeight"
						onClick={() => navigate("/register")}
                        data-testid="loginWrapper__registerBtn"
						//onClick={() => logInWithEmailAndPassword(email, password)}
					>
						Register
					</Button>
				</div>
			</div>
		</>
	);
};
