import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import { Login } from './login'
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import { Home } from './home'
import { AddMember } from './addMember'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/addmember" element={<AddMember />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
