import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  title: "",
  description: "",
  price: "",
  retail: "",
  part: "",
  featureone: "",
  featuretwo: "",
  featurethree: "",
  featurefour: "",
  categories: [],
  category: "",
  active: "",
  subs: [],
  // shipping: "",
  quantity: "",
  images: [],
  // colors: ["Black", "Brown", "Silver", "White", "Blue"],
  // brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
  // color: "",
  // brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    return getCategories().then((c) =>
      // sets the existing category options and updates the setValue
      setValues({ ...values, categories: c.data })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`${res.data.title} is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Clicked Category", e.target.value);
    // when category is clicked
    setValues({
      ...values,
      subs: [],
      category: e.target.value,
    });
    getCategorySubs(e.target.value).then((res) => {
      console.log("Sub options on cat click", res.data);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className='container-fluid'>
      <div className='row mt-5'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-6 mx-auto'>
          {loading ? (
            <LoadingOutlined className='text-danger h1' />
          ) : (
            <h4>Create Product</h4>
          )}
          <hr />

          <div className='p-3'>
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
