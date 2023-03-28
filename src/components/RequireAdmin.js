import { useLocation, Navigate, Outlet } from "react-router-dom";
import {useSelector} from 'react-redux';

const RequireAdmin = () => {
  
  const location = useLocation();
  const user = useSelector((state) => state.user.value);

  return user?.isAdmin? (
    <Outlet />
  ) :  (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) 
};

export default RequireAdmin;