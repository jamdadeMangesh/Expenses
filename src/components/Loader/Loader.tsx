import React from "react";
import { Spinner } from "react-bootstrap";
import "./Loader.scss";

export const Loader = () => {
	return (
		<div className="spinner__wrapper">
			<Spinner animation="border" variant="secondary" role="status"></Spinner>
			<span>Loading...</span>
		</div>
	)
};
