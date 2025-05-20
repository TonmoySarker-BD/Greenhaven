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
import Tips from "./components/pages/Tips/Tips";
import TipDetailsPage from "./components/pages/Tips/TipDetailsPage";

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
                Component: Tips,
            },
            {
                path: '/tips/:id',
                Component: TipDetailsPage,
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
