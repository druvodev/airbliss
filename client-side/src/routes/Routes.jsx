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
import UserHome from "../Dashboard/User/UserHome/UserHome";
import PrivateRoute from "./PrivateRoute";
import TicketHistory from "../Dashboard/User/TicketHistory/TicketHistory";
import ManageBooking from "../Dashboard/User/ManageBooking/ManageBooking";
import HotDealDetails from "../pages/Home/HotDeals/HotDealDetails";

// const selector = useSelector(state =>console.log(state))
// const userType = "admin";

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
      {
        path: "hotDeals/:id",
        element: <HotDealDetails></HotDealDetails>  
      }
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
        path: "userHome",
        element: <UserHome />,
      },

      {
        path: "booking",
        element: <ManageBooking />,
      },

      {
        path: "ticketHistory/:bookingReference",
        element: <TicketHistory />,
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
        element: <FlightStatus />,
      },
    ],
  },
]);
