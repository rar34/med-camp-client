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
import UpdateOrganizerProfile from "../pages/Dashboard/OrganizerProfile/UpdateOrganizerProfile";
import ManageRegCamp from "../pages/Dashboard/OrganizerProfile/ManageRegCamp";
import Analytics from "../pages/Dashboard/ParticipantProfile/Analytics";
import ParticipantProfile from "../pages/Dashboard/ParticipantProfile/ParticipantProfile";
import UpdateParticipantProfile from "../pages/Dashboard/ParticipantProfile/UpdateParticipantProfile";


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
                path: 'update-organizer-profile',
                element: <AdminRoute><UpdateOrganizerProfile /></AdminRoute>
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
            },
            {
                path: 'manage-reg-camp',
                element: <AdminRoute><ManageRegCamp /></AdminRoute>
            },
            // participant user related
            {
                path: 'analytics',
                element: <PrivateRoute><Analytics /></PrivateRoute>
            },
            {
                path: 'participant-profile',
                element: <ParticipantProfile></ParticipantProfile>
            },
            {
                path: 'update-participant-profile',
                element: <UpdateParticipantProfile></UpdateParticipantProfile>
            }
        ]
    }
]);

export default router;