import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";

test("renders learn react link", () => {
	expect(() =>
		render(
			<Provider store={store}>
				<App />
			</Provider>
		)
	).not.toThrow();
});
