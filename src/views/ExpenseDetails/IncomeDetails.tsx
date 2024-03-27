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
import { convertNumberToWords, onDeleteImage } from "../../shared/constant";
import { SET_UPDATED_TRANSACTION_ID } from "../../components/FilterData/FilterSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../Login/LoginSlice";
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/Invoice/Invoice";
import { FiDownload, FiEye } from "react-icons/fi";

export const IncomeDetails = () => {
	const { setTitle, setShowBackArrow } = useHeaderContext();
	const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [incomeDetails, setIncomeDetails] = useState<any>([]);
	const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
	const location = useLocation();
	const { id } = location.state;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { role } = useSelector(selectUserData);

	const docRef = doc(database, "income", id);

	useEffect(() => {
		setTitle("Income details");
		setShowBackArrow(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getUserDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		dispatch(
			SET_UPDATED_TRANSACTION_ID({
				updatedTransactionId: "",
				transactionType: "",
			})
		);
	}, [dispatch]);

	const getUserDetails = () => {
		setIsDataLoading(true);
		getDoc(docRef)
			.then((res) => {
				setIncomeDetails(res?.data());
				setIsDataLoading(false);
			})
			.catch((error) => {
				console.log("error fetching user details");
			});
	};

	const deleteTransaction = () => {
		deleteDoc(docRef)
			.then(() => {
				//delete image from storage when deleting  transaction
				if (incomeDetails?.receipt !== "") {
					onDeleteImage(incomeDetails?.receipt)
						.then(() => {})
						.catch(() => {
							toast.error("Something went wrong deleting image!!", {
								autoClose: 4000,
							});
						});
				}
				setIsDeleting(true);
				setShowConfirmModal(false);
				toast.success("Income deleted successfully!", {
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
		navigate("/editIncome/" + id, {
			state: { data: incomeDetails, id },
		});
	};

    //get current year from transaction date
	function getFinancialYear() {
		return DateTime.fromISO(incomeDetails?.transactionDate).toFormat("yyyy/MM");
	}

    //create random 4 digit for receipt no
	function getRandomDigit() {
		return Math.floor(1000 + Math.random() * 9000);
	}

    //send props to generate invoice
	const reciept_data = {
		invoice_no: getFinancialYear() + "/" + getRandomDigit(),
		transactionDate: DateTime.fromISO(incomeDetails?.transactionDate).toFormat(
			"dd/MM/yyyy"
		),
		receivedFrom: incomeDetails?.receivedFrom,
		amountInWords: convertNumberToWords(incomeDetails?.amount as any),
		towards: incomeDetails?.incomeCategory,
		paymentMode: incomeDetails?.paymentMode,
		bankName: incomeDetails?.bankName ? incomeDetails?.bankName : "-",
		amount: incomeDetails?.amount,
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
								<div className="expenseDetails__grid-description text-success fw-bold">
									<LuIndianRupee style={{ fontSize: "13px" }} />{" "}
									{incomeDetails?.amount}
								</div>
							</div>
							<div className="expenseDetails__grid w-50">
								<div className="expenseDetails__grid-header">Category</div>
								<div className="expenseDetails__grid-description">
									{incomeDetails?.incomeCategory}
								</div>
							</div>
						</div>
						<div className="expenseDetails__section">
							<div className="expenseDetails__grid">
								<div className="expenseDetails__grid-header">Payment Mode</div>
								<div className="expenseDetails__grid-description">
									{incomeDetails?.paymentMode}
								</div>
							</div>
						</div>
						<div className="expenseDetails__section">
							<div className="expenseDetails__grid">
								<div className="expenseDetails__grid-header">Bank Name</div>
								<div className="expenseDetails__grid-description">
									{incomeDetails?.bankName ? incomeDetails?.bankName : "-"}
								</div>
							</div>
						</div>
						<div className="expenseDetails__section">
							<div className="expenseDetails__grid w-100">
								<div className="expenseDetails__grid-header">Received from</div>
								<div className="expenseDetails__grid-description">
									{incomeDetails?.receivedFrom}
								</div>
							</div>
						</div>
						<div className="expenseDetails__section">
							<div className="expenseDetails__grid w-100">
								<div className="expenseDetails__grid-header">
									Person name (Income added)
								</div>
								<div className="expenseDetails__grid-description">
									{incomeDetails?.personName}
								</div>
							</div>
						</div>
						<div className="expenseDetails__section">
							<div className="expenseDetails__grid w-100">
								<div className="expenseDetails__grid-header">
									Transaction date
								</div>
								<div className="expenseDetails__grid-description">
									{DateTime.fromISO(incomeDetails?.transactionDate).toFormat(
										"dd MMM yyyy"
									)}
								</div>
							</div>
						</div>
						<div className="expenseDetails__section">
							<div className="expenseDetails__grid w-100">
								<div className="expenseDetails__grid-header">Description</div>
								<div className="expenseDetails__grid-description">
									{incomeDetails?.description
										? incomeDetails?.description
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
											incomeDetails?.receipt || incomeDetails?.receipt !== ""
												? incomeDetails?.receipt
												: placeholder
										}
										alt="receiptimage"
										className="img-fluid mt-2"
									/>
								</div>
							</div>
						</div>
						<div className="divider__common"></div>
						<div className="expenseDetails__section mt-4">
							<div className="expenseDetails__invoice">
								<div className="expenseDetails__invoice--title">Invoice</div>
								<div className="expenseDetails__invoice--button">
									<PDFDownloadLink
										document={<Invoice data={reciept_data} />}
										fileName={
											incomeDetails?.receivedFrom.replaceAll(" ", "_") + ".pdf"
										}
									>
										<Button variant="secondary" className="btn-sm">
											<FiDownload />
										</Button>
									</PDFDownloadLink>
									<BlobProvider document={<Invoice data={reciept_data} />}>
										{({ url, blob }) => (
											<a href={url as string} target="_blank" rel="noreferrer">
												<Button variant="dark" className="btn-sm ml-3">
													<FiEye />
												</Button>
											</a>
										)}
									</BlobProvider>
								</div>
							</div>
						</div>
					</div>
					{role === "admin" && (
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
					)}
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
