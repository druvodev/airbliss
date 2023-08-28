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
import AddFlight from "../Dashboard/Admin/AddFlights/AddFlight/AddFlight";
import ETicket from "../Components/Ticket/ETicket";
import ManageUsers from "../Dashboard/Admin/ManageUsers/ManageUsers";
import Account from "../Dashboard/Account/Account";
import FlightStatus from "../Dashboard/FlightStatus/FlightStatus";

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
        path: "/booking-confirmed/:bookingId",
        element: <ETicket />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <AdminHome />,
      },

      {
        path: "adminHome",
        element: <AdminHome />,
      },

      {
        path: "addFlight",
        element: <AddFlight />,
      },
      {
        path: "manageUsers",
        element: <ManageUsers />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "flightStatus",
        element: <FlightStatus></FlightStatus>,
      },
    ],
  },
]);
