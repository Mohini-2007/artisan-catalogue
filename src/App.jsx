
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Login from './pages/Login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Upload from './pages/upload'
import Catalogue from './pages/Catalogue'
import ProductDetails from './pages/ProductDetails'

function ProtectedPage({ children, allowedRole }) {
  const role = localStorage.getItem('userRole')

  if (!role) {
    return <Navigate to="/login" replace />
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to={role === 'artisan' ? '/upload' : '/home'} replace />
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/home"
        element={
          <ProtectedPage allowedRole="customer">
            <Home />
          </ProtectedPage>
        }
      />

      <Route
        path="/catalogue"
        element={
          <ProtectedPage allowedRole="customer">
            <Catalogue />
          </ProtectedPage>
        }
      />

      <Route
        path="/product/:id"
        element={
          <ProtectedPage allowedRole="customer">
            <ProductDetails />
          </ProtectedPage>
        }
      />

      <Route
        path="/upload"
        element={
          <ProtectedPage allowedRole="artisan">
            <Upload />
          </ProtectedPage>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App