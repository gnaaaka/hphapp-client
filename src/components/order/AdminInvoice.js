import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

const newLine = (data) => {
  let dataToArray = data.split(",").map((item) => item.trim());
  return dataToArray.join("\n");
};

const Invoice = ({ order }) => {
  let orginalDate = new Date(order.createdAt);
  let formatedDate =
    orginalDate.getMonth() +
    1 +
    "/" +
    orginalDate.getDay() +
    "/" +
    orginalDate.getFullYear();
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.text}>
          <Text style={styles.title}>Pacxa</Text>
        </View>
        <View style={styles.section}>
          <Text>
            Quote #: {order._id.slice(-5)} - PR#: {order.paymentIntent.srt}
          </Text>
          <Text>Requested By: {order.paymentIntent.requestedBy}</Text>
          <Text>Address: {order.paymentIntent.address}</Text>
          <Text>Date Created: {newLine(formatedDate)}</Text>
        </View>
        <Table style={styles.table}>
          <TableHeader>
            <TableCell style={styles.cell}>Title</TableCell>
            <TableCell style={styles.cell}>Quantity</TableCell>
            <TableCell style={styles.cell}>Price</TableCell>
          </TableHeader>
        </Table>
        <Table data={order.products}>
          <TableBody>
            <DataTableCell
              style={styles.cellData}
              getContent={(x) => x.product.title}
            />
            <DataTableCell
              style={styles.cellData}
              getContent={(x) => x.count}
            />
            <DataTableCell
              style={styles.cellData}
              getContent={(x) => `$${x.product.price}`}
            />
          </TableBody>
        </Table>
        <View style={styles.totalHeader}>
          <Text>
            Sub-total:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(order.paymentIntent.amount / 100)}
          </Text>
          <Text>
            Tax:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(order.paymentIntent.tax)}
          </Text>
          <Text>
            Total:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(order.paymentIntent.totalAfterTax)}
          </Text>
        </View>
        <View style={styles.agreementHeader}>
          <Text>Purchase order must be made to:</Text>
          <Text>Pacxa</Text>
        </View>
        <View style={styles.bodyText}>
          <Text>
            Any additional maintenance work or setup other than what has been
            quoted above will be billed on an hourly bases. Quotes are valid for
            30 days.
          </Text>
        </View>
        <View style={styles.agreementText}>
          <Text>CONFIDENTIALITY AND VALIDITY</Text>
          <Text>
            This Sales Agreement or Statement of Work, including any
            attachments, is for the sole use of the intended recipient and may
            contain confidential and privileged information. Any unauthorized
            review, use, disclosure or distribution is prohibited and is only
            for the intended recipient. This Sales Agreement or Statement of
            Work is valid for 30 days.
          </Text>
        </View>
        <View style={styles.agreementText}>
          <Text>ACCEPTANCE OF PROPOSAL</Text>
          <Text>
            By signing below, customer acknowledges and agrees to the Terms and
            Conditions of this Sales Agreement or Statement of Work. In
            addition, Customer acknowledges and agrees to the Master Agreement
            which is incorporated by reference and posted at www.pacxa.com/ma.
          </Text>
        </View>
        <View style={styles.agreementText}>
          <Text>
            Terms: Net 45 days with purchase order. Please make purchase order
            out to: Pacxa
          </Text>
        </View>
        <View style={styles.bodySig}>
          <Text>
            Buyer:______________________ Seller:______________________
          </Text>
        </View>
        <View style={styles.bodyText}>
          <Text>Date:______________________ Date:______________________</Text>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  section: {
    textAlign: "center",
    margin: 30,
    fontSize: 12,
    lineHeight: 1.5,
  },
  cell: { padding: 2, textAlign: "center" },
  cellData: { padding: 2, textAlign: "center", fontSize: 11 },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  totalHeader: {
    textAlign: "right",
    fontSize: 11,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 10,
  },
  agreementHeader: {
    textAlign: "left",
    fontSize: 11,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 20,
  },
  agreementText: {
    textAlign: "left",
    fontSize: 8,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 1,
    marginBottom: 10,
  },
  bodySig: {
    textAlign: "left",
    fontSize: 11,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40,
    marginBottom: 10,
  },
  bodyText: {
    textAlign: "left",
    fontSize: 11,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    textAlign: "center",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
});

export default Invoice;
