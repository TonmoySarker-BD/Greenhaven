import { createBrowserRouter } from "react-router";
import HomeLayout from "./components/layouts/HomeLayout";
import Home from "./components/pages/Home/Home";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import ForgetPassword from "./components/pages/Auth/ForgetPassword";
import Profile from "./components/pages/Profile/Profile";
import UpdateProfile from "./components/pages/Profile/UpdateProfile";
import ExploreGardeners from "./components/pages/explore/ExploreGardeners ";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/explore",
                Component: ExploreGardeners,
            },
            {
                path: "/tips",
                Component: Home,
            },
            {
                path: "/Profile",
                Component: Profile,
            },
            {
                path: "/update-profile",
                Component: UpdateProfile,
            },
        ],
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                index: true,
                Component: Login,
            },
            {
                path: "login",
                Component: Login,
            },
            {
                path: "register",
                Component: Register,
            },
            {
                path: "forgot-password",
                Component: ForgetPassword,
            },
        ],
    },
]);
