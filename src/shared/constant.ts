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
]

