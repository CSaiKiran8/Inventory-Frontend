import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux"; 
import axios from 'axios';
import { setUser } from "../redux/userSlice";

const Products = () => {
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      const res = await axios.get("https://inventoryapp-s6ze.onrender.com/product",{ headers: { authorization: token }});
      const data = await res.data;
      setProducts(data.products);
      dispatch(setUser(data.user));
    };
    load();
  },[dispatch,token]);

  return (
    <div className='con'> 
    <div className="d-flex justify-content-center m-5 p-1 flex-column">
      {products.map((product, i) => (
        <div className="d-flex justify-content-center m-3 col-12 flex-wrap" key={i}>
          <div>
            <Link to={`/product/${product._id}`}>
              <img
                style={{ width: "200px", height: "200px" }}
                src={`${product.img}`}
                alt="img"
              />
            </Link>
          </div>
          <div className="d-flex flex-column m-2 p-2">
            <span>{product.title}</span>
            <span>Product info {product.desc}</span>
            <span>Category {product.categories}</span> 
            <span>Color {product.color}</span>
            <span>Size {product.size}</span>
            <span>Price ₹ {product.price}</span>
            <span>Added {product.createdAt.slice(0,10)}</span>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Products;
