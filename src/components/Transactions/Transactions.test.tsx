import React from "react";
import { render, screen } from "@testing-library/react";
import { HeaderContextProvider } from "../../context/HeaderContext";
import { Transactions } from "./Transactions";
import { Provider } from "react-redux";
import { store } from "../../store/store";

const renderComponent = () =>
	render(
		<Provider store={store}>
			<HeaderContextProvider>
				<Transactions data={data} transactionId={"123"} />
			</HeaderContextProvider>
		</Provider>
	);

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockUsedNavigate,
}));

const data = [
	{
		id: "101",
		category: "Snacks",
		personName: "Ashutosh",
		spentDate: "15th Feb 2024",
		amount: 800.0,
	},
];

describe("Should render transactions component without crashing", () => {
	test("renders home component", () => {
		expect(() =>
			render(
				<Provider store={store}>
					<HeaderContextProvider>
						<Transactions data={data} transactionId={"123"} />
					</HeaderContextProvider>
				</Provider>
			)
		).not.toThrow();
	});

	test("should render transactions grid", () => {
		renderComponent();
		const transactions__grid = screen.getByTestId("transactions__grid");
		expect(transactions__grid).toBeInTheDocument();
	});

	test("should render transactions grid icon", () => {
		renderComponent();
		const transactions__grid_icon = screen.getByTestId(
			"transactions__grid_icon"
		);
		expect(transactions__grid_icon).toBeInTheDocument();
	});

	test("should render transactions category", () => {
		renderComponent();
		const transactions__grid_category = screen.getByTestId(
			"transactions__grid_category"
		);
		expect(transactions__grid_category).toBeInTheDocument();
	});

	test("should render transactions spent date", () => {
		renderComponent();
		const transactions__grid_spentDate = screen.getByTestId(
			"transactions__grid_spentDate"
		);
		expect(transactions__grid_spentDate).toBeInTheDocument();
	});

	test("should render transactions spent amount", () => {
		renderComponent();
		const transactions__grid_amount = screen.getByTestId(
			"transactions__grid_amount"
		);
		expect(transactions__grid_amount).toBeInTheDocument();
	});
});
