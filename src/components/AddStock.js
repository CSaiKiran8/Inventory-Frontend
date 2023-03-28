import { useState,useEffect } from "react";
import {useSelector} from 'react-redux';
import Button from "@mui/material/Button";
import axios from 'axios';
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const AddStock = () => {
  const [products,setProducts] = useState([]);
  const token = useSelector((state) => state.token.value);

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
   console.log(product)
   try {
     const res = await axios.post("https://inventoryapp-s6ze.onrender.com/product", { title, desc, img, categories, size, color, price },{ headers: { authorization: token }});
     setProduct({
      title: "",
      desc: "",
      img: "",
      categories: "",
      size: "",
      color: "",
      price: 0,
    });
     console.log(res);
   } catch (error) {
     alert(error.message);
   }
   
  }

  useEffect(()=>{
    const load = async() => {
      const res = await axios.get('https://inventoryapp-s6ze.onrender.com/product',{ headers: { authorization: token }});
      const data = await res.data;
      setProducts(data.products);
    }
     load();
  })


  return (
    <div className="m-5">
      <h1 className="d-flex justify-content-center m-3 p-2">Add Stock</h1>
      <form
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
            ADD
          </Button>
        </div>
      </form><br/>
      <div>
        <table className="table table-hover table-responsive">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Categories</th>
              <th>Size</th>
              <th>Color</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product,i)=>(
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{product.title}</td>
                  <td>{product.desc}</td>
                  <td><img  
          style={{width:'30px',height:'30px'}}
          src={`${product.img}`} alt="img"  /></td>
                  <td>{product.categories}</td>
                  <td>{product.size}</td>
                  <td>{product.color}</td>
                  <td>{product.price}</td>
                  <td>
                  <Link to={`/edit/${product._id}`}>
                  <IconButton color="primary" aria-label="Edit">
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton
                  color="error"
                  aria-label="delete"
                  onClick={() => {
                    //deleting the user on API
                     axios.delete(`https://inventoryapp-s6ze.onrender.com/product/${product._id}`,{ headers: { authorization: token }});
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddStock;
