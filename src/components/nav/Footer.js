import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";

const Footer = () => {
  const useStyles = makeStyles({
    footer: {
      width: "100%",
      textAlign: "center",
      backgroundColor: "rgb(91 192 180)",
      color: "#ffffff",
      padding: "20px 0px",
      position: "fixed",
      bottom: "-10",
    },
  });

  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      &copy; Copyright {new Date().getFullYear()} | All Rights Reserved Pacxa
    </footer>
  );
};

export default Footer;
