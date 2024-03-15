import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout } from "../../shared/firebase";
type LogoutModal = {
    showModal: boolean;
    hideModal: () => void;
}
export const Logout = ({showModal, hideModal}: LogoutModal) => {
    const navigate = useNavigate();
    const onLogout = () => {    
        logout();
		navigate("/login");
	};
	return (
		<>
			<Modal
				show={showModal}
				onHide={hideModal}
				backdrop="static"
				keyboard={false}
                centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Logout</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to logout?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={hideModal}>
						Close
					</Button>
					<Button variant="danger" onClick={onLogout}>Logout</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
