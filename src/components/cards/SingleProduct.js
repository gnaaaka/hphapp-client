import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DefaultImage from "../../images/default.png";
import ProductListItems from "./ProductListItems";
import _ from "lodash";
import { useDispatch } from "react-redux";
// import { addToWishlist } from "../../functions/user";
// import { toast } from "react-toastify";
// import { useHistory } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

// Children component of product page
const SingleProduct = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to Add");
  const { title, images, description, quantity } = product;

  // redux
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window != "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");
      // Add to Redux
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const useStyles = makeStyles({
    button: {
      backgroundColor: "#283f7d",
      fontSize: "12px",
      padding: "10px 20px",
    },
  });

  const classes = useStyles();

  return (
    <div className='container-fluid'>
      <div className='row mt-5'>
        <div className='col-md-7 ml-5'>
          {images && images.length ? (
            <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
              {images &&
                images.map((i) => (
                  <img alt='product' src={i.url} key={i.url} />
                ))}
            </Carousel>
          ) : (
            <Card variant='outlined'>
              <img
                alt='Product'
                src={DefaultImage}
                className='mb-3 card-image'
              />
            </Card>
          )}
        </div>

        <div className='col-md-4 ml-3'>
          <h1>{title}</h1>
          <p>{description}</p>
          {/* <Card variant='outlined'> */}
          <ProductListItems product={product} />
          {/* </Card> */}
          <br />
          <Tooltip title={tooltip}>
            <Button
              onClick={handleAddToCart}
              variant='contained'
              color='primary'
              className={classes.button}
              disabled={quantity < 1}
            >
              {quantity < 1 ? "Out of Stock" : "Add To Cart"}
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
