import React from 'react'
import Header from './shared/Header'
import Footer from './shared/Footer'
import AppRouting from './AppRouting'

const Layout = () => {
  return (
    <>
    <div className="main-body">
        <Header/>
            <AppRouting/>
        <Footer/>
    </div>
    </>  
  )
}

export default Layout
