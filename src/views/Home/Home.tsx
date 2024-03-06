import React from "react";
import { Button } from "react-bootstrap";
import "./Home.scss";
import logo from "../../assets/logo.png";
import { LiaUserShieldSolid, LiaUserSolid } from "react-icons/lia";
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
					<p className="text-center mb-5" data-testid="homeWrapper__subtext">
						Please login using following options
					</p>

					<div className="loginOptions__grid">
						<Button
							variant="primary"
							data-testid="homeWrapper__superAdminBtn"
							onClick={() => navigate("/login", {state: {isUserLogin: false}})}
						>
							<LiaUserShieldSolid /> Super Admin
						</Button>
					</div>
					<div className="divider__login m-3">
						<span>OR</span>
					</div>
					<div className="loginOptions__grid">
						<Button
							variant="danger"
							data-testid="homeWrapper__userBtn"
							onClick={() => navigate("/login", {state: {isUserLogin: true}})}
						>
							<LiaUserSolid /> User
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
