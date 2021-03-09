import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PacxaLogo from "../../images/Pacxa-Logo.png";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

const Header = () => {
  const [current, setCurrent] = useState("home");

  // Redux methods
  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOG_OUT",
      payload: null,
    });
    history.push("/login");
  };

  const useStyles = makeStyles((theme) => ({
    "@global": {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: "none",
      },
    },
    logo: { width: "150px" },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 2),
      color: "#283f7d",
      fontWeight: "bold",
    },
    icon: {
      verticalAlign: "middle",
    },
  }));

  const classes = useStyles();

  return (
    <AppBar
      position='static'
      color='default'
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Link to='/' variant='button' className={classes.link}>
          <img alt='logo' src={PacxaLogo} className={classes.logo} />
        </Link>

        <nav
          className={classes.nav}
          onClick={handleClick}
          selectedkeys={[current]}
          mode='horizontal'
        >
          <Link to='/shop' variant='button' className={classes.link}>
            Shop
          </Link>

          {user && user.role === "subscriber" && (
            <Link to='/user/history' variant='button' className={classes.link}>
              Dashboard
            </Link>
          )}
          {user && user.role === "admin" && (
            <Link
              to='/admin/dashboard'
              variant='button'
              className={classes.link}
            >
              Dashboard
            </Link>
          )}
          {!user ? (
            ""
          ) : (
            <Link to='/cart' variant='button' className={classes.link}>
              <Badge badgeContent={cart.length} color='secondary'>
                <ShoppingCartIcon />
              </Badge>
            </Link>
          )}

          {!user ? (
            <a href='/login' className={classes.link}>
              Login
            </a>
          ) : (
            <a
              onClick={logout}
              variant='button'
              className={classes.buttonLogout}
            >
              <PowerSettingsNewIcon className={classes.icon} />
            </a>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
