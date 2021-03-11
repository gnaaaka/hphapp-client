import React from "react";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AdminInvoice from "../order/AdminInvoice";

const Orders = ({ orders }) => {
  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<AdminInvoice order={order} />}
      fileName={`Quote_${order._id.slice(-5)}.pdf`}
      className='text-center btn btn-primary btn-raised btn-block'
    >
      Download PDF
    </PDFDownloadLink>
  );

  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className='row mb-3'>
          <div className='col text-center bg-light py-3'>
            <ShowPaymentInfo order={order} />
            <div className='container-fluid px-1'>
              <div className='row'>
                <div className='col-md-12'>{showDownloadLink(order)}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Orders;
