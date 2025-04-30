import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import FAQPage from "../pages/FAQPage";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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
      {
        path: "faq",
        element: <FAQPage />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
    ],
  },
]);

export default router;
