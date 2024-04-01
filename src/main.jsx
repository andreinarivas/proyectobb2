import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import RecipePage from './pages/RecipePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ProtectedRoute from './components/Protected/ProtectedRoute.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
       <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute> }/>
       <Route path="/login" element={<LoginPage/>}/>
       <Route path="/register" element={<RegisterPage/>}/>
       <Route path="/search" element={<ProtectedRoute><SearchPage/></ProtectedRoute>}/>
       <Route path="/recipe" element={<ProtectedRoute><RecipePage/></ProtectedRoute>}/>
       <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
      </Route>

    </Routes>

    </BrowserRouter>
  </React.StrictMode>,
)
