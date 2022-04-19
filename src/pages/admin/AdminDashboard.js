import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, archiveOrder, getOrderCount } from "../../functions/admin";
import { useSelector } from "react-redux";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";
import { toast } from "react-toastify";
import { Pagination } from "antd";
// import Orders from "../../components/order/Orders";

const AdminDashboard = () => {
	const [orders, setOrders] = useState([]);
	const { user } = useSelector((state) => ({ ...state }));
	const [orderCount, setOrderCount] = useState(0);
	const [page, setPage] = useState(1);

	useEffect(() => {
		getOrders(user.token).then((res) => {
			// console.log(res.data);
			setOrders(res.data);
		});
	}, [user.token]);

	useEffect(() => {
		getOrderCount().then((res) => setOrderCount(res.data));
	}, []);

	const showOrderInTable = (order) => (
		<table className="table table-bordered">
			<thead className="thead-light">
				<tr>
					<th scope="col">Product</th>
					<th scope="col">sku</th>
					<th scope="col">Quantity</th>
					<th scope="col">Price</th>
					<th scope="col">Total</th>
				</tr>
			</thead>
			<tbody>
				{order.products.map((p, i) => (
					<tr key={i}>
						<td>
							<b>{p.product ? p.product.title : "No Product"}</b>
						</td>
						<td>{p.product ? p.product.part : "No Sku"}</td>
						<td>{p.count}</td>
						<td>${p.product ? p.product.price : "No Price"}</td>
						<td>${p.count * p.product.price}</td>
					</tr>
				))}
			</tbody>
		</table>
	);

	const showDownloadLink = (order) => (
		<PDFDownloadLink
			document={<Invoice order={order} />}
			fileName={`Quote_${order._id.slice(-5)}.pdf`}
			className="text-center btn btn-primary btn-raised btn-block"
		>
			Download PDF
		</PDFDownloadLink>
	);

	const handleArchive = (orderId) => {
		let answer = window.confirm("Are you sure?");
		if (answer) {
			archiveOrder(orderId, user.token)
				.then((res) => {
					getOrders(user.token);
					window.location.reload();
				})
				.catch((err) => {
					if (err.response.status === 400) {
						toast.error(err.response.data);
					}
					console.log(err);
				});
		}
	};

	const showEachOrder = () =>
		// update sort in the backend
		orders.map((order, i) => (
			<div key={i} className="m-5 pb-3 px-0">
				<ShowPaymentInfo order={order} />
				{showOrderInTable(order)}
				<div className="row">
					<div className="col-md-10 ">{showDownloadLink(order)}</div>
					<div className="col-md-2 ">
						<button
							className="text-center btn btn-outline text-danger btn-block"
							onClick={() => handleArchive(order._id)}
						>
							Archive
						</button>
					</div>
				</div>
			</div>
		));

	return (
		<>
			<div className="container-fluid">
				<div className="row mt-5">
					<div className="col-md-2">
						<AdminNav />
					</div>
					<div className="col-md-10">
						<h4 className="text-center">Admin Dashboard</h4>
						{showEachOrder()}
					</div>
				</div>
			</div>

			<div className="row">
				<nav className="col-md-4 offset-md-4 text-center pt-3 p-3">
					<Pagination
						current={page}
						total={(orders / 10) * 10}
						onChange={(value) => setPage(value)}
					/>
				</nav>
			</div>
		</>
	);
};

export default AdminDashboard;
