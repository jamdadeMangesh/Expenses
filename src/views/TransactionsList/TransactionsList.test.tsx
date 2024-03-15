import React from "react";
import { render, screen } from "@testing-library/react";
import { HeaderContextProvider } from "../../context/HeaderContext";
import { TransactionsList } from "./TransactionsList";
import { Provider } from "react-redux";
import { store } from "../../store/store";

const renderComponent = () =>
	render(
		<Provider store={store}>
			<HeaderContextProvider>
				<TransactionsList />
			</HeaderContextProvider>
		</Provider>
	);

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockUsedNavigate,
}));

describe("Should render Transaction list component without crashing", () => {
	test("renders Transaction list component", () => {
		expect(() =>
			render(
				<Provider store={store}>
					<HeaderContextProvider>
						<TransactionsList />
					</HeaderContextProvider>
				</Provider>
			)
		).not.toThrow();
	});

	test("should render Transaction list wrapper", () => {
		renderComponent();
		const transactionsListWrapper = screen.getByTestId(
			"transactionsListWrapper"
		);
		expect(transactionsListWrapper).toBeInTheDocument();
	});

	test("should render Transaction list search input", () => {
		renderComponent();
		const transactionsListWrapper_searchInput = screen.getByTestId(
			"transactionsListWrapper_searchInput"
		);
		expect(transactionsListWrapper_searchInput).toBeInTheDocument();
	});

	test("should render Transaction list filter", () => {
		renderComponent();
		const transactionsListWrapper_appliedFilterAmount = screen.getByTestId(
			"transactionsListWrapper_appliedFilterAmount"
		);
		expect(transactionsListWrapper_appliedFilterAmount).toBeInTheDocument();
	});

	test("should render Transaction list content wrapper", () => {
		renderComponent();
		const transactionsListWrapper_content = screen.getByTestId(
			"transactionsListWrapper_content"
		);
		expect(transactionsListWrapper_content).toBeInTheDocument();
	});
});
