import { useState,useEffect } from "react";
import { useSelector} from "react-redux";
import Button from "@mui/material/Button";
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom';


const EditProduct = () => {
  const token = useSelector((state) => state.token.value);
  const {id} = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    desc: "",
    img: "",
    categories: "",
    size: "",
    color: "",
    price: 0,
  });

  const { title, desc, img, categories, size, color, price } = product;

  const onInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
   e.preventDefault();
   try {
      await axios.put(`https://inventoryapp-s6ze.onrender.com/product/${id}`, { title, desc, img, categories, size, color, price },{ headers: { authorization: token }});
     setProduct({
      title: "",
      desc: "",
      img: "",
      categories: "",
      size: "",
      color: "",
      price: 0,
    });
    navigate(-1)
   } catch (error) {
     alert(error.message);
   }
   
  }

  useEffect(()=>{
    const load = async() => {
      const res = await axios.get(`https://inventoryapp-s6ze.onrender.com/product/find/${id}`,{ headers: { authorization: token }});
      setProduct(res.data);
    }
     load();
  },[id,token])




  return (
   <div className='container'>
     <h1 className="d-flex justify-content-center m-3">Edit Product</h1>
      <form
        className="container"
        onSubmit={handleSubmit}
      >
        <div className="mb-3 row">
          <div className="form-group col-md-3">
            <input
              className="form-control m-2"
              placeholder="Product Name"
              required
              type="text"
              color="primary"
              name="title"
              value={title}
              onChange={(e) => onInput(e)}
              autoComplete="off"
            />
          </div>
          <div className="form-group col-md-3">
            <input
              className="form-control m-2"
              autoComplete="off"
              placeholder="Description"
              type="text"
              color="blue"
              name="desc"
              value={desc}
              required
              onChange={(e) => onInput(e)}
            />
          </div>
          <div className="form-group col-md-3">
            <input
              autoComplete="off"
              placeholder="Image"
              required
              color="blue"
              className="form-control m-2"
              type="text"
              name="img"
              value={img}
              onChange={(e) => onInput(e)}
            />
          </div>
          <div className="form-group col-md-3">
            <input
              className="form-control m-2"
              required
              placeholder="Categories"
              type="text"
              color="blue"
              name="categories"
              value={categories}
              onChange={(e) => onInput(e)}
              autoComplete="off"
            />
          </div>
          <div className="form-group col-md-3">
            <input
              className="form-control m-2"
              placeholder="Size"
              type="text"
              autoComplete="off"
              color="blue"
              name="size"
              value={size}
              required
              onChange={(e) => onInput(e)}
            />
          </div>
          <div className="form-group col-md-3">
            <input
              className="form-control m-2"
              autoComplete="off"
              placeholder="Color"
              type="text"
              color="blue"
              required
              name="color"
              value={color}
              onChange={(e) => onInput(e)}
            />
          </div>
          <div className="form-group col-md-3">
            <input
              className="form-control m-2"
              autoComplete="off"
              placeholder="Price"
              required
              type="number"
              color="blue"
              name="price"
              value={price}
              onChange={(e) => onInput(e)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Button type="submit" variant="contained" color="primary">
            Edit
          </Button>
        </div>
      </form>
   </div>    
  );
}

export default EditProduct;