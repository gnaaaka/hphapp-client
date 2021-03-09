import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Material UI
import { makeStyles } from "@material-ui/core/styles";

const UserNav = () => {
  const { user } = useSelector((state) => ({ ...state }));

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
        {user && user.role === "subscriber" && (
          <li className='nav-item'>
            <Link to='/user/history' className={classes.link}>
              History
            </Link>
          </li>
        )}
        <li className='nav-item'>
          <Link to='/user/password' className={classes.link}>
            Password
          </Link>
        </li>
        {/* <li className='nav-item'>
          <Link to='/user/wishlist' className={classes.link}>
            Wishlist
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default UserNav;
