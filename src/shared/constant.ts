import { query, collection, getDocs } from "firebase/firestore";
import { database } from "./firebase";
import snacks from "../assets/icons/snacks.png";
import travel from "../assets/icons/travel.png";
import transport from "../assets/icons/transport.png";
import material from "../assets/icons/material.png";
import tea from "../assets/icons/tea.png";
import coldCoffee from "../assets/icons/coldCoffee.png";
import rope from "../assets/icons/rope.png";
import dhol from "../assets/icons/dhol.png";
import tasha from "../assets/icons/tasha.png";
import flowers from "../assets/icons/flowers.png";

// List of pages
export enum ApplicationPages {
	Home = "Home",
	Login = "Login",
	Register = "Regsiter",
	Dashboard = "Dashboard",
	AddExpense = "AddExpense",
	TransactionsList = "TransactionsList",
	ExpenseDetails = "ExpenseDetails",
	Profile = "Profile",
	Users = "Users",
}

// Interface to define route options
export interface ApplicationRoutesOptions {
	page: ApplicationPages;
	route: string;
	showHeader?: boolean;
	showNav?: boolean;
}

export const ApplicationRoutes: ApplicationRoutesOptions[] = [
	{
		page: ApplicationPages.Home,
		route: "/",
		showHeader: false,
		showNav: false,
	},
	{
		page: ApplicationPages.Login,
		route: "/login",
		showHeader: true,
		showNav: false,
	},
	{
		page: ApplicationPages.Register,
		route: "/register",
		showHeader: true,
		showNav: false,
	},
	{
		page: ApplicationPages.Dashboard,
		route: "/dashboard",
		showHeader: false,
		showNav: true,
	},
	{
		page: ApplicationPages.TransactionsList,
		route: "/transactionsList",
		showHeader: true,
		showNav: true,
	},
	{
		page: ApplicationPages.AddExpense,
		route: "/addExpense",
		showHeader: true,
		showNav: false,
	},
	{
		page: ApplicationPages.ExpenseDetails,
		route: "/expenseDetails",
		showHeader: true,
		showNav: false,
	},
	{
		page: ApplicationPages.Profile,
		route: "/profile",
		showHeader: true,
		showNav: true,
	},
	{
		page: ApplicationPages.Users,
		route: "/users",
		showHeader: true,
		showNav: true,
	},
];
//Get greeting message according to time
export const Greetings = () => {
	let myDate = new Date();
	let hours = myDate.getHours();
	let greet;

	if (hours < 12) greet = "morning";
	else if (hours >= 12 && hours <= 17) greet = "afternoon";
	else if (hours >= 17 && hours <= 24) greet = "evening";

	return "Good " + greet;
};

//firebase authentication error code
export const authenticationErrors = (errorCode: string) => {
	switch (errorCode) {
		case "auth/invalid-credential":
			return "Invalid credentials. Please try again!";

		case "auth/invalid-email":
			return "Invalid email id";

		case "auth/missing-password":
			return "Password is required";

		case "auth/weak-password":
			return "Password should be at least 6 characters";

		case "auth/missing-email":
			return "Email id is required";

		case "auth/email-already-in-use":
			return "Email id already exists.";
	}
};

//Get total amount
export const totalExpenses = (transactionsData: any) => {
	let totalAmountArr: any = [];
	let total = 0;
	Object.values(transactionsData).map((a: any) =>
		totalAmountArr.push(parseFloat(a?.data?.amount))
	);
	for (let price of Object.values(totalAmountArr)) {
		total += price as number;
	}
	return total;
};

//get all transactions
export const getAllTransactions = async () => {
	//const doc_refs = await query(collection(database, "transactions"), where("personName", "==", name));
	const doc_refs = query(collection(database, "transactions"));
	const querySnapshot = await getDocs(doc_refs);

	const res: any = [];

	querySnapshot.forEach((item) => {
		res.push({
			id: item.id,
			...item.data(),
		});
	});
	return res;
};

export const getAllUsers = async () => {
	const doc_refs = await getDocs(collection(database, "users"));
	return doc_refs;
};

export const getCategoryIcon = (categoryName: string) => {
	switch (categoryName?.toLowerCase()) {
		case "snacks":
			return snacks;
		case "travel":
			return travel;
		case "materials":
			return material;
		case "transport":
			return transport;
		case "tea":
			return tea;
		case "cold coffee":
			return coldCoffee;
		case "rope":
			return rope;
		case "dhol material":
			return dhol;
		case "tasha material":
			return tasha;
		case "flowers":
			return flowers;
		default:
			return "";
	}
};

export const categories = [
	"Snacks",
	"Materials",
	"Travel",
	"Transport",
	"Tea",
	"Cold Coffee",
	"Rope",
	"Dhol Material",
	"Tasha Material",
	"Flowers",
];
