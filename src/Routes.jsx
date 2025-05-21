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
import NotFoundPage from "./components/pages/NotFoundPage";
import ShareTip from "./components/pages/Tips/ShareTip";
import MyTips from "./components/pages/Tips/MyTips";
import UpdateTip from "./components/pages/Tips/UpdateTip";
import PrivateRoute from "./Provider/PrivateRoute";

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
                element: <PrivateRoute>
                    <TipDetailsPage></TipDetailsPage>
                </PrivateRoute>
            },
            {
                path: '/share-tip',
                element:<PrivateRoute>
                    <ShareTip></ShareTip>
                </PrivateRoute>,
            },
            {
                path: '/my-tips',
                element:<PrivateRoute>
                    <MyTips></MyTips>
                </PrivateRoute>,
            },
            {
                path: '/update-tip/:id',
                element:<PrivateRoute>
                    <UpdateTip></UpdateTip>
                </PrivateRoute>,
            },
            {
                path: "/Profile",
                element:<PrivateRoute>
                    <Profile></Profile>
                </PrivateRoute>,
            },
            {
                path: "/update-profile",
                element:<PrivateRoute>
                    <UpdateProfile></UpdateProfile>
                </PrivateRoute>,
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
    {
        path: '*',
        Component: NotFoundPage
    },
]);
