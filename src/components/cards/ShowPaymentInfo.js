import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div className='text-center bg-light p-3'>
    <p className='m-1'>
      <b>Quote ID: </b> {order._id.slice(-5)} • <b>PR#: </b>
      {order.paymentIntent.srt}
      <br />
      <b>Total:</b>{" "}
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(order.paymentIntent.amount / 100)}{" "}
      • <b>Ship To: </b>
      {order.paymentIntent.address}
    </p>
  </div>
);

export default ShowPaymentInfo;
