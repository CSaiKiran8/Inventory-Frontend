import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./widgetLg.css";
import {format} from "timeago.js";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.token.value);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get("https://inventoryapp-s6ze.onrender.com/orders",{ headers: { authorization: token }});
        setOrders(res.data);
        console.log(res.data)
      } catch {}
    };
    getOrders();
  }, [token]);
  
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="table table-hover table-responsive">
        <thead>
        <tr>
          <th className="widgetLgTh">Customer Id</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
        </tr>
        </thead>
        <tbody>
        {orders.map((order) => (
          <tr  key={order._id}>
            <td>
              <span>{order.userId}</span>
            </td>
            <td>{format(order.createdAt)}</td>
            <td>₹ {order.amount}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}