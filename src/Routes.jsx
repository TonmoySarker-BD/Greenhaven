import { createBrowserRouter } from "react-router";
import HomeLayout from "./components/layouts/HomeLayout";
import Home from "./components/pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children:[
            {
                index: true,
                Component:Home
            }
        ]
    },
]);