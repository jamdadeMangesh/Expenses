import React from "react";
import { render, screen, within } from "@testing-library/react";
import { HeaderContextProvider } from "../../context/HeaderContext";
import { Dashboard } from "./Dashboard";
import { Greetings } from "../../shared/constant";
import { Provider } from "react-redux";
import { store } from "../../store/store";

const renderComponent = () =>
	render(
		<Provider store={store}>
			<HeaderContextProvider>
				<Dashboard />
			</HeaderContextProvider>
		</Provider>
	);

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockUsedNavigate,
}));

describe("Should render Dashboard component without crashing", () => {
	test("renders dashboard component", () => {
		expect(() =>
			render(
				<Provider store={store}>
					<HeaderContextProvider>
						<Dashboard />
					</HeaderContextProvider>
				</Provider>
			)
		).not.toThrow();
	});

	test("should render dashboard wrapper", () => {
		renderComponent();
		const dashboardWrapper = screen.getByTestId("dashboardWrapper");
		expect(dashboardWrapper).toBeInTheDocument();
	});

	test("should render dashboard greeting container", () => {
		renderComponent();
		const dashboardWrapper__greeting = screen.getByTestId(
			"dashboardWrapper__greeting"
		);
		expect(dashboardWrapper__greeting).toBeInTheDocument();
	});

	test("should render dashboard greeting message", () => {
		renderComponent();
		const dashboard__greeting_subtitle = screen.getByTestId(
			"dashboard__greeting_subtitle"
		);
		expect(dashboard__greeting_subtitle).toBeInTheDocument();

		const { getByText } = within(dashboard__greeting_subtitle);
		expect(getByText(Greetings())).toBeInTheDocument();
	});

	test("should render dashboard stats title", () => {
		renderComponent();
		const dashboard__stats_title = screen.getByTestId("dashboard__stats_title");
		expect(dashboard__stats_title).toBeInTheDocument();

		const { getByText } = within(dashboard__stats_title);
		expect(getByText("Your Total Expenses")).toBeInTheDocument();
	});

	test("should render dashboard stats amount", () => {
		renderComponent();
		const dashboard__stats_amount = screen.getByTestId(
			"dashboard__stats_amount"
		);
		expect(dashboard__stats_amount).toBeInTheDocument();
	});

	test("should render dashboard monthly amount", () => {
		renderComponent();
		const dashboard__stats_monthlyAmount = screen.getByTestId(
			"dashboard__stats_monthlyAmount"
		);
		expect(dashboard__stats_monthlyAmount).toBeInTheDocument();

		const { getByText } = within(dashboard__stats_monthlyAmount);
		expect(getByText("Last month's transactions :")).toBeInTheDocument();
	});
});
