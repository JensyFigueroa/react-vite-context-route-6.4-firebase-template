import React from 'react'
import ReactDOM from 'react-dom/client'

import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import UserProvider from './context/UserContext'

/* Fuentes */
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import './index.css'

import { CssBaseline } from "@mui/material";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
