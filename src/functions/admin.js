import axios from "axios";

export const getOrders = async (authtoken, page) =>
	await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
		headers: {
			authtoken,
			page,
		},
	});

export const changeStatus = async (orderId, orderStatus, authtoken) =>
	await axios.put(
		`${process.env.REACT_APP_API}/admin/order-status`,
		{ orderId, orderStatus },
		{
			headers: {
				authtoken,
			},
		}
	);

export const archiveOrder = async (orderId, authtoken) => {
	return await axios.put(
		`${process.env.REACT_APP_API}/admin/order/${orderId}`,
		{ orderId },
		{
			headers: { authtoken },
		}
	);
};

export const getOrderCount = async () =>
	await axios.get(`${process.env.REACT_APP_API}/admin/dashboard`);
