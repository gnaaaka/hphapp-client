import React from "react";
import ModalImage from "react-modal-image";
import DefaultImage from "../../images/default.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CloseOutlined } from "@ant-design/icons";

const ProductCardInCheckout = ({ p }) => {
  // const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  const dispatch = useDispatch();

  // const handleColorChange = (e) => {
  //   let cart = [];
  //   if (typeof window != "undefined") {
  //     if (localStorage.getItem("cart")) {
  //       cart = JSON.parse(localStorage.getItem("cart"));
  //     }
  //     cart.forEach((product, i) => {
  //       if (product._id === p._id) {
  //         cart[i].color = e.target.value;
  //       }
  //     });
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //     dispatch({
  //       type: "ADD_TO_CART",
  //       payload: cart,
  //     });
  //   }
  // };

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max quantity ${p.quantity}`);
      return;
    }

    let cart = [];
    if (typeof window != "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.forEach((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    let cart = [];
    if (typeof window != "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.forEach((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto", margin: "0px auto" }}>
            {p.images.length ? (
              <ModalImage
                small={p.images[0].url}
                large={p.images[0].url}
                alt='Product'
              />
            ) : (
              <ModalImage
                small={DefaultImage}
                large={DefaultImage}
                alt='Product'
              />
            )}
          </div>
        </td>
        <td className='align-middle'>{p.title}</td>
        <td className='align-middle'>${p.price}</td>
        {/* <td className='align-middle'>{p.brand}</td>
        <td className='align-middle'>
          <select
            onChange={handleColorChange}
            name='color'
            className='form-control'
          >
            {p.color ? (
              <option value={p.color}>{p.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((c) => c !== p.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td> */}
        <td className='text-center align-middle'>
          <input
            type='number'
            className='form-control'
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        {/* <td className='text-center align-middle'>
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className='text-success' />
          ) : (
            <CloseCircleOutlined className='text-danger' />
          )}
        </td> */}
        <td className='text-center align-middle'>
          <CloseOutlined
            onClick={handleRemove}
            className='text-danger pointer'
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
