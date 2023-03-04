import React from "react"
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom"
import DashBoard from "../views/dashboard"
import DragSVG from "../views/drag"
import GraphEditor from "../views/graph-editor"

const router = createBrowserRouter([
    {
        path: "/",
        element: <DashBoard/>,
    },
    {
        path: "/graph",
        element: <GraphEditor/>,
    },
    {
        path: "/drag",
        element: <DragSVG/>,
    }
])