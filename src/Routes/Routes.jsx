import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../pages/Home/Home";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import CampDetails from "../pages/CampDetails/CampDetails";
import JoinUs from "../pages/JoinUs/JoinUs";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
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
                element: <PrivateRoute><CampDetails></CampDetails></PrivateRoute>
            },
            {
                path: 'join-now',
                element: <JoinUs></JoinUs>
            },
            {
                path: 'login',
                element: <Login></Login>
            }
        ]
    },
]);

export default router;