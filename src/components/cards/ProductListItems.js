import React from "react";
import { Link } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";

const ProductListItems = ({ product }) => {
  const {
    price,
    retail,
    category,
    subs,
    // shipping,
    // color,
    // brand,
    quantity,
    featureone,
    featuretwo,
    featurethree,
    featurefour,
    // sold,
    part,
  } = product;

  const useStyles = makeStyles({
    listItem: {
      lineHeight: "25px",
      fontWeight: "bold",
    },
    productsInfo: {
      fontWeight: "normal",
    },
  });

  const classes = useStyles();

  return (
    <ul className='list-group'>
      {featureone && <li>• {featureone}</li>}
      {featuretwo && <li>• {featuretwo}</li>}
      {featurethree && <li>• {featurethree}</li>}
      {featurefour && <li>• {featurefour}</li>}
      <br />
      <li className={classes.listItem}>
        Part: <span className={classes.productsInfo}>{part}</span>
      </li>

      <li className={classes.listItem}>
        Pacxa Price: <span className={classes.productsInfo}>${price}</span>
      </li>
      <li>
        (Internet Retail Price:{" "}
        <span className={classes.productsInfo}>${retail}</span>)
      </li>

      {category && (
        <li className={classes.listItem}>
          Category:{" "}
          <Link
            to={`/category/${category.slug}`}
            className={classes.productsInfo}
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className={classes.listItem}>
          Tags:{" "}
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/subs/${s.slug}`}
              className={classes.productsInfo}
            >
              {s.name}{" "}
            </Link>
          ))}
        </li>
      )}

      {/* <li className={classes.listItem}>
        Shipping: <span className={classes.productsInfo}>{shipping}</span>
      </li>

      <li className={classes.listItem}>
        Color: <span className={classes.productsInfo}>{color}</span>
      </li>

      <li className={classes.listItem}>
        Brand: <span className={classes.productsInfo}>{brand}</span>
      </li> */}

      <li className={classes.listItem}>
        Available: <span className={classes.productsInfo}>{quantity}</span>
      </li>

      {/* <li className={classes.listItem}>
        Sold: <span className={classes.productsInfo}>{sold}</span>
      </li> */}
    </ul>
  );
};

export default ProductListItems;
