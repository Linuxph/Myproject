import React from 'react'
import {useLocation, Routes, Route} from 'react-router-dom'
import Latest from './Latest'
import Rated from './Rated'
import Cinemas from './Cinemas'
import Home from './Home'
import SignUp from './SignUp'
import { AnimatePresence } from 'framer-motion'
import Login from './Login'
import Book from './Book'
import Showtime from '../components/Showtime'
import Seats from '../components/Seats'
import Final from './Final'

const AnimatedRoutes = () => {
    const location = useLocation();
  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route  exact path='/' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/> 
            {/* <Route path='/adminlogin' element={<AdminLogin/>} /> */}
            <Route path='/home' element={<Home />}/>
            <Route path='/showtime' element={<Showtime />}/>
            <Route path='/booking' element={<Seats />} />
            <Route  path='/latest' element={<Latest/>}/>
            <Route  path='/rated' element={<Rated />}/>
            <Route  path='/cinemas' element={<Cinemas />}/>
            <Route path='/final' element={<Final/>} />

        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes