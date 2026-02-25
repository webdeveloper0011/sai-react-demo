import React, { useEffect, useState } from 'react'
import { getAuth, loadUsers, clearAuth } from '../../../utils/auth'
import { useNavigate, NavLink } from 'react-router-dom'
import profileImg from '../../assets/images/profile-img.svg'

const SidePannel = ({ isSidebarVisible, onClose }) => {
    const [userData, setUserData] = useState(null)

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

    const navigate = useNavigate()

    const handleLogout = () => {
        clearAuth()
        try {
            localStorage.removeItem('authToken')
            localStorage.removeItem('currentUser')
        } catch (e) {}
        navigate('/login')
    }
    return (
        <>
            <div className={"sidePanel" + (isSidebarVisible ? '' : ' hide')}>
                <div className="leftPanel">
                    <div className="dashLeftNavSection">
                        <div className="menu-close-sec">
                            <a type="button" onClick={onClose} className="main-menu-close"> <span
                                className="mdi mdi-close-circle-outline"></span></a>
                        </div>
                        <div className="menu-profile-sec">
                            <div className="profile-img">
                                <img src={profileImg} alt="Profile Image" />
                            </div>
                            <div className="profile-info">
                                <h6 ><span id="profileName">{userData ? `${userData.firstName} ${userData.lastName}` : 'User'}</span> <a href="#" className="profile-link link-txt"><span
                                    className="mdi mdi-circle-edit-outline"></span></a></h6>
                                <a href="#" className="profile-lnk link-txt" id="loggedInUser">User Profile</a>
                            </div>
                        </div>
                        <nav className="mean-nav">
                            <ul className="dashboardLeftNav">
                                <li className="menu-item "><a href="/admin">Dashboard</a></li>
                                <li className="menu-item"><a href="#">Menu 1</a></li>
                                <li className="menu-item"><a href="#">Menu 2</a></li>
                                <li className="menu-item"><a href="#">Menu 3</a></li>
                                <li className="menu-item"><a href="#" className="btn-link">Settings</a> </li>
                                <li className="menu-item"><NavLink className="btn-link" onClick={handleLogout}>Logout</NavLink></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SidePannel
