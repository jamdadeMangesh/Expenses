// List of pages
export enum ApplicationPages {
    Home = "Home",
    Login = "Login",
    Register = "Regsiter",
    Dashboard = "Dashboard",
    AddExpense = "AddExpense",
    TransactionsList = "TransactionsList",
    ExpenseDetails = "ExpenseDetails",
    Profile = "Profile"
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
        showNav: false
    },
    {
        page: ApplicationPages.Login,
        route: "/login",
        showHeader: true,
        showNav: false
    },
    {
        page: ApplicationPages.Register,
        route: "/register",
        showHeader: true,
        showNav: false
    },
    {
        page: ApplicationPages.Dashboard,
        route: "/dashboard",
        showHeader: false,
        showNav: true
    },
    {
        page: ApplicationPages.TransactionsList,
        route: "/transactionsList",
        showHeader: true,
        showNav: true
    },
    {
        page: ApplicationPages.AddExpense,
        route: "/addExpense",
        showHeader: true,
        showNav: false
    },
    {
        page: ApplicationPages.ExpenseDetails,
        route: "/expenseDetails",
        showHeader: true,
        showNav: false
    },{
        page: ApplicationPages.Profile,
        route: "/profile",
        showHeader: true,
        showNav: true
    },
]
//Get greeting message according to time
export const Greetings = () => {
    let myDate = new Date();
    let hours= myDate.getHours();
    let greet;

    if (hours < 12)
        greet =  "morning";
    else if (hours >= 12 && hours <= 17)
        greet = "afternoon";
    else if (hours >= 17 && hours <= 24)
       greet = "evening";
    
    return "Good " + greet
}