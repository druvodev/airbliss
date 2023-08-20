import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Flights from "../pages/Flights/Flights/Flights";

import Error from "../Error/Error";
import Contact from "../pages/Contact/Contact";
import Terms from "../pages/Terms/Terms";
import Refund from "../pages/Refund/Refund";
import Review from "../pages/Review/Review/Review";

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
        path: "/review",
        element: <Review />,
      },

      {
        path: "/contact",
        element: <Contact></Contact>,
      },
<<<<<<< HEAD
=======

      {
        path: "/terms",
        element: <Terms></Terms>,
      },
      {
        path: "/refund",
        element: <Refund></Refund>,
      },
>>>>>>> a2edf955e369b00e82140012bad4405b40cb206e
    ],
  },
]);
