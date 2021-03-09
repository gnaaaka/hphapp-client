import React, { useState, useEffect } from "react";
import {
  getProductsbyCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
// import { Checkbox } from "antd";
// import Star from "../components/forms/Star";
import Search from "../components/forms/Search";

// Material UI
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  // const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  // const [brands, setBrands] = useState([
  //   "Apple",
  //   "Samsung",
  //   "Microsoft",
  //   "Lenovo",
  //   "Asus",
  // ]);
  // const [brand, setBrand] = useState("");
  // const [colors, setColors] = useState([
  //   "Black",
  //   "Brown",
  //   "Silver",
  //   "White",
  //   "Blue",
  // ]);
  // const [color, setColor] = useState("");
  // const [shipping, setShipping] = useState("");

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => setCategories(res.data));
    getSubs().then((res) => setSubs(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load default products on page load
  const loadAllProducts = () => {
    getProductsbyCount(40).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products based on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  // useEffect(() => {
  //   fetchProducts({ price });
  // }, [ok]);

  // const handleSlider = (value) => {
  //   dispatch({
  //     type: "SEARCH_QUERY",
  //     payload: { text: "" },
  //   });
  //   // reset
  //   setCategoryIds([]);
  //   setPrice(value);
  //   setStar("");
  //   setSub("");
  //   setBrand("");
  //   setColor("");
  //   setShipping("");
  //   setTimeout(() => {
  //     setOk(!ok);
  //   }, 300);
  // };

  // 4. load products based on category
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <FormControlLabel
          control={
            <Checkbox
              checked={categoryIds.includes(c._id)}
              onChange={handleChecked}
              value={c._id}
              className='pl-2 py-0'
            />
          }
          label={c.name}
        />
        <br />
      </div>
    ));

  // handle check for category
  const handleChecked = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // setPrice([0, 0]);
    // setStar("");
    setSub("");
    // setBrand("");
    // setColor("");
    // setShipping("");
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);

    // if not found returns -1 else returns index
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. Show products based on star review
  // const handleStarClick = (num) => {
  //   dispatch({
  //     type: "SEARCH_QUERY",
  //     payload: { text: "" },
  //   });
  //   setPrice([0, 0]);
  //   setCategoryIds([]);
  //   setStar(num);
  //   setSub("");
  //   setBrand("");
  //   setColor("");
  //   setShipping("");
  //   fetchProducts({ stars: num });
  // };

  // const showStars = () => (
  //   <div className='pr-4 pl-4 pb-2'>
  //     <Star starClick={handleStarClick} numberOfStars={5} />
  //     <Star starClick={handleStarClick} numberOfStars={4} />
  //     <Star starClick={handleStarClick} numberOfStars={3} />
  //     <Star starClick={handleStarClick} numberOfStars={2} />
  //     <Star starClick={handleStarClick} numberOfStars={1} />
  //   </div>
  // );

  // 6. Show products by subcategory
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className='p-1 m-1 badge badge-secondary'
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // setPrice([0, 0]);
    setCategoryIds([]);
    // setStar("");
    // setBrand("");
    // setColor("");
    // setShipping("");
    fetchProducts({ sub });
  };

  // 7. Show products by brand
  // const showBrands = () =>
  //   brands.map((b) => (
  //     <Radio
  //       key={b}
  //       value={b}
  //       name={b}
  //       checked={b === brand}
  //       onChange={handleBrand}
  //       className='pb-1 pl-4 pr-4'
  //     >
  //       {b}
  //     </Radio>
  //   ));

  // const handleBrand = (e) => {
  //   setSub(sub);
  //   dispatch({
  //     type: "SEARCH_QUERY",
  //     payload: { text: "" },
  //   });
  //   setPrice([0, 0]);
  //   setCategoryIds([]);
  //   setStar("");
  //   setColor("");
  //   setShipping("");
  //   setBrand(e.target.value);
  //   fetchProducts({ brand: e.target.value });
  // };

  // 8. Show prodcuts by colors
  // const showColors = () =>
  //   colors.map((c) => (
  //     <Radio
  //       key={c}
  //       value={c}
  //       name={c}
  //       checked={c === color}
  //       onChange={handleColor}
  //       className='pb-1 pl-4 pr-4'
  //     >
  //       {c}
  //     </Radio>
  //   ));

  // const handleColor = (e) => {
  //   setSub();
  //   dispatch({
  //     type: "SEARCH_QUERY",
  //     payload: { text: "" },
  //   });
  //   setPrice([0, 0]);
  //   setCategoryIds([]);
  //   setStar("");
  //   setBrand("");
  //   setShipping("");
  //   setColor(e.target.value);
  //   fetchProducts({ color: e.target.value });
  // };

  // // 9. Show products by shipping
  // const showShipping = () => (
  //   <>
  //     <Checkbox
  //       className='pb-2 pl-4 pr-4'
  //       onChange={handleShippingChange}
  //       value='Yes'
  //       checked={shipping === "Yes"}
  //     >
  //       Yes
  //     </Checkbox>
  //     <Checkbox
  //       className='pb-2 pl-4 pr-4'
  //       onChange={handleShippingChange}
  //       value='No'
  //       checked={shipping === "No"}
  //     >
  //       No
  //     </Checkbox>
  //   </>
  // );

  // const handleShippingChange = (e) => {
  //   setSub();
  //   dispatch({
  //     type: "SEARCH_QUERY",
  //     payload: { text: "" },
  //   });
  //   setPrice([0, 0]);
  //   setCategoryIds([]);
  //   setStar("");
  //   setBrand("");
  //   setColor("");
  //   setShipping(e.target.value);
  //   fetchProducts({ shipping: e.target.value });
  // };

  const resetFilter = () => (
    <div onClick={handleReset} style={{ cursor: "pointer" }}>
      <p>
        Reset Filters{" "}
        <RotateLeftIcon fontSize='small' style={{ verticalAlign: "middle" }} />
      </p>
    </div>
  );

  const handleReset = () => {
    setSub();
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    loadAllProducts();
  };

  return (
    <div className='container-fluid'>
      <div className='row mt-5'>
        <div className='col-md-3 pt-2'>
          {/* Search Input */}
          <div className='pl-4 pr-4 mb-5'>
            <Search />
          </div>
          {/* Category Filter */}
          <div className='pl-4 pr-4 mb-5'>
            <h5>Categories:</h5>
            {showCategories()}
          </div>
          {/* Tag Filter */}
          <div className='pl-4 pr-4 mb-5'>
            <h5>Tags:</h5>
            {showSubs()}
          </div>
          <div className='pl-4 pr-4'>{resetFilter()}</div>
        </div>
        <div className='col-md-9 pt-2'>
          {/* {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Products {products.length}</h4>
          )}

          {products.length < 1 && <p>No Products Found</p>} */}

          <div className='row'>
            {products.map((p) => (
              <div key={p._id} className='col-md-4 mt-3'>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
