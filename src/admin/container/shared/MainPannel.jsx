import React, { useEffect, useState } from 'react'
import { getAuth, loadUsers } from '../../../utils/auth'

const MainPannel = ({ isSidebarVisible }) => {
    const [userData, setUserData] = useState(null)

    // Form data structure
    const profileFormData = userData ? {
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        mobile: userData.mobile || '',
        email: userData.email || '',
        state: userData.state || '',
        district: userData.district || '',
        village: userData.village || '',
        pincode: userData.pincode || '',
    } : null

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
    return (
     <>
         <div className={"mainPanel" + (isSidebarVisible ? ' hide' : '')}>
                                <div className="middleContent">
						<div class="container-fluid">
							<div class="row">
                                <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="dashboard-section">
                                        <div class="row">
                                            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                                                <div class="dash-card">
                                                    <div class="title-sec">
                                                        <h5 class="unerline-title">My Profile</h5>
                                                    </div>
                                                    {userData ? (
                                                        <div className="profile-details" >
                                                            <div className="row">
                                                                <div className="col-12 col-sm-6 col-md-6 col-lg-4" >
                                                                    <div class="row align-items-center mb-3">
                                                                        <div class="col-4">
                                                                            <label for="firstName" class="col-form-label">First Name</label>
                                                                        </div>
                                                                        <div class="col-8">
                                                                            <input type="text" id="firstName" class="form-control" value={userData.firstName} disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-6 col-md-6 col-lg-4" >
                                                                    <div class="row align-items-center mb-3">
                                                                        <div class="col-4">
                                                                            <label for="firstName" class="col-form-label">Last Name:</label>
                                                                        </div>
                                                                        <div class="col-8">
                                                                            <input type="text" id="firstName" class="form-control" value={userData.lastName} disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-6 col-md-6 col-lg-4" >
                                                                    <div class="row align-items-center mb-3">
                                                                        <div class="col-4">
                                                                            <label for="firstName" class="col-form-label">Email:</label>
                                                                        </div>
                                                                        <div class="col-8">
                                                                            <input type="text" id="firstName" class="form-control" value= {userData.email} disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-6 col-md-6 col-lg-4" >
                                                                    <div class="row align-items-center mb-3">
                                                                        <div class="col-4">
                                                                            <label for="firstName" class="col-form-label">Mobile Number:</label>
                                                                        </div>
                                                                        <div class="col-8">
                                                                            <input type="text" id="firstName" class="form-control" value= {userData.mobile} disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-6 col-md-6 col-lg-4" >
                                                                    <div class="row align-items-center mb-3">
                                                                        <div class="col-4">
                                                                            <label for="firstName" class="col-form-label">State:</label>
                                                                        </div>
                                                                        <div class="col-8">
                                                                            <input type="text" id="firstName" class="form-control" value={userData.state} disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-6 col-md-6 col-lg-4" >
                                                                    <div class="row align-items-center mb-3">
                                                                        <div class="col-4">
                                                                            <label for="firstName" class="col-form-label">District:</label>
                                                                        </div>
                                                                        <div class="col-8">
                                                                            <input type="text" id="firstName" class="form-control" value={userData.district} disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-6 col-md-6 col-lg-4" >
                                                                    <div class="row align-items-center mb-3">
                                                                        <div class="col-4">
                                                                            <label for="firstName" class="col-form-label">Village:</label>
                                                                        </div>
                                                                        <div class="col-8">
                                                                            <input type="text" id="firstName" class="form-control" value={userData.village} disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-6 col-md-6 col-lg-4" >
                                                                    <div class="row align-items-center mb-3">
                                                                        <div class="col-4">
                                                                            <label for="firstName" class="col-form-label">Pin Code:</label>
                                                                        </div>
                                                                        <div class="col-8">
                                                                            <input type="text" id="firstName" class="form-control" value={userData.pincode} disabled />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="alert alert-warning" style={{ margin: '20px' }}>
                                                            <p>No user data available. Please log in again.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
            </div>
   </>
  )
}

export default MainPannel
