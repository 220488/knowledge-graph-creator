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
        path: "/dashboard",
        element: <DashBoard/>,
        loader: async ({ request, params}) => {
            return fetch(
                ``,
            )
        }
    },
    {
        path: "/",
        element: <GraphEditor/>,
        loader: async ({ request, params}) => {
            return fetch(
                ``,
            )
        }
    },
])