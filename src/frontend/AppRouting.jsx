import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './container/pages/Login'
import Register from './container/pages/Register'

const AppRouting = () => {
  return (
   <>
    <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
    </Routes>
   </>
  )
}

export default AppRouting
