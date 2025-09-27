import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/site/App.jsx'

import { createBrowserRouter, Router, RouterProvider } from 'react-router'
import LoginPage from './pages/auth/login.jsx'
import SignUpPage from './pages/auth/signup.jsx'
import Home from './pages/home/Home.jsx'
import Profile from './pages/site/routes/Profile'
import Dashboard from './pages/site/routes/Dashboard'
import Transactions from './pages/site/routes/Transactions'
import { ThemeProvider } from './globalProviders/ThemeProvider'
import OAuth2RedirectHandler from './pages/auth/OAuth2RedirectHandler/OAuth2RedirectHandler'
import Budgets from './pages/site/routes/Budgets'
// import { SignUpPage } from './pages/auth/signup.jsx'
// import { LoginForm } from './components/login-form.jsx'

const router = createBrowserRouter ([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: '/app',
    element: <App/>,
    children: [
      {
        path: '',
        element: <Dashboard/>
      },
      {
        path: 'profile',
        element: <Profile/>
      },
      {
        path: 'transactions',
        element: <Transactions/>
      },
      {
        path: 'budgets',
        element: <Budgets/>
      }
      
    ]
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: 'oauth2/redirect',
    element: <OAuth2RedirectHandler/>
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
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" storageKey2='vite-ui-accent'>
    <RouterProvider router={router}/>
  </ThemeProvider>
  
)
