import React, { useEffect, useRef, useState } from "react";
import "./AddExpense.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { LuImagePlus } from "react-icons/lu";
import { authentication, database, storage } from "../../shared/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUserData } from "../Login/LoginSlice";
import { DateTime } from "luxon";
import { FiTrash2 } from "react-icons/fi";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { categories, onDeleteImage } from "../../shared/constant";

export const AddExpense = () => {
	const { name } = useSelector(selectUserData);
	const navigate = useNavigate();
	const { setTitle, setShowBackArrow, setShowAddNewButton } =
		useHeaderContext();
	const [file, setFile] = useState<any>("");
	const [imageUrl, setImageUrl] = useState("");
	const [percent, setPercent] = useState(0);
	const [imageLoading, setImageLoading] = useState(false);

	const hiddenFileInput: any = useRef(null); // ADDED

	const handleClick = () => {
		hiddenFileInput && hiddenFileInput?.current?.click(); // ADDED
	};

	useEffect(() => {
		onAuthStateChanged(authentication, (user) => {
			if (user) {
				navigate("/addExpense");
			} else {
				navigate("/login");
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setTitle("Add new expense");
		setShowBackArrow(true);
		setShowAddNewButton(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm();

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
		console.log("data:", data);
		if (data) {
			await addDoc(collection(database, "transactions"), {
				amount: data?.amount,
				category: data?.category,
				transactionDate: data?.transactionDate,
				description: data?.description,
				receipt: data?.receipt,
				createdAt: data?.createdAt,
				personName: data?.personName,
			})
				.then((res) => {
					reset();
					setFile("");
					setImageLoading(false);
					toast.success("New transaction created successfully!", {
						autoClose: 4000,
					});
					setTimeout(() => {
						navigate("/transactionsList");
					}, 5000);
				})
				.catch((error: any) => {
					console.error("Error adding document: ", error);
				});
		}
	};

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
							controlId="category"
						>
							<Form.Label>
								Category{" "}
								<sup>
									<span>
										<CgAsterisk style={{ color: "#D82C0D" }} />
									</span>
								</sup>
							</Form.Label>
							<Form.Select
								{...register("category", {
									required: "Please enter category",
								})}
								autoComplete="off"
							>
								<option value="">Select category</option>
								{categories.map((category: string) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</Form.Select>

							{errors.category && (
								<p className="loginWrapper__errorMsg">
									{errors?.category?.message?.toString()}
								</p>
							)}
						</Form.Group>
						<Form.Group
							className="loginWrapper__form-group"
							controlId="password"
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
