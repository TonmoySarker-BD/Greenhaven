import { createBrowserRouter } from "react-router";
import HomeLayout from "./components/layouts/HomeLayout";
import Home from "./components/pages/Home/Home";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import ForgetPassword from "./components/pages/Auth/ForgetPassword";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            {
                index: true,
                Component: Home,
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
