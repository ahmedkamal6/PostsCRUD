import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout";
import Add from "./Pages/Add";
import Edit from "./Pages/Edit";
import Details from "./Pages/Details";
import Index from "./Pages/Index";
import Error from "./Pages/Error";
import store from "./Redux/store";
import { Provider } from "react-redux";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Index /> },
      { path: "post", element: <Index /> },
      { path: "post/add", element: <Add /> },
      {
        path: "post/:id",
        element: <Details />
      },
      { path: "post/:id/edit", element: <Edit /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
