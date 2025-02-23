import React,{ useState } from 'react'
import LoginPage from './Components/Login'
import SignUpPage from './Components/SignUp'
import Dashboard from './Components/Dashboard'
import AnnouncementForm from './Components/AnnouncementForm'
import {Routes, Route} from 'react-router-dom'
import MyListings from './Components/MyListings';
import MyRequests from './Components/MyRequests'
import AdminDashboard from './Components/AdminDashboard'


function App() {

  return (
    <>
      <Routes>
          <Route path='/*' element = {<LoginPage/>}/>
          <Route path='/login' element = {<LoginPage/>}/>
          <Route path='/signup' element = {<SignUpPage/>}/>
          <Route path='/dashboard' element = {<Dashboard/>}/>
          <Route path="/my-listings" element={<MyListings />} />
          <Route path='/form' element = {<AnnouncementForm/>}/>
          <Route path='/my-requests' element = {<MyRequests/>}/>
          <Route path='/admin' element = {<AdminDashboard/>}/>
      </Routes>
    </>
  )
}

export default App
