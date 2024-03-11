import React from 'react'
import { Alert } from 'react-bootstrap'
import "./Alerts.scss";

type alertTypes = {
    errors: string;
    show: boolean;
    setShow: () => void;
    isSuccess: boolean;
}
export const Alerts = ({errors, show, setShow, isSuccess} : alertTypes) => {
    return (
        <Alert className="errorAlert" show={show} variant={isSuccess ? "success" : "danger"} onClick={setShow} dismissible>
            <span className="errorAlert__text">{errors}</span>
        </Alert>
    )
}
