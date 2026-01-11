import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import { Login } from './login'
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import { Home } from './home'
import { AddMember } from './addMember'
import { AddNewTitle } from './addTitle'
import { TitleInfo } from './titleInfo'
import { ReadNow } from './readNow'
import { AllManghwa } from './allManghwa'
import { AllCompleted } from './allCompleted'
import { AllFavorites } from './allFavorites'
import { AllRecentlyViewed } from './allRecentlyViewed'
import { CheckTitleUpdates } from './titleUpdates'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/addmember" element={<AddMember />} />
        <Route path="/addtitle" element={<AddNewTitle />} />
        <Route path="/titleInfo/:id/:code" element={<TitleInfo />} />
        <Route path="/readnow/:name/:chapter" element={<ReadNow />} />
        <Route path="/all" element={<AllManghwa />} />
        <Route path="/all/completed" element={<AllCompleted />} />
        <Route path="/all/favorites" element={<AllFavorites />} />
        <Route path="/all/recentlyviewed" element={<AllRecentlyViewed />} />
        <Route path="/updatetitles" element={<CheckTitleUpdates />} />
      </Routes>
    </BrowserRouter>,
)
