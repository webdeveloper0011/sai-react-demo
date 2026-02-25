import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './frontend/Layout'
import AdmiinLayout from './admin/layouts/AdmiinLayout'


function App() {

  return (
    <>
      <Routes>
        <Route path='/*' element={<Layout/>}/>
        <Route path='/admin/*' element={<AdmiinLayout/>}/>
        <Route path='/dashboard/*' element={<AdmiinLayout/>}/>
      </Routes>
    </>
  )
}

export default App
