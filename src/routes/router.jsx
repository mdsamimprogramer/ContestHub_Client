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
import ManagePayments from "../pages/Dashboard/Admin/ManagePayments";
import AdminRoute from "./AdminRoute";

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
                Component: AddContest
            },
            {
                path: 'my-contest',
                Component: MyContests
            },
            {
                path: 'contest-submissions/:id',
                Component: ContestSubmissions
            },
            {
                path: 'edit-contest/:id',
                Component: EditContest
            },
            {
                path: 'dashboard',
                Component:WinnerDeclare
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
            { path: "admin", element: <AdminDashboard />},
            { path: "admin/contests", element: <ManageContests /> },
            { path: "admin/users", element: <ManageUsers /> },
            { path: "admin/payments", element: <ManagePayments /> },


            // {
            //     path: 'payment-history',
            //     Component: PaymentHistory
            // },
            // {
            //     path: 'payment-success',
            //     Component: PaymentSuccess
            // },
            // {
            //     path: 'payment-cancel',
            //     Component: PaymentCancelled
            // },

            // {
            //     path: "users-management",
            //     element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
            // }
        ]
    },

]);