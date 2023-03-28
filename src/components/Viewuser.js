import { useState,useEffect } from "react"; 
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import  "./view.css";

const Viewuser = () => {
  const {id} = useParams();
  const [user, setUser] = useState('');
  const token = useSelector((state) => state.token.value);
  useEffect(()=>{
    const load = async() =>{
      try{
        const res = await axios.get(`https://inventoryapp-s6ze.onrender.com/user/find/${id}`,{ headers: { authorization: token }});
        setUser(res.data);
      }catch(error){
        alert(error);
      }
    }
    load();
  },[id,token])

return(
 <div className='conn'>
  <div className='card'>
   <img  src={`${user.img}`} alt="img"  />
   <div className='info'>
     <span>Username {user.username}</span>
     <span>Email {user.email}</span>
     <span>User_ID {user._id}</span>
   </div>
  </div>
 </div>
);
}

export default Viewuser