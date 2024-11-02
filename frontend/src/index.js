import React from 'react';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './App';
import {LoginPage} from "./pages/Auth/LoginPage";
import {SignUpPage} from "./pages/Auth/SignUpPage";
import {LogIn} from "./pages/Auth/LogIn";
import {AddCard} from "./pages/AddPages/AddCard";
import {AddAddress} from "./pages/AddPages/AddAddress";
import {AddBook} from "./pages/AddPages/AddBook";
import {Main} from "./pages/Main";
import {RecoilRoot} from "recoil";
import {DetailPage} from "./pages/DetailPage";
import {CartPage} from "./pages/CartPage";
import {OrderPage} from "./pages/Auth/OrderPage";
import {MyPage} from "./pages/MyPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LogIn/>,
        children: [
            {path: "", element: <Navigate to="login" replace/>},
            {path: "login", element: <LoginPage/>},
            {path: "signup", element: <SignUpPage/>}
        ]
    },
    {
        path: "/Main",
        element: <App/>,
        children: [
            {path: "addcard", element: <AddCard/>},
            {path: "addAddress", element: <AddAddress/>},
            {path: "addBook", element: <AddBook/>},
            {path: "main", element: <Main/>},
            {path: "detail", element: <DetailPage/>},
            {path: "cart", element: <CartPage/>},
            {path: "order", element: <OrderPage/>},
            {path: "myPage", element: <MyPage/>}
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RecoilRoot> {/* RecoilRoot는 RouterProvider 위에 위치해야 함 */}
        <RouterProvider router={router}/>
    </RecoilRoot>
);
