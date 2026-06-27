import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.jsx'

import AOS from 'aos'
import 'aos/dist/aos.css'

import { Toaster } from "react-hot-toast";

AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </BrowserRouter>
  </StrictMode>
)