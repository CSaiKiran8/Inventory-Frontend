import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { addProduct } from "../redux/cartRedux";
import { useSelector,useDispatch } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const Product = () => {
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
   const dispatch = useDispatch();
   const token = useSelector((state) => state.token.value);

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`https://inventoryapp-s6ze.onrender.com/product/find/${id}`,{ headers: { authorization: token }});
      setProduct(res.data);
    };
    load();
  }, [token,id]);

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity}));
    navigate('/cart'); 
  };

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };


  return (
    <div className='m-5'>
      <div className='d-flex p-5 justify-content-center flex-wrap'>
      <div className='d-flex'>
        <img
          style={{ width: "300px", height: "300px" }}
          src={`${product.img}`}
          alt="img"
        />
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column m-3 p-3 ">
        <span>{product.title}</span>
        <span>Product info {product.desc}</span>
        <span>Category {product.categories}</span>
        <span>Color {product.color}</span>
        <span>Size {product.size}</span>
        <span>Price {product.price}</span>
        <div>
              <RemoveCircleIcon onClick={() => handleQuantity("dec")} />
              <span>{quantity}</span>
              <AddIcon onClick={() => handleQuantity("inc")} />
            </div>
        <button className='btn btn-primary m-1 p-1' onClick={handleClick}>ADD TO CART</button>
      </div>
    </div>
    </div>
  );
};

export default Product;
