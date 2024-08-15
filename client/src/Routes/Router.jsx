import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../components/admin/Dashboard";
import Language from "../components/admin/Language";
import Author from "../components/admin/Author";
import Book from "../components/admin/Book";
import Login from "../components/admin/Login";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../components/NotFound";
import VerifyOtp from "../components/admin/VerifyOtp";
import NewPassword from "../components/admin/NewPassword";
import Home from "../components/user/Home";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verifyOtp",
    element: <VerifyOtp />,
  },
  {
    path: "/newPassword",
    element: <NewPassword />,
  },

  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/language",
        element: <Language />,
      },
      {
        path: "/author",
        element: <Author />,
      },
      {
        path: "/book",
        element: <Book />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function Router() {
  return <RouterProvider router={appRouter} />;
}

export default Router;
