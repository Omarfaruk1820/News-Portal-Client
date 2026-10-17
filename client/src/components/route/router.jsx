import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/Layout";
import Home from "../Home/Home";
import NotFound from "../page/NotFound";
import Login from "../auth/Login";
import Register from "../auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
