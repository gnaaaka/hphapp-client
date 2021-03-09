import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  // access user state
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // searching and filtering
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    return getCategories().then((c) => setCategories(c.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is successfully created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} is successfully deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
        });
    }
  };

  const categoryForm = () => (
    <div className='form-group'>
      <form onSubmit={handleSubmit}>
        <label htmlFor=''>Name</label>
        <input
          type='text'
          className='form-control'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        <br />
        <button className='btn btn-outline-primary'>Save</button>
      </form>
    </div>
  );

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className='container-fluid'>
      <div className='row mt-5'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-6 mx-auto'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Create a Category</h4>
          )}
          {categoryForm()}

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {categories.filter(searched(keyword)).map((c) => (
            <div className='alert alert-secondary' key={c._id}>
              {c.name}{" "}
              {/* <span
                onClick={() => handleRemove(c.slug)}
                className='btn btn-sm float-right'
              >
                <DeleteOutlined className='text-danger' />
              </span> */}
              {/* <span className='btn btn-sm float-right '>
                <Link to={`/admin/category/${c.slug}`}>
                  <EditOutlined className='text-warning' />
                </Link>
              </span> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
