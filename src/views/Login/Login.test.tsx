import React from "react";
import { render, screen, within } from "@testing-library/react";
import { HeaderContextProvider } from "../../context/HeaderContext";
import { Login } from "./Login";

const renderComponent = () =>
	render(
		<HeaderContextProvider>
			<Login />
		</HeaderContextProvider>
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
				<HeaderContextProvider>
					<Login />
				</HeaderContextProvider>
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
		const loginWrapper__inputEmail = screen.getByTestId("loginWrapper__inputEmail");
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
		const loginWrapper__inputPassword = screen.getByTestId("loginWrapper__inputPassword");
		expect(loginWrapper__inputPassword).toBeInTheDocument();
	});

	test("should render login form login code label", () => {
		renderComponent();
		const loginWrapper__labelLoginCode = screen.getByTestId(
			"loginWrapper__labelLoginCode"
		);
		expect(loginWrapper__labelLoginCode).toBeInTheDocument();

		const { getByText } = within(loginWrapper__labelLoginCode);
		expect(getByText("Login Code")).toBeInTheDocument();
	});

    test("should render login form login code input", () => {
		renderComponent();
		const loginWrapper__inputLoginCode = screen.getByTestId("loginWrapper__inputLoginCode");
		expect(loginWrapper__inputLoginCode).toBeInTheDocument();
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

    test("should render login form don't have account text", () => {
		renderComponent();
		const loginWrapper__accountText = screen.getByTestId(
			"loginWrapper__accountText"
		);
		expect(loginWrapper__accountText).toBeInTheDocument();

		const { getByText } = within(loginWrapper__accountText);
		expect(getByText("Don't have an account?")).toBeInTheDocument();
	});

    test("should render login form register button", () => {
		renderComponent();
		const loginWrapper__registerBtn = screen.getByTestId("loginWrapper__registerBtn");
		expect(loginWrapper__registerBtn).toBeInTheDocument();
	});
});
