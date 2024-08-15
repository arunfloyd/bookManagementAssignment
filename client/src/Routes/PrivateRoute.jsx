import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const userInfo = useSelector((state) => state.user.email);
  console.log(userInfo);
  return userInfo ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
