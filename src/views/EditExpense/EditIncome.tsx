import React, { useEffect, useRef, useState } from "react";
import "../AddNew/AddExpense.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";
import { LuImagePlus } from "react-icons/lu";
import { database, storage } from "../../shared/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../Login/LoginSlice";
import { DateTime } from "luxon";
import { FiTrash2 } from "react-icons/fi";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import { incomeCategory, onDeleteImage } from "../../shared/constant";
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
	const [percent, setPercent] = useState(0);
	const [imageLoading, setImageLoading] = useState(false);
	const dispatch = useDispatch();
	const hiddenFileInput: any = useRef(null); // ADDED

	const location = useLocation();
	const { data, id } = location.state;

	//check if transaction receipt is uploaded
	const isReceiptUploaded = data?.receipt.length > 0 && data?.receipt !== "";

	//variable for old image url delete
	const oldReceiptUrl = data?.receipt;

	const handleClick = () => {
		hiddenFileInput && hiddenFileInput?.current?.click(); // ADDED
	};

	// useEffect(() => {
	// 	onAuthStateChanged(authentication, (user) => {
	// 		if (user) {
	// 			navigate("/addIncome");
	// 		} else {
	// 			navigate("/login");
	// 		}
	// 	});
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

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
	const handleUpload = () => {
		if (file) {
			const storageRef = ref(
				storage,
				`/files/${
					name.replace(/ /g, "_") + "_" + DateTime.now().toUnixInteger()
				}`
			);

			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const percent = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setImageLoading(true);
					// update progress
					setPercent(percent);
				},
				(err) => console.log(err),
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((url) => {
						setImageUrl(url);
					});
				}
			);
		}
	};

	const onDeleteReceipt = (url: string) => {
		if (url) {
			//const desertRef = ref(storage, imageUrl);

			//deleteObject(desertRef)
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
		data["receipt"] = imageUrl ? imageUrl : "";
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
					if (isReceiptUploaded) {
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
						//navigate("/transactionsList");
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
									placeholder="Enter transaction date"
									{...register("receipt")}
									className="mr-2 d-none"
									onChange={onChangeFileUpload}
									ref={hiddenFileInput}
									accept="image/*"
									disabled={imageLoading}
								/>
								<div className="customImageUploader">
									<div
										className="customImageUploader__text"
										onClick={handleClick}
									>
										{file ? file?.name : "Upload image"}
									</div>
									<div
										className="customImageUploader__delete"
										onClick={() => onDeleteReceipt(imageUrl)}
									>
										{imageUrl && <FiTrash2 style={{ color: "#d82c0d" }} />}
									</div>
								</div>
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
								<div className="pt-1">{imageLoading && percent + "%"}</div>
							</div>
							{errors.receipt && (
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
