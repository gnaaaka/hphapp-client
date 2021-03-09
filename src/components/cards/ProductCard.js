import React, { useState } from "react";
// import { Card, Tooltip } from "antd";
import { Link } from "react-router-dom";
import DefaultImage from "../../images/default.png";
// import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch } from "react-redux";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Tooltip from "@material-ui/core/Tooltip";

// const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to Add");
  const { images, title, description, price, slug } = product;

  // redux
  // const { user, cart } = useSelector((state) => ({ ...state }));
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
    root: {
      // maxWidth: 345,
      marginBottom: "20px",
    },
    media: {
      height: 300,
    },
    actions: {
      display: "flex",
      justifyContent: "space-around",
    },
    link: {
      fontSize: "10px",
      color: "#666666",
    },
  });

  const classes = useStyles();

  return (
    <>
      {/* {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className='text-center pt-1 pb-3'>No Rating Yet</div>
      )} */}
      {/* <Card
        cover={
          <img
            alt=''
            src={images && images.length ? images[0].url : DefaultImage}
            style={{ height: "150px", objectFit: "cover" }}
            className='p-1'
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <VisibilityIcon style={{ color: "#5bc0b4" }} />
            <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
              <AddShoppingCartIcon style={{ color: "#5bc0b4" }} />
              <br />
              {product.quantity < 1 ? "Out of Stock" : "Add to Cart"}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card> */}

      <Card variant='outlined' className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={images && images.length ? images[0].url : DefaultImage}
            title='Contemplative Reptile'
          />
          <CardContent>
            <Typography gutterBottom component='h5'>
              <b>{title}</b>
              <br />
              Pacxa Price ${price}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {`${description && description.substring(0, 100)}...`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actions}>
          <Button size='small' color='primary' style={{ width: "50%" }}>
            <Link to={`/product/${slug}`} className={classes.link}>
              <VisibilityIcon style={{ color: "#5bc0b4" }} />
              <br /> View Product
            </Link>
          </Button>
          <Button size='small' color='primary' style={{ width: "50%" }}>
            <Tooltip title={tooltip}>
              <a
                onClick={handleAddToCart}
                disabled={product.quantity < 1}
                className={classes.link}
                style={{ color: "#666666" }}
              >
                <AddShoppingCartIcon style={{ color: "#5bc0b4" }} />
                <br />
                {product.quantity < 1 ? "Out of Stock" : "Add to Cart"}
              </a>
            </Tooltip>
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
