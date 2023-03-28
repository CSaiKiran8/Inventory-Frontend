import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import AddStock from "./components/AddStock";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Product from "./components/Product";
import EditProduct from "./components/EditProduct";
import Viewuser from "./components/Viewuser";
import Cart from "./components/Cart";
import Dashboard from "./components/Dash/Dashboard";
import RequireAdmin from "./components/RequireAdmin";
import Unauthorized from "./components/Unauthorized";
import Bill from "./components/Bill";
import Invoice from "./components/Invoice";
import { ToastContainer } from "react-toastify";

const App = () => {
  const token = useSelector((state) => state.token.value);

  return (
    <Router>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {/* Authorized Routes */}
        <Route element={<RequireAdmin />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addstock" element={<AddStock />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/users/view/:id" element={<Viewuser />} />
          <Route path="/invoice" element={<Invoice />} />
        </Route>

        {/* Authenticated  Routes */}
        <Route path="/cart" element={token ? <Cart /> : <Login />} />
        <Route path="/bill" element={token ? <Bill /> : <Login />} />
        <Route path="/products" element={token ? <Products /> : <Login />} />
        <Route path="/product/:id" element={token ? <Product /> : <Login />} />
        <Route path="/" element={token ? <Home /> : <Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Unauthenticated Routes */}
        <Route
          path="/login"
          element={token ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate replace to="/" /> : <Register />}
        />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </Router>
  );
};

export default App;
