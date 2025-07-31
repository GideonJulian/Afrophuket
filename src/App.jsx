
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Home from "./pages/Home";
import Shop from "./pages/Shop";

const route = createBrowserRouter([
{
    path: '/',
    element: <Layouts />,
    children: [
        {
            index: true,
            element: <Home />
        },{
            path: 'shop',
            element: <Shop />
        }
    ]
}
])

function App(){
    return <RouterProvider router={route} />
}
export default App 