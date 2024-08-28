import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './App';
import { LoginPage } from "./pages/Auth/LoginPage";
import { SignUpPage } from "./pages/Auth/SignUpPage";
import { LogIn } from "./pages/Auth/LogIn";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LogIn />,
        children: [
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "signup",
                element: <SignUpPage />
            }
        ]
    },
    {
        path: "/Main",
        element: <App />,
        children: [
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "signup",
                element: <SignUpPage />
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode><RouterProvider router={router} /></React.StrictMode>);
