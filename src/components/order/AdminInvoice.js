import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.text}>
          <Text style={styles.title}>Pacxa</Text>
        </View>
        <View style={styles.section}>
          <Text>Quote #: {order._id.slice(-5)}</Text>
          <Text>PR#: {order.paymentIntent.srt}</Text>
          <Text>Requested By: {order.paymentIntent.requestedBy}</Text>
          <Text>Address: {order.paymentIntent.address}</Text>
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
          <Text>Terms: 45 days with purchase order</Text>
          <Text>Purchase order must be made to:</Text>
          <Text>Century Computers, Inc.</Text>
        </View>
        <View style={styles.bodyText}>
          <Text>Dealer: V14709</Text>
        </View>
        <View style={styles.bodyText}>
          <Text>
            Any additional maintenance work or setup other than what has been
            quoted above will be billed on an hourly bases. Quotes are valid for
            30 days.
          </Text>
        </View>
        <View style={styles.bodyText}>
          <Text>ACCEPTANCE OF PROPOSAL</Text>
        </View>
        <View style={styles.bodyText}>
          <Text>
            Buyer hereby accepts the above proposal, subject to acceptance in
            writing by Century Computers. By indicating it's acceptance, Buyer
            understands and agrees that this document will constitute a binding
            contract on Buyer under the terms and conditions specified above.
            Buyer further agrees that this agreement is also governed by the
            additional terms and conditions of the signed Basic Contract
            attached hereto and incorporated hereby.
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
