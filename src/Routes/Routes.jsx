import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../pages/Home/Home";
import AvailableCamp from "../pages/AvailableCamp/AvailableCamp";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: 'availableCamp',
                element: <AvailableCamp></AvailableCamp>
            }
        ]
    },
]);

export default router;