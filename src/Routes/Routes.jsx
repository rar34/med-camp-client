import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../pages/Home/Home";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import CampDetails from "../pages/CampDetails/CampDetails";
import JoinUs from "../pages/JoinUs/JoinUs";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Dashboard from "../Layout/Dashboard";
import OrganizerProfile from "../pages/Dashboard/OrganizerProfile/OrganizerProfile";
import AddCamp from "../pages/Dashboard/OrganizerProfile/AddCamp";
import AdminRoute from "./AdminRoute";
import ManageCamps from "../pages/Dashboard/OrganizerProfile/ManageCamps";
import UpdateCamp from "../pages/Dashboard/OrganizerProfile/UpdateCamp";


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
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path:'organizer-profile',
                element: <AdminRoute><OrganizerProfile></OrganizerProfile></AdminRoute>
            },
            {
                path: 'add-camp',
                element:<AdminRoute><AddCamp></AddCamp></AdminRoute>
            },
            {
                path: 'manage-camps',
                element: <AdminRoute><ManageCamps /></AdminRoute>
            },
            {
                path: 'update-camp/:campId',
                element: <AdminRoute><UpdateCamp /></AdminRoute>
            }
        ]
    }
]);

export default router;