import React from "react";
import { render, screen, within } from "@testing-library/react";
import { HeaderContextProvider } from "../../context/HeaderContext";
import { Login } from "./Login";
import { Provider } from "react-redux";
import { store } from "../../store/store";

const renderComponent = () =>
	render(
		<Provider store={store}>
			<HeaderContextProvider>
				<Login />
			</HeaderContextProvider>
		</Provider>
	);

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockUsedNavigate,
}));

describe("Should render Login component without crashing", () => {
	test("renders home component", () => {
		expect(() =>
			render(
				<Provider store={store}>
					<HeaderContextProvider>
						<Login />
					</HeaderContextProvider>
				</Provider>
			)
		).not.toThrow();
	});

	test("should render login wrapper", () => {
		renderComponent();
		const loginWrapper = screen.getByTestId("loginWrapper");
		expect(loginWrapper).toBeInTheDocument();
	});

	test("should render login form email label", () => {
		renderComponent();
		const loginWrapper__labelEmail = screen.getByTestId(
			"loginWrapper__labelEmail"
		);
		expect(loginWrapper__labelEmail).toBeInTheDocument();

		const { getByText } = within(loginWrapper__labelEmail);
		expect(getByText("Email")).toBeInTheDocument();
	});

	test("should render login form email input", () => {
		renderComponent();
		const loginWrapper__inputEmail = screen.getByTestId(
			"loginWrapper__inputEmail"
		);
		expect(loginWrapper__inputEmail).toBeInTheDocument();
	});

	test("should render login form password label", () => {
		renderComponent();
		const loginWrapper__labelPassword = screen.getByTestId(
			"loginWrapper__labelPassword"
		);
		expect(loginWrapper__labelPassword).toBeInTheDocument();

		const { getByText } = within(loginWrapper__labelPassword);
		expect(getByText("Password")).toBeInTheDocument();
	});

	test("should render login form password input", () => {
		renderComponent();
		const loginWrapper__inputPassword = screen.getByTestId(
			"loginWrapper__inputPassword"
		);
		expect(loginWrapper__inputPassword).toBeInTheDocument();
	});

	test("should render login form forgot password text", () => {
		renderComponent();
		const loginWrapper__forgotPassword = screen.getByTestId(
			"loginWrapper__forgotPassword"
		);
		expect(loginWrapper__forgotPassword).toBeInTheDocument();

		const { getByText } = within(loginWrapper__forgotPassword);
		expect(getByText("Forgot password?")).toBeInTheDocument();
	});

	test("should render login form submit button", () => {
		renderComponent();
		const loginWrapper__loginBtn = screen.getByTestId("loginWrapper__loginBtn");
		expect(loginWrapper__loginBtn).toBeInTheDocument();
	});
});
