import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <SignIn />,
      },
    ],
  },
]);

export default router;
