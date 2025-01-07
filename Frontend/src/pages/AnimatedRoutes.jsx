import React from 'react'
import {useLocation, Routes, Route} from 'react-router-dom'
import Latest from './Latest'
import Rated from './Rated'
import Home from './Home'
import SignUp from './SignUp'
import { AnimatePresence } from 'framer-motion'
import Login from './Login'
import Showtime from './Showtime'
import Seats from './Seats'
import Final from './Final'
import AdminLogin from './AdminLogin'
import AdminHome from './AdminHome'
import Pagination from '../components/Pagination'
const AnimatedRoutes = () => {
    const location = useLocation();
  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route  exact path='/' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/> 
            <Route path='/adminLogin' element={<AdminLogin/>} />
            <Route path='/adminHome' element={<AdminHome/>} />
            <Route path='/home' element={<Home />}/>
            <Route path='/page1' element={<Pagination />}/>
            <Route path='/showtime' element={<Showtime />}/>
            <Route path='/booking' element={<Seats />} />
            <Route  path='/latest' element={<Latest/>}/>
            <Route  path='/rated' element={<Rated />}/>
            <Route path='/final' element={<Final/>} />
        </Routes>
    </AnimatePresence>
  )
}
export default AnimatedRoutes