import React from "react";
import { Link,useNavigate} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from "@mui/icons-material/Logout";
import DescriptionIcon from "@mui/icons-material/Description";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import { setToken } from "../redux/tokenSlice";
import { setUser } from "../redux/userSlice";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Navbar = () => {

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate= useNavigate();

  const handleLogout = () => {
    console.log("logout");
    cookies.remove("token");
    dispatch(setToken(null));
    dispatch(setUser(null));
    console.log("before");
    navigate("/login");
    console.log("after");
  }

  return(
  <div className='container'>
  <nav className="navbar navbar-light bg-primary text-light fixed-top">
    <div className="container-fluid">
      <Link className="navbar-brand text-light" to="/">
        Inventory
      </Link>
       {user?(`👋 Welcome ${user?.name} 🙂`):""}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="offcanvas offcanvas-end"
        // tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header bg-primary">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            Services
          </h5>
          <button
            type="button"
            className="btn-close text-reset btn-primary"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body bg-primary ">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/dashboard">
               <IconButton title="Dashboard">
                <DashboardIcon color="dark" />
                </IconButton>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/products">
               <IconButton title="Product">
                <InventoryIcon color="light" />
                </IconButton>
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/cart">
               <IconButton title="Cart">
                <ShoppingCartIcon color="dark" />
                </IconButton>
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to='/bill'>
               <IconButton title="Bill">
                <DescriptionIcon color="light" title="Bill" />
                </IconButton>
                Bill
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to='/invoice'>
               <IconButton title="Invoice">
                <DescriptionIcon color="dark" title="Invoice" />
                </IconButton>
                Invoice
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/addstock">
              <IconButton  title='ADD-stock'>
              <AddBoxIcon color="light"  />
              </IconButton>
                Add Stock
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="#" onClick={handleLogout}>
              <IconButton  title='Logout' onClick={handleLogout}>
              <LogoutIcon color='dark' />
              </IconButton>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</div>
  );
};

export default Navbar;
