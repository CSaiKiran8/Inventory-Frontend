import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import axios from "axios";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const token = useSelector((state) => state.token.value);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await axios.get("https://inventoryapp-s6ze.onrender.com/orders/income",{ headers: { authorization: token }});
        console.log(res.data.length)
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, [token]);

  return (
    <div className="d-flex justify-content-between flex-wrap m-2">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="d-flex justify-content-center p-1">
          <span className="featuredMoney">₹{income[1]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          {/* <span className="featuredMoney">{Math.floor(perc)}</span> */}
          <span className="featuredMoneyRate">
          %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}