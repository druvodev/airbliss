import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Flights from "../pages/Flights/Flights/Flights";
import Review from "../pages/Review/Review/Review";
import Contact from "../pages/Contact/Contact";
import Terms from "../pages/Terms/Terms";
import Refund from "../pages/Refund/Refund";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
        path: "/review",
        element: <Review />,
      },
      {
        path: "/contact",
        element: <Contact></Contact>

      },
      {
        path: "/terms",
        element: <Terms></Terms>
      },
      {
        path: "/refund",
        element: <Refund></Refund>
      }
      
    ],
  }
]);
