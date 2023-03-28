import Chart from "./Chart";
import FeaturedInfo from "./FeaturedInfo";
import WidgetSm from "./WidgetSm";
import WidgetLg from "./WidgetLg";
import { useEffect, useMemo, useState } from "react";
import {useSelector} from 'react-redux';
import axios from "axios";

const Dashboard = () => {

  const [sales, setSales] = useState([]);
  const token = useSelector((state) => state.token.value);
  const MONTHS = useMemo(
    () => [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "Jun",
      "July",
      "Agust",
      "September",
      "Octomber",
      "November",
      "December",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("https://inventoryapp-s6ze.onrender.com/orders/income",{ headers: { authorization: token }});
        res.data.map((item) =>
          setSales((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch {}
    };
    getStats();
  },[MONTHS,token]);

 return(
  <div className="d-flex m-5 flex-column">
  <FeaturedInfo />
  <Chart data={sales} title="Sales Analytics" dataKey="Sales" />
  <div className="homeWidgets">
    <WidgetSm />
    <WidgetLg />
  </div>
</div>
 ); 
}

export default Dashboard;