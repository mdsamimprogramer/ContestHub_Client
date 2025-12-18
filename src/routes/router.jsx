import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AuthLayout from "../layouts/AuthLayout";
import AllContests from "../pages/AllContests/AllContests";
import ExtraSection from "../pages/Home/ExtraSection";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyContests from "../pages/Dashboard/Creator/MyContests";
import AddContest from "../pages/Dashboard/Creator/AddContest";
import ContestSubmissions from "../pages/Dashboard/Creator/ContestSubmissions";
import EditContest from "../pages/Dashboard/Creator/EditContest";
import MyParticipated from "../pages/Dashboard/User/MyParticipated";
import MyWinning from "../pages/Dashboard/User/MyWinning";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import PaymentPage from "../pages/Payment/Payment";
import Payment from "../pages/Payment/Payment";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import ParticipatedContests from "../pages/Dashboard/User/MyParticipated";
import MyWinningContests from "../pages/Dashboard/User/MyWinning";
import WinnerDeclare from "../pages/Dashboard/Creator/WinnerDeclare";
import AdminDashboard from "../pages/Dashboard/Admin/AdminHome";
import ManageContests from "../pages/Dashboard/Admin/ManageContests";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdminRoute from "./AdminRoute";
import CreatorRoute from "./CreatorRoute";
import SupportSettings from "../components/SupportSettings";
import Contact from "../pages/ExtraPages/Contact";
import Leaderboard from "../pages/Leaderboard/Leaderboard";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'all-contests',
                Component: AllContests
            },
            {
                path: 'extra-section',
                Component: ExtraSection
            },
            {
                path: 'contact',
                Component: Contact
            },
            {
                path: 'top-win',
                Component: Leaderboard
            },
            {
                path: "/contest/:id",
                element: <PrivateRoute><ContestDetails /></PrivateRoute>
            },
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            // creator routes
            {
                path: 'add-contest',
                element: <CreatorRoute><AddContest></AddContest></CreatorRoute>
            },
            {
                path: 'my-contest',
                element: <CreatorRoute><MyContests></MyContests></CreatorRoute>
            },
            {
                path: 'contest-submissions/:id',
                element: <CreatorRoute><ContestSubmissions></ContestSubmissions></CreatorRoute>
            },
            {
                path: 'edit-contest/:id',
                element: <CreatorRoute><EditContest></EditContest></CreatorRoute>
            },
            {
                path: 'dashboard',
                element: <CreatorRoute><WinnerDeclare></WinnerDeclare></CreatorRoute>,
            },

            // user routes
            {
                path: 'participated',
                Component: ParticipatedContests
            },
            {
                path: 'winning',
                Component: MyWinningContests
            },
            {
                path: 'profile',
                Component: MyProfile
            },

            {
                path: 'payment/:contestId',
                Component: Payment,
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },

            // admin routes
            {
                path: "admin",
                element: <AdminRoute><AdminDashboard /></AdminRoute>
            },
            {
                path: "admin/contests",
                element: <AdminRoute><ManageContests /></AdminRoute>
            },
            {
                path: "admin/users",
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
        
            {
                path: 'support-settings',
                Component: SupportSettings
            }

        ]
    },

]);