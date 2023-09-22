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
import HotelDetails from "../pages/Home/HotelDiscount/HotelDetails";
import AdminRoute from "./AdminRoute";
import ManageAllBookings from "../Dashboard/Admin/ManageAllBookings/ManageAllBookings";
import UserInsurance from "../Dashboard/User/UserInsurance/UserInsurance";
import AdminInsurance from "../Dashboard/Admin/AdminInsurance/AdminInsurance";
import RecommendedHotelDetails from "../pages/Home/RecommendedFlight/RecommendedHotelDetails";
import InsurancePolicy from "../pages/InsurancePolicy/InsurancePolicy";
import ServicesDetails from "../pages/ServicesDetails/ServicesDetails";
import ApplyReschedule from "../Dashboard/User/ApplyReschedule/ApplyReschedule";
import FlightDetails from "../Dashboard/FlightStatus/FlightDetails/FlightDetails";
import Reschedule from "../Dashboard/Admin/Reschedule/Reschedule";
import AboutUs from "../pages/AboutUs/AboutUs";
import LoginSignupModal from "../LogIn/LoginSignupModal";

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
        element: (
          <PrivateRoute>
            <Review />
          </PrivateRoute>
        ),
      },

      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <AboutUs />,
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
        element: (
          <PrivateRoute>
            <ETicket />
          </PrivateRoute>
        ),
      },
      {
        path: "hotDeals/:id",
        element: <HotDealDetails></HotDealDetails>,
      },
      {
        path: "hotelDetails/:id",
        element: <HotelDetails></HotelDetails>,
      },
      {
        path: "recommendedFlight/:id",
        element: <RecommendedHotelDetails></RecommendedHotelDetails>,
      },
      {
        path: "/insurance-policy",
        element: <InsurancePolicy />,
      },
      {
        path: "service/:id",
        element: <ServicesDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
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
        element: (
          <PrivateRoute>
            <TicketHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "addFlight",
        element: (
          <AdminRoute>
            <AddFlight />
          </AdminRoute>
        ),
      },
      {
        path: "managebookings",
        element: (
          <AdminRoute>
            <ManageAllBookings />
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "flightStatus",
        element: (
          <AdminRoute>
            <FlightStatus />
          </AdminRoute>
        ),
      },
      {
        path: "userInsurance",
        element: <UserInsurance />,
      },
      {
        path: "insurance",
        element: (
          <AdminRoute>
            <AdminInsurance />
          </AdminRoute>
        ),
      },
      {
        path: "applyReschedule",
        element: <ApplyReschedule />,
      },
      {
        path: "flightDetails/:airportCode/:_id/:id",
        element: (
          <AdminRoute>
            <FlightDetails />
          </AdminRoute>
        ),
      },
      {
        path: "reschedule",
        element: (
          <AdminRoute>
            <Reschedule />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <LoginSignupModal></LoginSignupModal>,
  },
]);
