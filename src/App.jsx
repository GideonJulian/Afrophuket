import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import SingleTicket from "./pages/SingleTicket";
import Events from "./pages/Events";
import ContactUs from "./pages/ContactUs";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import SingleEvent from "./pages/Dashboard/SingleEvent";
import CreateEvent from "./pages/Dashboard/CreateEvent";
import CreateTicket from "./pages/Dashboard/CreateTicket";
import AuthPage from "./pages/Register";
import ProtectedRoute from "./utils/ProtectedRoute";

import { CreateEventProvider } from "./Context/CreateEventContext";
import Products from "./pages/Dashboard/Products";
import CreateProduct from "./pages/Dashboard/CreateProduct";
import SingleProduct from "./pages/Dashboard/SingleProduct";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <ContactUs /> },
      { path: "ticket/:id", element: <SingleTicket /> },
      { path: "event", element: <Events /> },
    ],
  },
  {
    path: "auth",
    element: <AuthPage />,
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "account", element: "Account" },
      {
        path: "shop",
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: "create-product",
            element: <CreateProduct />,
          },{
            path: 'product/:id',
            element: <SingleProduct />
          }
        ],
      },
      { path: "create-ticket", element: "Create-ticket" },
      { path: "event/:id", element: <SingleEvent /> },
      {
        path: "create-event",
        element: (
          <CreateEventProvider>
            <CreateEvent />
          </CreateEventProvider>
        ),
      },
      {
        path: "create-event/create-ticket",
        element: (
          <CreateEventProvider>
            <CreateTicket />
          </CreateEventProvider>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={route} />;
}

export default App;
