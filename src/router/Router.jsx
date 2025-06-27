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
import BuyerProfile from "../pages/buyer/BuyerProfile";
import FreelancerProfile from "../pages/freelancer/FreelancerProfile";
import FreelancerDashboard from "../pages/freelancer/FreelancerDashboard";
import MyGigs from "../pages/freelancer/MyGigs";
import BrowseJobs from "../pages/freelancer/BrowseJobs";
import SubmissionPage from "../pages/freelancer/SubmissionPage";
import MySkills from "../pages/freelancer/MySkills";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import AllProjects from "../pages/admin/AllProjects";
import PayoutRequests from "../pages/admin/PayoutRequests";
import NewGig from "../pages/freelancer/NewGig";
import Courses from "../pages/Courses";

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
        path: "courses",
        element: <Courses />,
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
    path: "buyer",
    element: <Dashboard />,
    children: [
      {
        path: "dashboard",
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
        path: "profile",
        element: <BuyerProfile />,
      },
    ],
  },
  {
    path: "freelancer",
    element: <Dashboard />,
    children: [
      {
        path: "dashboard",
        element: <FreelancerDashboard />,
      },
      {
        path: "my-gigs",
        element: <MyGigs />,
      },
      {
        path: "new-gig",
        element: <NewGig />,
      },
      {
        path: "my-skills",
        element: <MySkills />,
      },
      {
        path: "browse-jobs",
        element: <BrowseJobs />,
      },
      {
        path: "profile",
        element: <FreelancerProfile />,
      },
      {
        path: "proposal-submission",
        element: <SubmissionPage />,
      },
    ],
  },
  {
    path: "admin",
    element: <Dashboard />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "all-projects",
        element: <AllProjects />,
      },
      {
        path: "payout-requests",
        element: <PayoutRequests />,
      },
    ],
  },
]);

export default router;
