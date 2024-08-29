import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './App';
import {LoginPage} from "./pages/Auth/LoginPage";
import {SignUpPage} from "./pages/Auth/SignUpPage";
import {LogIn} from "./pages/Auth/LogIn";
import {AddCard} from "./pages/AddPages/AddCard";
import {AddAddress} from "./pages/AddPages/AddAddress";
import {AddBook} from "./pages/AddPages/AddBook";
import {Main} from "./pages/Main";

const router = createBrowserRouter([{
    path: "/", element: <LogIn/>, children: [{
        path: "login", element: <LoginPage/>
    }, {
        path: "signup", element: <SignUpPage/>
    }]
}, {
    path: "/Main", element: <App/>, children: [{
        path: "addcard", element: <AddCard/>
    }, {
        path: "addAddress", element: <AddAddress/>
    }, {
        path: "addBook", element: <AddBook/>

    },{
        path:"main",element: <Main/>
    }]
}]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode><RouterProvider router={router}/></React.StrictMode>);
