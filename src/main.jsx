import * as React from "react";
import { createRoot } from "react-dom/client";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Todo from "./pages/todo/Todo";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path : "/todo",
    element : <Todo />,
  },
  {
    path :"/",
    element :<div>Home page</div>
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);