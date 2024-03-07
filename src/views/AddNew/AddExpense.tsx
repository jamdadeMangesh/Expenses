import React from "react";
import "./AddExpense.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

export const AddExpense = () => {
	const navigate = useNavigate();
	const { setTitle, setShowBackArrow } = useHeaderContext();
	React.useEffect(() => {
		setTitle("Add new transaction");
		setShowBackArrow(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm();

	const onSubmit = (data: any) => {
		data["currentDate"] = new Date();
		data["personName"] = "Mangesh";
		console.log(data);
		if (data) {
			reset();
			navigate("/dashboard");
		}
	};
	const onClearAddExpense = () => {
		reset();
	};
	return (
		<>
			<div className="addExpenseWrapper">
				<form onSubmit={handleSubmit(onSubmit)} className="appWrapper__form">
					<Form.Group className="mb-3" controlId="amount">
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
									value: /^\d{0,10}(\.\d{0,2})?$/,
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
					<Form.Group className="mb-3" controlId="category">
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
							<option value="Snacks">Snacks</option>
							<option value="Travel">Travel</option>
							<option value="Materials">Materials</option>
						</Form.Select>

						{errors.category && (
							<p className="loginWrapper__errorMsg">
								{errors?.category?.message?.toString()}
							</p>
						)}
					</Form.Group>
					<Form.Group className="mb-3" controlId="password">
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
								// pattern: {
								// 	value:
								// 		/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
								// 	message:
								// 		"Password must have atleast a symbol, upper & lower case letter and number",
								// },
								// minLength: {
								// 	value: 8,
								// 	message: "Password must have at least 8 characters",
								// },
							})}
						/>
						{errors.transactionDate && (
							<p className="loginWrapper__errorMsg">
								{errors?.transactionDate?.message?.toString()}
							</p>
						)}
					</Form.Group>
					<Form.Group className="mb-3" controlId="Description">
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
					<Form.Group className="mb-3" controlId="password">
						<Form.Label>Receipt</Form.Label>
						<Form.Control
							type="file"
							placeholder="Enter transaction date"
							{...register("receipt")}
						/>
						{errors.receipt && (
							<p className="loginWrapper__errorMsg">
								{errors?.receipt?.message?.toString()}
							</p>
						)}
					</Form.Group>

					<div className="divider__common"></div>
					<div className="loginWrapper__submit-grid">
						<Button
							variant="outline-danger"
							type="button"
							className="w-100 buttonHeight"
							onClick={() => onClearAddExpense()}
						>
							Clear
						</Button>
						<Button
							variant="primary"
							type="submit"
							className="w-100 buttonHeight"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Sending data..." : "Submit"}
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};
