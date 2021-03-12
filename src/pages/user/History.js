import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector } from "react-redux";
// import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
// import { toast } from "react-toastify";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () => {
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });
  };

  const showOrderInTable = (order) => (
    <table className='table table-bordered'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>Product</th>
          <th scope='col'>Quantity</th>
          <th scope='col'>Price</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.count}</td>
            <td>${p.product.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName={`Quote_${order._id.slice(-5)}.pdf`}
      className='text-center btn btn-primary btn-raised btn-block'
    >
      Download PDF
    </PDFDownloadLink>
  );

  const showEachOrder = () =>
    // update sort in the backend
    orders.map((order, i) => (
      <div key={i} className='m-5 pb-3 px-3'>
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className='row'>
          <div className='col'>{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className='container-fluid'>
      <div className='row mt-5'>
        <div className='col-md-2'>
          <UserNav />
        </div>
        <div className='col-md-9 mx-auto text-center'>
          <h4>
            {orders.length > 0 ? "History" : "Sorry, no quotes at the moment."}
          </h4>
          {showEachOrder()}
        </div>
      </div>
    </div>
  );
};

export default History;
