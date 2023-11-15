import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './routing.jsx'
import './index.css'
import AuthProvider from './auth/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Routing />
    </AuthProvider>
  </React.StrictMode>
)
