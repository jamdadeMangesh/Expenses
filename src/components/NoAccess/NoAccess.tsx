import React from 'react'
import { Modal } from 'react-bootstrap';
import noAccess from "../../assets/noAccess.jpg";

type noAccessType = {
    showNoAccess: boolean;
}
export const NoAccess = ({ showNoAccess }: noAccessType) => {
    return (
        <>
            <Modal
                show={!showNoAccess}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Body>
                    <div className="noConnection">
                        <div className="noConnection__img">
                            <img src={noAccess} alt="No access" />
                        </div>
                        <div className="noConnection__text">
                            You don't have permission to access this app. Please contact administrator.
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
