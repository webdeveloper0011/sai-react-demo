import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import saiLogo from '../../assets/images/sai_logo.svg'
import emblem from '../../assets/images/emblem.svg'
import profileImg from '../../assets/images/profile-img.svg'
import { getAuth, clearAuth, loadUsers } from '../../../utils/auth'

const Header = ({ isSidebarVisible, toggleSidebar }) => {
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const authUser = getAuth()
        if (authUser) {
            const users = loadUsers()
            const user = users.find(u => (u.email || '').toLowerCase() === (authUser.email || '').toLowerCase())
            if (user) {
                setUserData(user)
            }
        }
    }, [])

    const handleLogout = () => {
        clearAuth()
        try {
            localStorage.removeItem('authToken')
            localStorage.removeItem('currentUser')
        } catch (e) {}
        navigate('/')
    }

  return (
    <>
         <header>
            <div className={"mngmntHeader" + (isSidebarVisible ? ' side-menu-show' : '')}>
                <div className="main-logo-sec">
                    {/* <!-- Menu - Button Start  --> */}
                    <div className="togglemenuSection">
                        <button
                          type="button"
                          className="btn btn-sm togglebtn"
                          id="topnav-hamburger-icon"
                          onClick={toggleSidebar}
                        >
                            <span className={"hamburger-icon" + (isSidebarVisible ? ' hide' : '')}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </button>
                    </div>
                    {/* <!-- Menu - Button End  --> */}
                    {/* <!-- Logo Section Start --> */}
                      <div className="brand-logo-sec">
                        <a href="/admin" className="sai-logo-sec">
                            <img src={saiLogo} alt="SAI logo" className="sai-logo" />
                        </a>
                        <a className="logo-align " href="/admin">
                            <img src={emblem} alt="emblem" className="wow zoomIn" style={{visibility: 'visible', animationName: 'zoomIn'}} />
                            <div className="brand-text">
                                <h4>
                                <span className="hindi-txt">युवा कार्यक्रम और खेल मंत्रालय</span>
                                <span>MINISTRY OF</span>
                                YOUTH AFFAIRS AND SPORTS
                                </h4>
                            </div>
                        </a>
                    </div>
                    {/* <!-- Logo Section End --> */}
                </div>
                {/* <!-- Account Details Area Start  --> */}
                <div className="account-details">
                    <div className="userInformation">
                        {/* <!--userDetail--> */}
                        <div className="userDetail" id="usr-action-btn">
                            <div className="userName"> 
                                <span id="headerUserName">{userData ? `${userData.firstName} ${userData.lastName}` : 'User'}</span>
                                <i className="fas fa-chevron-down"></i>
                            </div>
                            <div className="user-action-sec">
                                <ul>
                                    <li>
                                        <a href="#">Profile</a>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/login" 
                                            onClick={handleLogout}
                                        >
                                            Log Out
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <!--userDetail--> */}

                        {/* <!--userImg--> */}
                        <div className="userImgWrap">
                            <div className="userImg">
                                <a href="#">
                                    <img src={profileImg} alt="Admin" title="admin" width="56" height="56" />
                                </a>
                            </div>
                        </div>
                        {/* <!--userImg--> */}
                    </div>
                    <div className="userInfo">
                        <a href="#" className="bell">
                            <span className="fa fa-bell ringing"></span>
                            <span className="count">5</span>
                        </a>
                    </div>
                </div>
                {/* Account Details Area End  */}
            </div>
         </header>
    </>
  )
}

export default Header
