import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import SingleTicket from "./pages/SingleTicket";
import Events from "./pages/Events";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./Slice/cartSlice";
import CheckLayout from "./layouts/CheckLayout";
import CheckoutTickets from "./pages/CheckoutTickets";
import ContactUs from "./pages/ContactUs";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import SingleEvent from "./pages/Dashboard/SingleEvent";
import CreateEvent from "./pages/Dashboard/CreateEvent";


const route = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "ticket/:id",
        element: <SingleTicket />,
      },
      {
        path: "event",
        element: <Events />,
      },
    ],
  },
  // {
  //   path: "checkout",
  //   element: <CheckLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <CheckoutTickets />,
  //     },{
  //       path: 'payment', 
  //     element: <Payment />
  //     }
  //   ],
  // },
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },{
        path: 'account',
        element: 'Accont'
      },
      {
        path: 'event/:id',
        element: <SingleEvent />
      }, {
        path: 'create-event',
        element: <CreateEvent />
      }
    ]
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
