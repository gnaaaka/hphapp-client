import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
}) => {
  // destructure
  const {
    title,
    description,
    price,
    retail,
    part,
    category,
    // shipping,
    active,
    quantity,
    featureone,
    featuretwo,
    featurethree,
    featurefour,
    // colors,
    // brands,
    // color,
    // brand,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Title</label>
        <input
          type='text'
          name='title'
          className='form-control'
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>Part</label>
        <input
          type='text'
          name='part'
          className='form-control'
          value={part}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>Description</label>
        <input
          type='text'
          name='description'
          className='form-control'
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>Feature 1</label>
        <input
          type='text'
          name='featureone'
          className='form-control'
          value={featureone}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>Feature 2</label>
        <input
          type='text'
          name='featuretwo'
          className='form-control'
          value={featuretwo}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>Feature 3</label>
        <input
          type='text'
          name='featurethree'
          className='form-control'
          value={featurethree}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>Feature 4</label>
        <input
          type='text'
          name='featurefour'
          className='form-control'
          value={featurefour}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>Price</label>
        <input
          type='number'
          name='price'
          className='form-control'
          value={price}
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label>Retail</label>
        <input
          type='number'
          name='retail'
          className='form-control'
          value={retail}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>Active</label>
        <select
          value={active === "Yes" ? "Yes" : "No"}
          name='active'
          className='form-control'
          onChange={handleChange}
        >
          <option value='Yes'>Yes</option>
          <option value='No'>No</option>
        </select>
      </div>

      <div className='form-group'>
        <label>Quantity</label>
        <input
          type='number'
          name='quantity'
          className='form-control'
          value={quantity}
          onChange={handleChange}
        />
      </div>

      {/* <div className='form-group'>
        <label>Color</label>
        <select
          value={color}
          name='color'
          className='form-control'
          onChange={handleChange}
        >
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div> */}

      {/* <div className='form-group'>
        <label>Brand</label>
        <select
          value={brand}
          name='brand'
          className='form-control'
          onChange={handleChange}
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div> */}

      <div className='form-group'>
        <label>Category</label>
        <select
          name='category'
          className='form-control'
          onChange={handleCategoryChange}
          // if new category clicked, show new category,
          // if not keep original value category._id
          value={selectedCategory ? selectedCategory : category._id}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label>Tags</label>
        <Select
          mode='multiple'
          style={{ width: "100%" }}
          placeholder='Please select'
          value={arrayOfSubs}
          onChange={(value) => setArrayOfSubs(value)}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>

      <br />
      <button className='btn btn-outline-info'>Save</button>
    </form>
  );
};

export default ProductUpdateForm;
