import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Flights from "../pages/Flights/Flights/Flights";

import Error from "../Error/Error";
import Contact from "../pages/Contact/Contact";
import Terms from "../pages/Terms/Terms";
import Refund from "../pages/Refund/Refund";
import Review from "../pages/Review/Review/Review";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminHome from "../Dashboard/Admin/AdminHome/AdminHome";
<<<<<<< HEAD
import ETicket from "../Components/Ticket/ETicket";
=======
import ManageUsers from "../Dashboard/Admin/ManageUsers/ManageUsers";
import Account from "../Dashboard/Account/Account";
>>>>>>> 6f5307d2f8f63125166b074caffd655ddeb6f5c1

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/flights",
        element: <Flights />,
      },
      {
        path: "/review/:id",
        element: <Review />,
      },

      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/refund",
        element: <Refund />,
      },
      {
        path: "/ticket",
        element: <ETicket />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "adminHome",
        element: <AdminHome />,
      },
      {
        path: "manageUsers",
        element: <ManageUsers />,
      },
      {
        path: "account",
        element: <Account />,
      }
    ],
  },
]);
