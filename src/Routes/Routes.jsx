import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../pages/Home/Home";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import CampDetails from "../pages/CampDetails/CampDetails";
import JoinUs from "../pages/JoinUs/JoinUs";


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
                path: "availableCamp",
                element: <AvailableCamps></AvailableCamps>
            },
            {
                path: "camps/:id",
                element: <CampDetails></CampDetails>
            },
            {
                path: 'join-now',
                element: <JoinUs></JoinUs>
            }
        ]
    },
]);

export default router;