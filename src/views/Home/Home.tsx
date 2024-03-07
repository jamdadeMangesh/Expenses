import React from "react";
import { Button } from "react-bootstrap";
import "./Home.scss";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";


export const Home = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className="homeWrapper" data-testid="homeWrapper">
				<div className="homeWrapper__logo blob-layer">
					<img
						src={logo}
						alt="logo"
						className="homeWrapper__logo-img"
						data-testid="homeWrapper__logo"
					/>
				</div>
				<div className="homeWrapper__content p-3">
					<h3 className="text-center mb-4" data-testid="homeWrapper__subtext">
						Welcome to Vajra Expenses
					</h3>
					<div className="loginOptions__grid">
						<Button
							variant="primary"
							data-testid="homeWrapper__userBtn"
                            className="buttonHeight"
							onClick={() => navigate("/login", {state: {isUserLogin: true}})}
						>
							 Login to continue
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
