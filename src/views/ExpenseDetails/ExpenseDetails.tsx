import React, { useEffect, useState } from "react";
import "./ExpenseDetails.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { Button, Modal } from "react-bootstrap";
import { LuIndianRupee } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import placeholder from "../../assets/placeholder.jpg";
import { DateTime } from "luxon";
import { database } from "../../shared/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "../../components/Loader/Loader";
import { onDeleteImage } from "../../shared/constant";
import { SET_UPDATED_TRANSACTION_ID } from "../../components/FilterData/FilterSlice";
import { useDispatch } from "react-redux";
export const ExpenseDetails = () => {
	const { setTitle, setShowBackArrow } = useHeaderContext();
	const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [userDetailsData, setUserDetailsData] = useState<any>([]);
	const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
	const location = useLocation();
	const { id } = location.state;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const docRef = doc(database, "transactions", id);

	useEffect(() => {
		setTitle("Expense details");
		setShowBackArrow(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getUserDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		dispatch(SET_UPDATED_TRANSACTION_ID(""));
	}, [dispatch]);

	const getUserDetails = () => {
		setIsDataLoading(true);
		getDoc(docRef)
			.then((res) => {
				setUserDetailsData(res?.data()?.data);
				setIsDataLoading(false);
			})
			.catch((error) => {
				console.log("error fetching user details");
			});
	};
	const deleteTransaction = () => {
		//const desertRef = ref(storage, userDetailsData?.receipt);
		deleteDoc(docRef)
			.then(() => {
				//delete image from storage when deleting  transaction
				if (userDetailsData?.receipt !== "") {
					onDeleteImage(userDetailsData?.receipt)
						.then(() => {})
						.catch(() => {
							toast.error("Something went wrong deleting image!!", {
								autoClose: 4000,
							});
						});
				}
				setIsDeleting(true);
				setShowConfirmModal(false);
				toast.success("Transaction deleted successfully!", {
					autoClose: 4000,
				});
				setTimeout(() => {
					setIsDeleting(false);
					navigate("/transactionsList");
				}, 5000);
			})
			.catch((error) => {
				toast.error("Something went wrong!", {
					autoClose: 4000,
				});
				console.log(error);
			});
	};

	const editTransaction = () => {
		navigate("/editExpense/" + id, {
			state: { data: userDetailsData, id },
		});
	};

	return (
		<>
			{isDataLoading ? (
				<Loader />
			) : (
				<>
					<div className="expenseDetailsWrapper">
						<div className="expenseDetails__section">
							<div className="expenseDetails__grid w-50">
								<div className="expenseDetails__grid-header">Amount</div>
								<div className="expenseDetails__grid-description text-danger">
									<LuIndianRupee
										style={{ marginTop: "-5px", fontSize: "15px" }}
									/>{" "}
									{userDetailsData?.amount}
								</div>
							</div>
							<div className="expenseDetails__grid w-50">
								<div className="expenseDetails__grid-header">Category</div>
								<div className="expenseDetails__grid-description">
									{userDetailsData?.category}
								</div>
							</div>
						</div>
						<div className="expenseDetails__section">
							<div className="expenseDetails__grid w-100">
								<div className="expenseDetails__grid-header">Person name</div>
								<div className="expenseDetails__grid-description">
									{userDetailsData?.personName}
								</div>
							</div>
						</div>
						<div className="expenseDetails__section">
							<div className="expenseDetails__grid w-100">
								<div className="expenseDetails__grid-header">
									Transaction date
								</div>
								<div className="expenseDetails__grid-description">
									{DateTime.fromISO(userDetailsData?.transactionDate).toFormat(
										"dd MMM yyyy"
									)}
								</div>
							</div>
						</div>
						<div className="expenseDetails__section">
							<div className="expenseDetails__grid w-100">
								<div className="expenseDetails__grid-header">Description</div>
								<div className="expenseDetails__grid-description">
									{userDetailsData?.description
										? userDetailsData?.description
										: "-"}
								</div>
							</div>
						</div>
						<div className="expenseDetails__section">
							<div className="expenseDetails__grid w-100">
								<div className="expenseDetails__grid-header">Receipt</div>
								<div className="expenseDetails__grid-description w-50">
									<img
										src={
											userDetailsData?.receipt ||
											userDetailsData?.receipt !== ""
												? userDetailsData?.receipt
												: placeholder
										}
										alt="receiptimage"
										className="img-fluid mt-2"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="expenseDetailsDelete d-flex gap-3">
						<Button
							variant="danger"
							className="w-100 btn-sm buttonHeight"
							onClick={() => setShowConfirmModal(true)}
							disabled={isDeleting}
						>
							Delete
						</Button>
						<Button
							variant="primary"
							className="w-100 btn-sm buttonHeight"
							onClick={editTransaction}
							disabled={isDeleting}
						>
							Edit
						</Button>
					</div>
				</>
			)}
			<ToastContainer position="bottom-center" autoClose={false} />

			<Modal
				show={showConfirmModal}
				onHide={() => setShowConfirmModal(false)}
				backdrop="static"
				keyboard={false}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete transaction</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to delete this transaction? This action is
					irreversible.
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => setShowConfirmModal(false)}
					>
						Close
					</Button>
					<Button variant="danger" onClick={deleteTransaction}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
