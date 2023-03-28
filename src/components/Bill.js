import {useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {format} from "timeago.js";
import easyinvoice from 'easyinvoice';

const Bill = () => {
  const user = useSelector((state) => state.user.value);
  const token = useSelector((state) => state.token.value);
  
  const [Invoice,setInvoice] = useState('');
  const [orders,setOrder] = useState([]);
  
  useEffect(()=>{
   const load = async() => {
     
      const res = await axios.get(`https://inventoryapp-s6ze.onrender.com/orders/find/${user.id}`,{ headers: { authorization: token }});
      console.log(res.data);
      setOrder(res.data)
   }
   load();
  },[token,user])

  const getSampleData = async(address,amount,createdAt,name,products) => {
   
    var data = await {
        images: {
            logo: 'https://public.easyinvoice.cloud/img/logo_en_original.png',
        },
        sender: {
            company: 'Inventory Corp',
            address: 'Nashik road ,Nashik',
            zip: '422101',
            city: 'Nashik',
            country: 'India'
        },
        client: {
            address: address,
            zip: address.split(" ")[2],
            city: address.split(" ")[1],
            country: 'India'
        },
        information: {
            number:Math.floor(1000 + Math.random() * 9000),
            date: createdAt.split('T')[0],
        },
        products: [
            {
                'quantity':products.map((e)=>e.quantity),
                'description':`${products.map((e)=>e.product)}`,
                'tax-rate': 2,
                'price':amount
            },
        ],
        
        settings: {
            currency: 'INR'
        }
    };
  
    const result = await easyinvoice.createInvoice(data);
          setInvoice(result.pdf);
          easyinvoice.download('myInvoice.pdf', result.pdf);
  }


  return(
    <div className="con">
     <table className="table table-hover table-responsive">
        <thead>
        <tr>
          <th>Order Id</th>
          <th>Products</th>
          <th>Quantity</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Invoice</th>
        </tr>
        </thead>
        <tbody>
        {orders.map((order) => (
          <tr  key={order._id}>
            <td>
              <span>{order._id}</span>
            </td>
            <td>
              {order.products.map((p,i)=>(
                  <span key={i}>{p.product}</span>
              ))}
            </td>
            <td>
              {order.products.map((p,i)=>(
                  <span key={i}>{p.quantity}</span>
              ))}
            </td>
            <td>{format(order.createdAt)}</td>
            <td>₹ {order.amount}</td>
            <td>
              <button className='btn btn-dark' onClick={()=>{
                console.log(order);
                let address =order.address;
                let amount = order.amount;
                let createdAt=order.createdAt;
                let name = order.name;
                let products = order.products;
                getSampleData(address,amount,createdAt,name,products);  
              }}>
                Generate
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bill;