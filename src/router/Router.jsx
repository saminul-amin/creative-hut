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
import Dashboard from "../layout/Dashboard";
import BuyerDashboard from "../pages/buyer/BuyerDashboard";
import PostJob from "../pages/buyer/PostJob";
import MyProjects from "../pages/buyer/MyProjects";
import FindFreelancer from "../pages/buyer/FindFreelancers";
import MyProfile from "../pages/freelancer/FreelancerProfile";
import BuyerProfile from "../pages/buyer/BuyerProfile";
import FreelancerProfile from "../pages/freelancer/FreelancerProfile";

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
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <BuyerDashboard />,
      },
      {
        path: "post-job",
        element: <PostJob />,
      },
      {
        path: "my-projects",
        element: <MyProjects />,
      },
      {
        path: "find-freelancer",
        element: <FindFreelancer />,
      },
      {
        path: "freelancer-profile",
        element: <FreelancerProfile />,
      },
      {
        path: "buyer-profile",
        element: <BuyerProfile />,
      },
    ],
  },
]);

export default router;
