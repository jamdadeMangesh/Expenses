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
import { AddExpense } from "./views/AddNew/AddExpense";
import { Profile } from "./views/Profile/Profile";
import { ExpenseDetails } from "./views/ExpenseDetails/ExpenseDetails";
import { doc, getDoc } from "firebase/firestore";
import { authentication, database } from "./shared/firebase";
import { SET_USER_DATA } from "./views/Login/LoginSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { Users } from "./views/Users/Users";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [width, setWidth] = useState(window.innerWidth);
	const [user] = useAuthState(authentication);

	const dispatch = useDispatch();
	const updateDimensions = () => {
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		if (user) {
			(async () => {
				const doc_refs = await getDoc(doc(database, "users", user.uid));
                dispatch(SET_USER_DATA(doc_refs?.data()?.data));
			})();
			return () => {
				// this now gets called when the component unmounts
			};
		}
	}, [dispatch, user]);
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
									routes.find(
										(r) => r.page === ApplicationPages.TransactionsList
									)?.route
								}
								Component={TransactionsList}
							/>
							<Route
								path={
									routes.find((r) => r.page === ApplicationPages.AddExpense)
										?.route
								}
								Component={AddExpense}
							/>
							<Route
								path={
									routes.find((r) => r.page === ApplicationPages.Profile)?.route
								}
								Component={Profile}
							/>
							<Route
								path={
									routes.find((r) => r.page === ApplicationPages.ExpenseDetails)
										?.route + "/:id"
								}
								Component={ExpenseDetails}
							/>
							<Route
								path={
									routes.find((r) => r.page === ApplicationPages.Users)
										?.route
								}
								Component={Users}
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
