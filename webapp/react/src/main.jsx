import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.jsx'
import ImageEditor from './ImageEditor.jsx'
import AttentionMap from "./AttentionMap.jsx";
import Results from "./Results.jsx";
import UsabilityStudy from "./UsabilityStudy.jsx";
import UserManual from "./UserManual.jsx";
import StHeader from "./components/common/StHeader.jsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './main.css'

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/image-editor",
    element: <ImageEditor/>
  },
  {
    path: "/attention-map",
    element: <AttentionMap/>
  },
  {
    path: "/results",
    element: <Results/>
  },
  {
    path: "/usability-study",
    element: <UsabilityStudy/>
  },
  {
    path: "/user-manual",
    element: <UserManual/>
  },
  {
    path: "/st-header",
    element: <StHeader/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
