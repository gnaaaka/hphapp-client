import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userCart } from "../functions/user";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () =>
    cart.reduce(
      (currentValue, nextValue) =>
        currentValue + nextValue.count * nextValue.price,
      0
    );

  const saveCashOrderToDb = () => {
    // redux
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        // console.log(res);
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((err) => console.log("save err", err));
  };

  const showCartItems = () => (
    <table className='table table-bordered'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>Image</th>
          <th scope='col'>Title</th>
          <th scope='col'>Price</th>
          {/* <th scope='col'>Brand</th>
          <th scope='col'>Color</th> */}
          <th scope='col'>Quantity</th>
          {/* <th scope='col'>Shipping</th> */}
          <th scope='col'>Remove</th>
        </tr>
      </thead>
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className='container-fluid pt-2'>
      <div className='row mt-5 px-2'>
        <div className='col-md-8'>
          <h4>Cart / {cart.length} Products</h4>
          {!cart.length ? (
            <p>
              No products in cart. <Link to='/shop'>Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className='col-md-4'>
          <h4>Quote Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          <p>
            <b>
              Sub-total:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(getTotal())}
            </b>
          </p>
          <hr />
          {user ? (
            <>
              {/* <button
                onClick={saveOrderToDb}
                className='btn btn-sm btn-primary mt-2'
                disabled={!cart.length}
              >
                Proceed To Checkout
              </button>
              <br /> */}
              <button
                onClick={saveCashOrderToDb}
                className='text-center btn btn-primary btn-raised btn-block'
                disabled={!cart.length}
              >
                Create Quote
              </button>
              <Link to='/shop'>Continue Shopping</Link>
            </>
          ) : (
            <button className='btn btn-sm btn-primary mt-2'>
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
