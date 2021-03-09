import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DefaultImage from "../../images/default.png";

// Material UI

const SideDrawer = ({ children }) => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyle = {
    width: "100%",
    height: "100px",
    objectFit: "cover",
  };

  return (
    <Drawer
      className='text-center'
      title={`Cart / ${cart.length} Products`}
      placement='right'
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className='row'>
          <div className='col'>
            {p.images[0] ? (
              <>
                <img src={p.images[0].url} alt='Product' style={imageStyle} />
                <p className='text-center bg-secondary text-light py-2'>
                  {p.title}
                </p>
              </>
            ) : (
              <>
                <img src={DefaultImage} alt='Product' style={imageStyle} />
                <p className='text-center p-2'>{p.title}</p>
              </>
            )}
          </div>
        </div>
      ))}
      <Link to='/cart'>
        <Button
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
          className='text-center btn btn-primary btn-raised btn-block'
        >
          Go To Cart
        </Button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
