import { query, collection, getDocs, getDoc, doc } from "firebase/firestore";
import { database, storage } from "./firebase";
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
import electrical from "../assets/icons/electrical.png";
import flex from "../assets/icons/flex.png";
import food from "../assets/icons/food.png";
import rent from "../assets/icons/rent.png";
import icard from "../assets/icons/icard.png";
import user from "../assets/icons/user.png";
import medical from "../assets/icons/medical.png";
import pooja from "../assets/icons/pooja.png";
import shed from "../assets/icons/shed.png";
import uniform from "../assets/icons/uniform.png";
import water from "../assets/icons/water.png";
import xerox from "../assets/icons/xerox.png";
import other from "../assets/icons/other.png";
import { ref, deleteObject } from "firebase/storage";

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
	EditExpense = "EditExpense",
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
	{
		page: ApplicationPages.EditExpense,
		route: "/editExpense",
		showHeader: true,
		showNav: false,
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

export const getCurrentUser = async (uid: string) => {
	const doc_refs = await getDoc(doc(database, "users", uid));
	return doc_refs;
};

export const onDeleteImage = (imageUrl: string) => {
	//if (imageUrl) {
	const desertRef = ref(storage, imageUrl);

	const deleteDocRef = deleteObject(desertRef);
	return deleteDocRef;
	//}
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
        case "dhol paan repair":
			return dhol;
		case "tasha material":
			return tasha;
		case "flowers":
			return flowers;
		case "electrical":
			return electrical;
		case "flex":
			return flex;
		case "food":
			return food;
		case "hall rent":
			return rent;
		case "icard":
			return icard;
		case "ligade kaka":
		case "naik kaka":
			return user;
		case "medical":
			return medical;
		case "pooja material":
			return pooja;
		case "shed":
			return shed;
		case "uniform":
			return uniform;
		case "water":
			return water;
		case "xerox":
			return xerox;
		case "other":
			return other;
		default:
			return other;
	}
};

export const categories = [
	"Dhol Material",
    "Dhol paan repair",
    "Dhwaj material",
    "Electrical",
    "Flex",
    "Flowers",
    "Food",
    "Hall rent",
    "Icard",
    "Ligade kaka",
    "Medical",
    "Naik kaka",
    "Pooja material",
    "Rope bundle",
    "Shed",
    "Snacks",
    "Tasha Material",
    "Tea",
    "Transport",
    "Uniform",
    "Water",
    "Xerox",
	"Other",
];
