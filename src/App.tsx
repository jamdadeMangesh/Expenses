import React, { useEffect, useState } from "react";
import "./App.scss";
import "./base.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./views/Home/Home";
import { Login } from "./views/Login/Login";
import { ApplicationPages, ApplicationRoutes } from "./shared/constant";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { Register } from "./views/Register/Register";
import { Alert } from "react-bootstrap";
import { Dashboard } from "./views/Dashboard/Dashboard";
import { AppNav } from "./components/AppNav/AppNav";
import { TransactionsList } from "./views/TransactionsList/TransactionsList";

function App() {
	const [width, setWidth] = useState(window.innerWidth);
	const updateDimensions = () => {
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	const routes = ApplicationRoutes;
	return (
		<div className="App">
			{width < 600 ? (
				<>
					<Router>
						<AppHeader />
						<Routes>
							<Route
								path={
									routes.find((r) => r.page === ApplicationPages.Home)?.route
								}
								Component={Home}
							/>
							<Route
								path={
									routes.find((r) => r.page === ApplicationPages.Login)?.route
								}
								Component={Login}
							/>
							<Route
								path={
									routes.find((r) => r.page === ApplicationPages.Register)
										?.route
								}
								Component={Register}
							/>
							<Route
								path={
									routes.find((r) => r.page === ApplicationPages.Dashboard)
										?.route
								}
								Component={Dashboard}
							/>
							<Route
								path={
									routes.find((r) => r.page === ApplicationPages.TransactionsList)
										?.route
								}
								Component={TransactionsList}
							/>
						</Routes>
						<AppNav />
					</Router>
				</>
			) : (
				<div className="desktopAlert">
					<Alert variant="warning">
						<Alert.Heading>Ohhh. Something went wrong!</Alert.Heading>
						<p>
							Please open this application in smaller device for better
							performance.
						</p>
						<hr />
						<p className="mb-0">Use Google Chrome to open this application</p>
					</Alert>
				</div>
			)}
		</div>
	);
}

export default App;
