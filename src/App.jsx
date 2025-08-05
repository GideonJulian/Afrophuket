import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import SingleTicket from "./pages/SingleTicket";
import Events from "./pages/Events";
import ScrollToTop from "./components/ScrollToTop";

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
        path: "ticket/:id",
        element: <SingleTicket />,
      },
      {
        path: "event",
        element: <Events />,
      },
    ],
  },
]);

function App() {
  return (
    <>
    {/* <ScrollToTop/> */}
      <RouterProvider router={route} />
    </>
  );
}
export default App;
