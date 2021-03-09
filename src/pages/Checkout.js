import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveNotes,
  // saveAddress,
  // applyCoupon,
  createCashOrder,
} from "../functions/user";
import { toast } from "react-toastify";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";

const harborCourt =
  "Harbor Court, 55 Merchant Street 23rd Floor, Honlulu HI 96813";
const straubInfo =
  "Straub Info Systems, First Insurance Building, 1100 Ward Avenue, Suite 870 Honolulu HI 96814";
const kapiolani =
  "Kapiolani Medical Center IT, 1319 Punahou St DHT 3196, Honolulu HI 96826";
const wilcox = "Wilcox Memorial Hospital, 3-3420 Kuhio Highway, Lihue HI 96766";
const paliMomi =
  "Pali Momi Medical Center, 98-1079 Moanalua Road, Aiea HI 96702";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "90%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Checkout = ({ history }) => {
  const classes = useStyles();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalAfterTax, setTotalAfterTax] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  // const [discountError, setDiscountError] = useState("");
  const [notes, setNotes] = useState("");
  const [notesSaved, setNotesSaved] = useState(false);
  const [srt, setSrt] = useState("");
  const [requestedBy, setRequestedBy] = useState("");

  // redux
  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
      setTax(res.data.cartTotal * 0.04712);
      setTotalAfterTax(res.data.cartTotal * 0.04712 + res.data.cartTotal);
    });
  }, [user.token]);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from db
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty, continue shopping");
    });
  };

  const saveNotesToDb = () => {
    saveNotes(user.token, notes, srt, requestedBy).then((res) => {
      if (res.data.ok) setNotesSaved(true);
      toast.success("Address Saved");
    });
  };

  const showAddress = () => (
    <>
      <FormControl className={classes.formControl}>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        >
          <MenuItem value={kapiolani}>
            Kapiolani Medical Center for Women & Children IT
          </MenuItem>

          <MenuItem value={straubInfo}>Straub Info Systems</MenuItem>

          <MenuItem value={wilcox}>Wilcox Memorial Hospital</MenuItem>

          <MenuItem value={harborCourt}>Harbor Court</MenuItem>

          <MenuItem value={paliMomi}>Pali Momi Medical Center</MenuItem>
        </Select>
        <FormHelperText>Address is required.</FormHelperText>
      </FormControl>
      <br />
      <h4 style={{ marginTop: "20px" }}>PR #:</h4>
      <Input
        className='col-md-11 py-2 px-0'
        value={srt}
        onChange={(e) => setSrt(e.target.value)}
      />
      <br />
      <h4 style={{ marginTop: "20px" }}>Requested By:</h4>
      <Input
        className='col-md-11 py-2 px-0'
        value={requestedBy}
        onChange={(e) => setRequestedBy(e.target.value)}
      />
      <button
        className='text-center btn btn-primary btn-raised ml-2 mt-3'
        onClick={saveNotesToDb}
      >
        Save
      </button>
    </>
  );

  // const applyDiscountCoupon = () => {
  //   applyCoupon(user.token, coupon).then((res) => {
  //     console.log("Res coupon applied", res.data);
  //     if (res.data) {
  //       setTotalAfterDiscount(res.data);
  //       // update state to redux
  //       dispatch({
  //         type: "COUPON_APPLIED",
  //         payload: true,
  //       });
  //     }
  //     if (res.data.err) {
  //       setDiscountError(res.data.err);
  //       // update state in redux
  //       dispatch({
  //         type: "COUPON_APPLIED",
  //         payload: false,
  //       });
  //     }
  //   });
  // };

  const showProductSummary = () => (
    <>
      {products.map((p, i) => (
        <div key={i}>
          <p>
            {p.product.title} ({p.color}) x {p.count} = $
            {p.product.price * p.count}
          </p>
        </div>
      ))}
    </>
  );

  // const showApplyCoupon = () => (
  //   <>
  //     <input
  //       type='text'
  //       className='form-control'
  //       onChange={(e) => {
  //         setCoupon(e.target.value);
  //         setDiscountError("");
  //       }}
  //       value={coupon}
  //     />
  //     <button onClick={applyDiscountCoupon} className='btn btn-primary mt-2'>
  //       Apply
  //     </button>
  //   </>
  // );

  const createCashOrderDb = () => {
    createCashOrder(
      user.token,
      COD,
      tax,
      totalAfterTax,
      couponTrueOrFalse
    ).then((res) => {
      // console.log("USER CASH ORDER CREATED", res);
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // empty cart in db
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <div className='row mt-5 px-4'>
      <div className='col-md-6'>
        <h4>Delivery Address</h4>
        <br />
        {showAddress()}
        {/* <hr />
        <h4>Coupon Code:</h4>
        <br />
        {showApplyCoupon()}
        {discountError && <p className='bg-danger p-2'>{discountError}</p>} */}
      </div>
      <div className='col-md-6'>
        <h4>Quote Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>
          <b>
            Sub-total:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(total)}
          </b>
        </p>
        <p>
          Tax:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(tax)}
        </p>
        <p>
          <b>
            Total:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalAfterTax)}
          </b>
        </p>

        {totalAfterDiscount > 0 && (
          <p className='bg-success p-2'>
            Discount Applied: ${totalAfterDiscount}
          </p>
        )}
        <br />
        <div className='row'>
          <div className='col-md-6'>
            {COD ? (
              <button
                className='text-center btn btn-primary btn-raised btn-block'
                disabled={!notesSaved || !products.length}
                onClick={createCashOrderDb}
              >
                Create Quote
              </button>
            ) : (
              <button
                className='text-center btn btn-primary btn-raised btn-block'
                disabled={!notesSaved || !products.length}
                onClick={() => history.push("/payment")}
              >
                Payment
              </button>
            )}
          </div>
          <div className='col-md-6'>
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className='btn btn-outline-danger'
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
