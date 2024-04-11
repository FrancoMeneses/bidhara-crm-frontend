import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { ErpProvider } from './context/ERPContext.jsx'

const HeaderLayout = () => {
  return (
    <ErpProvider>
      <Outlet />
    </ErpProvider>
  )
}

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])

function App () {
  return (
    <RouterProvider router={router} />
  )
}

export default App
