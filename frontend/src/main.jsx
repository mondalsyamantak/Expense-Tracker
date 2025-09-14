import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/site/App.jsx'

import { createBrowserRouter, Router, RouterProvider } from 'react-router'
import LoginPage from './pages/auth/login.jsx'
import SignUpPage from './pages/auth/signup.jsx'
import Home from './pages/Home.jsx'
// import { SignUpPage } from './pages/auth/signup.jsx'
// import { LoginForm } from './components/login-form.jsx'

const router = createBrowserRouter ([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: '/app',
    element: <App/>
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/signup',
    element: <SignUpPage/>
  }
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <RouterProvider router={router} />,
  // </StrictMode>,  =====> do this before final deployment
  <RouterProvider router={router}/>
)
