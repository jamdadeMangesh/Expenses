import React, { useEffect, useState } from "react";
import "../AddNew/AddExpense.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";
import { LuImagePlus } from "react-icons/lu";
import { database } from "../../shared/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../Login/LoginSlice";
import { DateTime } from "luxon";
import { FiTrash2 } from "react-icons/fi";

import { ToastContainer, toast } from "react-toastify";
import { incomeCategory, onDeleteImage, uploadImageToStorage } from "../../shared/constant";
import {
	SET_TYPE,
	SET_UPDATED_TRANSACTION_ID,
} from "../../components/FilterData/FilterSlice";

export const EditIncome = () => {
	const { name } = useSelector(selectUserData);
	const navigate = useNavigate();
	const { setTitle, setShowBackArrow, setShowAddNewButton } =
		useHeaderContext();
	const [file, setFile] = useState<any>("");
	const [imageUrl, setImageUrl] = useState("");
	const [imageLoading, setImageLoading] = useState(false);
	const dispatch = useDispatch();
	
	const location = useLocation();
	const { data, id } = location.state;

	//check if transaction receipt is uploaded
	const isReceiptUploaded = data?.receipt.length > 0 && data?.receipt !== "";

	//variable for old image url delete
	const oldReceiptUrl = data?.receipt;

	useEffect(() => {
		setTitle(data?.incomeCategory);
		setShowBackArrow(true);
		setShowAddNewButton(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		watch,
		setValue,
	} = useForm();

	useEffect(() => {
		setValue("amount", data?.amount);
		setValue("bankName", data?.bankName);
		setValue("description", data?.description);
		setValue("incomeCategory", data?.incomeCategory);
		setValue("paymentMode", data?.paymentMode);
		setValue("receivedFrom", data?.receivedFrom);
		setValue("transactionDate", data?.transactionDate);
	}, [data, setValue]);

	const paymentModeValue = watch("paymentMode");

	const onClearAddExpense = () => {
		reset();
	};

	const onChangeFileUpload = (event: any) => {
		setFile(event?.target.files[0]);
	};
	const handleUpload = async() => {
		setImageLoading(true);
		await uploadImageToStorage(file, name)
			.then((res: any) => {
				setImageUrl(res);
			})
			.catch((error) => {
				console.log("error while uploading image:", error);
			});
	};

	const onDeleteReceipt = (url: string) => {
		if (url) {
			onDeleteImage(url)
				.then(() => {
					setFile("");
					setImageUrl("");
					setImageLoading(false);
				})
				.catch((error) => {
					console.log("delete Error:", error);
				});
		}
	};

	const onSubmit = async (data: any) => {
		data["createdAt"] = DateTime.now().toISO();
		data["personName"] = name;
		data["receipt"] = imageUrl ? imageUrl : oldReceiptUrl;
		data["amount"] = data?.amount as number;

		const taskDocRef = doc(database, "income", id);
		if (data) {
			updateDoc(taskDocRef, {
				amount: data?.amount,
				receivedFrom: data?.receivedFrom,
				transactionDate: data?.transactionDate,
				incomeCategory: data?.incomeCategory,
				paymentMode: data?.paymentMode,
				bankName: data?.bankName,
				description: data?.description,
				receipt: data?.receipt,
				createdAt: data?.createdAt,
				personName: data?.personName,
			})
				.then(() => {
                    // If image is already uploded and user wants to replace it wih new image then check for this condition
					if (isReceiptUploaded && imageUrl !== "") {
						onDeleteImage(oldReceiptUrl)
							.then(() => {})
							.catch((error) => {
								console.log("delete Error:", error);
							});
					}
					setImageLoading(false);
					toast.success("Income updated successfully!", {
						autoClose: 4000,
					});
					setTimeout(() => {
						dispatch(
							SET_UPDATED_TRANSACTION_ID({
								updatedTransactionId: id,
								transactionType: "Income",
							})
						);
						dispatch(SET_TYPE(true));
						navigate("/transactionsList/");
					}, 5000);
				})
				.catch((error: any) => {
					if (error) {
						toast.error("Income has not been updated successfully!", {
							autoClose: 4000,
						});
					}
				});
		}
	};

	const isValid = paymentModeValue === "" || paymentModeValue === "Cash";

	return (
		<>
			<div className="addExpenseWrapper">
				<form onSubmit={handleSubmit(onSubmit)} className="loginWrapper__form">
					<div className="loginWrapper__form-content">
						<Form.Group className="loginWrapper__form-group" controlId="amount">
							<Form.Label>
								Amount{" "}
								<sup>
									<span>
										<CgAsterisk style={{ color: "#D82C0D" }} />
									</span>
								</sup>
							</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter amount"
								{...register("amount", {
									required: "Please enter amount",
									pattern: {
										value: /^(0|[1-9]\d*)(\.\d+)?$/,
										message: "Please enter a valid amount",
									},
								})}
								autoComplete="off"
							/>
							{errors.amount && (
								<p className="loginWrapper__errorMsg">
									{errors?.amount?.message?.toString()}
								</p>
							)}
						</Form.Group>
						<Form.Group
							className="loginWrapper__form-group"
							controlId="receivedFrom"
						>
							<Form.Label>
								Received from{" "}
								<sup>
									<span>
										<CgAsterisk style={{ color: "#D82C0D" }} />
									</span>
								</sup>
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter name"
								{...register("receivedFrom", {
									required: "Please enter full name",
									pattern: {
										value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/,
										message: "Please enter a valid name",
									},
								})}
								autoComplete="off"
							/>
							{errors.receivedFrom && (
								<p className="loginWrapper__errorMsg">
									{errors?.receivedFrom?.message?.toString()}
								</p>
							)}
						</Form.Group>
						<Form.Group
							className="loginWrapper__form-group"
							controlId="transactionDate"
						>
							<Form.Label>
								Transaction date
								<sup>
									<span>
										<CgAsterisk style={{ color: "#D82C0D" }} />
									</span>
								</sup>
							</Form.Label>
							<Form.Control
								type="date"
								placeholder="Enter transaction date"
								max={new Date().toISOString().slice(0, 10)}
								{...register("transactionDate", {
									required: "Please enter transaction date",
								})}
							/>
							{errors.transactionDate && (
								<p className="loginWrapper__errorMsg">
									{errors?.transactionDate?.message?.toString()}
								</p>
							)}
						</Form.Group>
						<Form.Group
							className="loginWrapper__form-group"
							controlId="incomeCategory"
						>
							<Form.Label>
								Income Category{" "}
								<sup>
									<span>
										<CgAsterisk style={{ color: "#D82C0D" }} />
									</span>
								</sup>
							</Form.Label>
							<Form.Select
								{...register("incomeCategory", {
									required: "Please enter income category",
								})}
								autoComplete="off"
							>
								<option value="">Select income category</option>
								{incomeCategory.map((category: string) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</Form.Select>

							{errors.incomeCategory && (
								<p className="loginWrapper__errorMsg">
									{errors?.incomeCategory?.message?.toString()}
								</p>
							)}
						</Form.Group>
						<Form.Group
							className="loginWrapper__form-group"
							controlId="paymentMode"
						>
							<Form.Label>
								Payment Mode{" "}
								<sup>
									<span>
										<CgAsterisk style={{ color: "#D82C0D" }} />
									</span>
								</sup>
							</Form.Label>
							<Form.Select
								{...register("paymentMode", {
									required: "Please enter payment mode",
								})}
								autoComplete="off"
							>
								<option value="">Select payment mode</option>
								<option value="Cash">Cash</option>
								<option value="Cheque">Cheque</option>
								<option value="DD">DD</option>
								<option value="Online">Online</option>
							</Form.Select>

							{errors.paymentMode && (
								<p className="loginWrapper__errorMsg">
									{errors?.paymentMode?.message?.toString()}
								</p>
							)}
						</Form.Group>
						<Form.Group
							className="loginWrapper__form-group"
							controlId="bankName"
						>
							<Form.Label>
								Bank Name{" "}
								<sup>
									<span>
										<CgAsterisk style={{ color: "#D82C0D" }} />
									</span>
								</sup>
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter bank name"
								disabled={
									paymentModeValue === "" || paymentModeValue === "Cash"
								}
								{...register("bankName", {
									required: {
										value: !isValid,
										message: "Please enter bank name",
									},
									pattern: {
										value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/,
										message: "Please enter a valid bank name",
									},
								})}
								autoComplete="off"
							/>
							{errors.bankName && (
								<p className="loginWrapper__errorMsg">
									{errors?.bankName?.message?.toString()}
								</p>
							)}
						</Form.Group>

						<Form.Group
							className="loginWrapper__form-group"
							controlId="Description"
						>
							<Form.Label>Description </Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Enter description"
								{...register("description")}
								autoComplete="off"
							/>
							{errors.description && (
								<p className="loginWrapper__errorMsg">
									{errors?.description?.message?.toString()}
								</p>
							)}
						</Form.Group>
						<Form.Group
							className="loginWrapper__form-group mb-4"
							controlId="password"
						>
							<Form.Label>Receipt</Form.Label>
							<div className="d-flex  gap-3">
								<Form.Control
									type="file"
									{...register("receipt", {
										validate: {
											required: (value) => {
												if (imageUrl === "" && !isReceiptUploaded)
													return "Please upload income receipt!!";
											},
										},
										required: {
											value: isReceiptUploaded ? false : true,
											message: "Please upload income receipt!",
										},
									})}
									className="mr-2"
									onChange={onChangeFileUpload}
									accept="image/*"
									disabled={imageLoading}
								/>
								<Button
									variant="primary"
									className="buttonHeight ml-3 px-3"
									disabled={!file || imageLoading}
									onClick={handleUpload}
								>
									<LuImagePlus />
								</Button>
							</div>
							<div className="d-flex justify-content-between  gap-3">
								<Form.Text muted>Upload only jpeg, png format images</Form.Text>
								<div className="pt-1">
									{imageUrl !== "" && (
										<>
											<div
												className="customImageUploader__delete"
												onClick={() => onDeleteReceipt(imageUrl)}
											>
												{imageUrl && <FiTrash2 style={{ color: "#d82c0d" }} />}
											</div>
										</>
									)}
								</div>
							</div>
							{errors.receipt && imageUrl === "" && (
								<p className="loginWrapper__errorMsg">
									{errors?.receipt?.message?.toString()}
								</p>
							)}
						</Form.Group>
						{isReceiptUploaded && (
							<>
								<div className="loginWrapper__form-group mb-4">
									<div className="receiptUploaded">
										<img src={data?.receipt} alt="receipt" />
									</div>
								</div>
							</>
						)}
					</div>

					<div className="loginWrapper__submit">
						<Button
							variant="outline-danger"
							type="button"
							className="w-100 buttonHeight"
							onClick={() => onClearAddExpense()}
							size="sm"
						>
							Clear
						</Button>
						<Button
							variant="primary"
							type="submit"
							className="w-100 buttonHeight"
							disabled={isSubmitting}
							size="sm"
						>
							{isSubmitting ? "Sending data..." : "Submit"}
						</Button>
					</div>
				</form>
			</div>
			<ToastContainer position="bottom-center" autoClose={false} />
		</>
	);
};
