import React from "react";
import DefaultImage from "../../images/default.png";
import { Link } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// const { Meta } = Card;

const useStyles = makeStyles({
  root: { marginBottom: "20px" },
  media: {
    height: 200,
    objectFit: "cover",
  },
  actions: {
    display: "flex",
    justifyContent: "space-around",
  },
  link: {
    fontSize: "14px",
    color: "#3f51b5",
  },
});

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug, active } = product;

  const classes = useStyles();

  return (
    <>
      <Card className={classes.root} variant='outlined'>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={images && images.length ? images[0].url : DefaultImage}
            title='Products'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {title}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {`${description && description.substring(0, 40)}...`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actions}>
          <Button variant='outlined' color='primary' style={{ width: "100%" }}>
            {active === "Yes" ? (
              <Link to={`/admin/product/${slug}`} className={classes.link}>
                Edit
              </Link>
            ) : (
              <Link to={`/admin/product/${slug}`} className={classes.link}>
                Edit - Inactive
              </Link>
            )}
          </Button>
          {/* <Button size='small' color='primary' style={{ width: "50%" }}>
            <a
              onClick={() => handleRemove(slug)}
              className={classes.link}
              style={{ color: "#666666" }}
            >
              <DeleteForeverIcon color='secondary' />
              <br />
              Delete
            </a>
          </Button> */}
        </CardActions>
      </Card>

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
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className='text-warning' />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(slug)}
          className='text-danger'
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card> */}
    </>
  );
};

export default AdminProductCard;
