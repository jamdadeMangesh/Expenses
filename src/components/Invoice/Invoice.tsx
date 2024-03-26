import React, { Fragment } from "react";
import {
	Image,
	Text,
	View,
	Page,
	Document,
	StyleSheet,
} from "@react-pdf/renderer";
import logo from "../../assets/logo.png";

type InvoiceType = {
	data?: any;
};

const Invoice = ({ data }: InvoiceType) => {
	const styles = StyleSheet.create({
		page: {
			fontSize: 11,
			paddingTop: 20,
			paddingLeft: 40,
			paddingRight: 40,
			lineHeight: 1.5,
			flexDirection: "column",
		},

		spaceBetween: {
			flex: 1,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			color: "#3E3E3E",
		},

		titleContainer: { flexDirection: "row", marginTop: 24 },

		logo: { width: 90 },

		reportTitle: { fontSize: 20, textAlign: "center" },

		regdNo: { fontSize: 8, textAlign: "center" },

		addressTitle: { fontSize: 11, fontStyle: "bold" },

		invoice: { fontWeight: "bold", fontSize: 20 },

		invoiceNumber: { fontSize: 11, fontWeight: "bold" },

		address: { fontWeight: 400, fontSize: 10 },

		fieldTitle: { fontSize: 11, fontWeight: "bold", color: "#97999b" },

		fieldDescription: { fontSize: 12, fontWeight: "bold" },

		divider: {
			borderTop: "1px solid #000",
			borderColor: "whitesmoke",
			width: "100%",
		},

		displayFlex: { display: "flex", flexDirection: "row" },
		width30: { width: "30%" },
		width70: { width: "70%" },
	});

	const ReceiptTitle = () => (
		<View style={styles.titleContainer}>
			<View style={styles.spaceBetween}>
				<Image style={styles.logo} src={logo} />
				<View style={{ justifyContent: "center", alignItems: "center" }}>
					<Text style={styles.reportTitle}>Vajra Pratishthan</Text>
					<Text style={styles.regdNo}>Regd.No: MAHA/993/2018/PUNE</Text>
				</View>
				<View>
					<Text style={styles.addressTitle}>Sr.no 17/3/1, Flat no. 4,</Text>
					<Text style={styles.addressTitle}>Shree vastu building,</Text>
					<Text style={styles.addressTitle}>Sukhsagar Nagar no. 2</Text>
					<Text style={styles.addressTitle}>Near Krishna Collection, </Text>
					<Text style={styles.addressTitle}>Pune-411046</Text>
				</View>
			</View>
		</View>
	);

	const ReceiptDate = () => (
		<View style={styles.titleContainer}>
			<View style={styles.spaceBetween}>
				<View>
					<Text style={styles.invoice}>Receipt </Text>
					<Text style={styles.invoiceNumber}>
						Receipt no: {data.invoice_no}{" "}
					</Text>
				</View>
				<View>
					<Text style={styles.addressTitle}>Date: {data?.transactionDate}</Text>
				</View>
			</View>
		</View>
	);


	const ReceiptContent = () => (
		<>
			<View style={styles.titleContainer}>
				<View style={styles.displayFlex}>
					<View style={styles.width30}>
						<Text style={styles.fieldTitle}>Received from</Text>
					</View>
					<View style={styles.width70}>
						<Text style={styles.fieldDescription}>{data?.receivedFrom}</Text>
					</View>
				</View>
			</View>

			<View style={styles.titleContainer}>
				<View style={styles.displayFlex}>
					<View style={styles.width30}>
						<Text style={styles.fieldTitle}>The sum of Rs.</Text>
					</View>
					<View style={styles.width70}>
						<Text style={styles.fieldDescription}>{data?.amountInWords}</Text>
					</View>
				</View>
			</View>

			<View style={styles.titleContainer}>
				<View style={styles.displayFlex}>
					<View style={styles.width30}>
						<Text style={styles.fieldTitle}>Towards</Text>
					</View>
					<View style={styles.width70}>
						<Text style={styles.fieldDescription}>{data?.towards}</Text>
					</View>
				</View>
			</View>

			<View style={styles.titleContainer}>
				<View style={styles.displayFlex}>
					<View style={styles.width30}>
						<Text style={styles.fieldTitle}>Payment mode</Text>
					</View>
					<View style={styles.width70}>
						<Text style={styles.fieldDescription}>{data?.paymentMode}</Text>
					</View>
				</View>
			</View>

			<View style={styles.titleContainer}>
				<View style={styles.displayFlex}>
					<View style={styles.width30}>
						<Text style={styles.fieldTitle}>Bank Name</Text>
					</View>
					<View style={styles.width70}>
						<Text style={styles.fieldDescription}>{data?.bankName}</Text>
					</View>
				</View>
			</View>

			<View style={styles.titleContainer}>
				<View style={styles.displayFlex}>
					<View style={styles.width30}>
						<Text style={styles.fieldTitle}>Total amount</Text>
					</View>
					<View style={styles.width70}>
						<Text style={styles.fieldDescription}>{data?.amount}/-</Text>
					</View>
				</View>
			</View>
		</>
	);

	const Divider = () => (
		<View style={styles.titleContainer}>
			<View style={styles.divider}></View>
		</View>
	);
	const Footer = () => (
		<View style={styles.titleContainer}>
			<View style={styles.spaceBetween}>
				<View style={{ maxWidth: 200 }}>
					<Text style={styles.addressTitle}>Thank you!</Text>
				</View>
				<Text style={styles.addressTitle}>Vajra Pratishthan</Text>
			</View>
		</View>
	);

	
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<ReceiptTitle />
				<ReceiptDate />
				<Divider />
				<ReceiptContent />
				<Divider />
				<Footer />
			</Page>
		</Document>
	);
};

export default Invoice;
