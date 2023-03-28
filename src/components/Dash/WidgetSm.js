import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import {useSelector} from 'react-redux';

export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.token.value);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("https://inventoryapp-s6ze.onrender.com/user/?new=true",{ headers: { authorization: token }});
        setUsers(res.data);
      } catch {}
    };
    getUsers();
  }, [token]);
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Link to={`/users/view/${user._id}`}>
              <Visibility className="widgetSmIcon"/>
              </Link>
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}