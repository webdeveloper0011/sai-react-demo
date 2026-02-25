import React, { useState } from 'react'
import Header from '../container/shared/Header'
import Footer from '../container/shared/Footer'
import SidePannel from '../container/shared/SidePannel'
import MainPannel from '../container/shared/MainPannel'

import '../assets/css/bootstrap.min.css'
import '../assets/css/materialdesignicons.min.css'
import '../assets/css/font-awesome.min.css'
import '../assets/css/animate.css'
import '../assets/css/style.css'
import '../assets/css/responsive.css'

const AdmiinLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)

  const toggleSidebar = () => setIsSidebarVisible(v => !v)
  const closeSidebar = () => setIsSidebarVisible(false)

  return (
   <>
        <div className="wrapper">
            <Header isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
                <div className="main-content">
                    <SidePannel isSidebarVisible={isSidebarVisible} onClose={closeSidebar} />
                    <MainPannel isSidebarVisible={isSidebarVisible} />
                </div>
            <Footer/>
        </div>    
   </>
  )
}

export default AdmiinLayout
