import React from "react";
import { render, screen, within } from "@testing-library/react";
import { HeaderContextProvider } from "../../context/HeaderContext";
import { TransactionsList } from "./TransactionsList";

const renderComponent = () =>
	render(
		<HeaderContextProvider>
			<TransactionsList />
		</HeaderContextProvider>
	);

describe("Should render Transaction list component without crashing", () => {
	test("renders Transaction list component", () => {
		expect(() =>
			render(
				<HeaderContextProvider>
					<TransactionsList />
				</HeaderContextProvider>
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
		const transactionsListWrapper_appliedFilter = screen.getByTestId(
			"transactionsListWrapper_appliedFilter"
		);
		expect(transactionsListWrapper_appliedFilter).toBeInTheDocument();
	});

	test("should render Transaction list download", () => {
		renderComponent();
		const transactionsListWrapper__download = screen.getByTestId(
			"transactionsListWrapper__download"
		);
		expect(transactionsListWrapper__download).toBeInTheDocument();
	});

	test("should render Transaction list content wrapper", () => {
		renderComponent();
		const transactionsListWrapper_content = screen.getByTestId(
			"transactionsListWrapper_content"
		);
		expect(transactionsListWrapper_content).toBeInTheDocument();
	});
});
