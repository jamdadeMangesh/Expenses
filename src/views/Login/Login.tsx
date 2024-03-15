import React, { useEffect, useState } from "react";

import "./Login.scss";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import { useHeaderContext } from "../../context/HeaderContext";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../../shared/firebase";
import { Alerts } from "../../components/Alerts/Alerts";
import { authenticationErrors } from "../../shared/constant";

export const Login = () => {
	const navigate = useNavigate();
	const [showErrors, setShowErrors] = useState(false);
	const [firebaseErrors, setFirebaseErrors] = useState<string>("");

	const { setTitle, setShowBackArrow } = useHeaderContext();

    useEffect(() => {
		onAuthStateChanged(authentication, (user) => {
			if (user) {
				navigate("/dashboard");
			} else {
				navigate("/login");
			}
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
    
	React.useEffect(() => {
		setTitle("Sign In");
		setShowBackArrow(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// useEffect(() => {
	// 	if (user) navigate("/dashboard");
	// }, [user]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data: any) => {
		console.log(data);
		if (data) {
			try {
				await signInWithEmailAndPassword(
					authentication,
					data?.email,
					data?.password
				);
			} catch (err: any) {
				if (err) {
					setFirebaseErrors(authenticationErrors(err.code) as string);
					setShowErrors(true);
					console.log("errors:", err);
				}
			}
		}
	};
	return (
		<>
			<div className="loginWrapper" data-testid="loginWrapper">
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
						<Form.Group className="loginWrapper__form-group" controlId="email">
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
								className={errors.email && "inputError"}
							/>
							{errors.email && (
								<p className="loginWrapper__errorMsg">
									{errors?.email?.message?.toString()}
								</p>
							)}
						</Form.Group>
						<Form.Group
							className="loginWrapper__form-group"
							controlId="password"
						>
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
									// pattern: {
									// 	value:
									// 		/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
									// 	message:
									// 		"Password must have atleast a symbol, upper & lower case letter and number",
									// },
									// minLength: {
									// 	value: 8,
									// 	message: "Password must have at least 8 characters",
									// },
								})}
								data-testid="loginWrapper__inputPassword"
								className={errors.password && "inputError"}
							/>
							{errors.password && (
								<p className="loginWrapper__errorMsg">
									{errors?.password?.message?.toString()}
								</p>
							)}
						</Form.Group>
						<div className="divider__common"></div>
						<div
							className="login__forgotPassword mt- 3 mb-4 loginWrapper__form-group"
							data-testid="loginWrapper__forgotPassword"
							//	onClick={() => setShowResetModal(true)}
						>
							Forgot password?
						</div>
					</div>
					<div className="loginWrapper__submit">
						<Button
							variant="primary"
							type="submit"
							className="w-100 buttonHeight"
							data-testid="loginWrapper__loginBtn"
							//onClick={() => logInWithEmailAndPassword(email, password)}
							//onClick={() => navigate("/dashboard")}
						>
							Login
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};
