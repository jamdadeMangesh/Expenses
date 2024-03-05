import React from "react";
import { render, screen } from "@testing-library/react";
import { Home } from "./Home";
import { HeaderContextProvider } from "../../context/HeaderContext";

const renderComponent = () =>
	render(
		<HeaderContextProvider>
			<Home />
		</HeaderContextProvider>
	);

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockUsedNavigate,
}));

describe("Should render Home component without crashing", () => {
	test("renders home component", () => {
		expect(() => render(<Home />)).not.toThrow();
	});

	test("should render home wrapper", () => {
		renderComponent();
		const homeWrapper = screen.getByTestId("homeWrapper");
		expect(homeWrapper).toBeInTheDocument();
	});
	test("should render home wrapper logo", () => {
		renderComponent();
		const homeWrapper__logo = screen.getByTestId("homeWrapper__logo");
		expect(homeWrapper__logo).toBeInTheDocument();
	});
	test("should render super admin button", () => {
		renderComponent();
		const homeWrapper__superAdminBtn = screen.getByTestId(
			"homeWrapper__superAdminBtn"
		);
		expect(homeWrapper__superAdminBtn).toBeInTheDocument();
	});
	test("should render user button", () => {
		renderComponent();
		const homeWrapper__userBtn = screen.getByTestId("homeWrapper__userBtn");
		expect(homeWrapper__userBtn).toBeInTheDocument();
	});
});
