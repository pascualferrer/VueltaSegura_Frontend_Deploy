import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import HowItWorks from './HowItWorks.jsx'
import Routing from './routing.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
)
