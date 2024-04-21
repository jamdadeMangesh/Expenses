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
import donation from "../assets/icons/donation.png";
import sell from "../assets/icons/sell.png";
import dhwaj from "../assets/icons/dhwaj.png";
import {
	ref,
	deleteObject,
	uploadString,
	getDownloadURL,
} from "firebase/storage";
import { DateTime } from "luxon";
import Resizer from "react-image-file-resizer";

// List of pages
export enum ApplicationPages {
	Home = "Home",
	Login = "Login",
	Register = "Regsiter",
	Dashboard = "Dashboard",
	AddExpense = "AddExpense",
	AddIncome = "AddIncome",
	TransactionsList = "TransactionsList",
	ExpenseDetails = "ExpenseDetails",
	IncomeDetails = "IncomeDetails",
	Profile = "Profile",
	Users = "Users",
	EditExpense = "EditExpense",
	EditIncome = "EditIncome",
	UserDetails = "UserDetails",
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
		page: ApplicationPages.AddIncome,
		route: "/addIncome",
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
		page: ApplicationPages.IncomeDetails,
		route: "/incomeDetails",
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
	{
		page: ApplicationPages.EditIncome,
		route: "/editIncome",
		showHeader: true,
		showNav: false,
	},
	{
		page: ApplicationPages.UserDetails,
		route: "/userDetails",
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
		totalAmountArr.push(parseFloat(a?.amount))
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

export const getAllIncomeTransactions = async () => {
	//const doc_refs = await query(collection(database, "transactions"), where("personName", "==", name));
	const doc_refs = query(collection(database, "income"));
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
		case "donation":
		case "miravnuk charges":
			return donation;
		case "material sell":
			return sell;
		case "dhwaj material":
			return dhwaj;
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

export const incomeCategory = [
	"Miravnuk Charges",
	"Donation",
	"Uniform",
	"ICard",
	"Material Sell",
	"Other"
];

const a = [
	"",
	"One ",
	"Two ",
	"Three ",
	"Four ",
	"Five ",
	"Six ",
	"Seven ",
	"Eight ",
	"Nine ",
	"Ten ",
	"Eleven ",
	"Twelve ",
	"Thirteen ",
	"Fourteen ",
	"Fifteen ",
	"Sixteen ",
	"Seventeen ",
	"Eighteen ",
	"Nineteen ",
];
const b = [
	"",
	"",
	"Twenty",
	"Thirty",
	"Forty",
	"Fifty",
	"Sixty",
	"Seventy",
	"Eighty",
	"Ninety",
];

export function convertNumberToWords(value: any): any {
	if (value) {
		let number = parseFloat(value).toFixed(2).split(".");
		let num = parseInt(number[0]);
		let digit = parseInt(number[1]);
		if (num) {
			if (num.toString().length > 9) {
				return "";
			}
			const n: any = ("000000000" + num)
				.substr(-9)
				.match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
			const d: any = ("00" + digit).substr(-2).match(/^(\d{2})$/);
			if (!n) {
				return "";
			}
			let str = "";
			str +=
				Number(n[1]) !== 0
					? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore "
					: "";
			str +=
				Number(n[2]) !== 0
					? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh "
					: "";
			str +=
				Number(n[3]) !== 0
					? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand "
					: "";
			str +=
				Number(n[4]) !== 0
					? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred "
					: "";
			str +=
				Number(n[5]) !== 0
					? (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) + "Rupee "
					: "";
			str +=
				Number(d[1]) !== 0
					? (str !== "" ? "and " : "") +
					  (a[Number(d[1])] || b[d[1][0]] + " " + a[d[1][1]]) +
					  "Paise Only"
					: "Only";
			return str;
		} else {
			return "";
		}
	} else {
		return "";
	}
}

const resizeFile = (file: any) =>
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			file,
			800,
			800,
			"PNG",
			100,
			0,
			(uri) => {
				resolve(uri);
			},
			"base64"
		);
	});

export const uploadImageToStorage = async (file: any, personName: string) => {
	if (file) {
		let url="";
		const storageRef = ref(
			storage,
			`/files/${
				personName.replace(/ /g, "_") + "_" + DateTime.now().toUnixInteger()
			}`
		);

		const uri: any = await resizeFile(file);
		await uploadString(storageRef, uri, "data_url").then(async (snapshot: any) => {
			url = await getDownloadURL(snapshot.ref);
        });
        return url;
	}
};
