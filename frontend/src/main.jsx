import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'

import StudentContext from './context/StudentContext.jsx'


createRoot(document.getElementById('root')).render(
  //<StrictMode>
      <BrowserRouter>
    <StudentContext >
        <App />
    </StudentContext>
      </BrowserRouter>
  //</StrictMode>
)

