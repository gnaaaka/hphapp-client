import React from "react";
import { Link } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";

const AdminNav = () => {
  const useStyles = makeStyles((theme) => ({
    link: {
      margin: theme.spacing(1, 2),
      color: "#283f7d",
      fontWeight: "bold",
      fontSize: "15px",
      lineHeight: "2.5rem",
    },
  }));

  const classes = useStyles();

  return (
    <nav>
      <ul className='nav flex-column'>
        <li className='nav-item'>
          <Link to='/admin/product' className={classes.link}>
            Create Products
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/products' className={classes.link}>
            Edit Products
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/category' className={classes.link}>
            Categories
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/admin/sub' className={classes.link}>
            Tags
          </Link>
        </li>
        {/* <li className='nav-item'>
          <Link to='/admin/coupon' className={classes.link}>
            Coupons
          </Link>
        </li> */}
        <li className='nav-item'>
          <Link to='/user/password' className={classes.link}>
            Change Password
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
