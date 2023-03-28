import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post("https://inventoryapp-s6ze.onrender.com/api/auth/register", user);
      if (res.data === "User created sucessfully") {
        toast.success("User created sucessfully");
      }
    } catch (error) {
      if (error.message === "Request failed with status code 409") {
        toast.error("Username already Exist");
      } else {
        toast.error(error.message);
      }
    }
    navigate("/login");
  };

  return (
    <div className="con">
        <div className="box m-3 p-5">
          <h1 className='d-flex justify-content-center'>Sign Up</h1>
          <form onSubmit={handleRegister}>
            <div className='d-flex justify-content-center align-items-center flex-column'>
            <div className="from-group">
              <input
                className="form-control m-2 p-2"
                type="text"
                required
                autoComplete="off"
                placeholder="username"
                name="username"
                value={user.username}
                onChange={handleValue}
              />
            </div>
            <div className="from-group ">
              <input
                className="form-control m-2 p-2"
                type="email"
                required
                placeholder="email"
                name="email"
                value={user.email}
                onChange={handleValue}
              />
            </div>
            <div className="from-group ">
              <input
                className="form-control m-2 p-2"
                type="password"
                required
                placeholder="password"
                name="password"
                value={user.password}
                onChange={handleValue}
              />
            </div>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-column">
              <button className='btn btn-primary m-2' type="submit">Register</button>
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
    </div>
  );
};

export default Register;
