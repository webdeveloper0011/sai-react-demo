import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { findUser, setAuth, loadUsers } from '../../../utils/auth'

const Login = () => {
    useEffect(() => {
        const target = document.querySelector('.main-body')
        target.classList.add('login-pg-wrapper')
        return () => {
            target.classList.remove('login-pg-wrapper')
        }
    }, [])

    const loginInitialValues = { email: '', password: '', captcha: '', remember: false }

    const loginValidationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        captcha: Yup.string().required('Captcha is required'),
    })

    const navigate = useNavigate()

    const handleLoginSubmit = (values, { setSubmitting, setFieldError }) => {
        const { email, password, remember } = values
        const emailNorm = (email || '').toLowerCase().trim()
        const users = loadUsers()

        const user = users.find(u => (u.email || '').toLowerCase() === emailNorm)
        if (!user) {
            setFieldError('email', 'Email not registered')
            setSubmitting(false)
            return
        }

        if ((user.password || '') !== (password || '')) {
            setFieldError('password', 'Invalid password')
            setSubmitting(false)
            return
        }

        // mirror legacy behavior: set simple auth token + currentUser
        try {
            localStorage.setItem('authToken', btoa(emailNorm + '|' + Date.now()))
            localStorage.setItem('currentUser', emailNorm)
        } catch (e) {}

        setAuth(user, remember)
        setSubmitting(false)
        navigate('/dashboard')
    }

    // If already authenticated (from previous session), redirect to dashboard
    useEffect(() => {
        const current = localStorage.getItem('currentUser')
        const token = localStorage.getItem('authToken')
        if (current && token) {
            navigate('/dashboard')
            return
        }

        // Prevent back navigation away from login (mirror legacy behavior)
        // window.history.pushState(null, null, window.location.href)
        // const onPop = () => window.history.pushState(null, null, window.location.href)
        // window.addEventListener('popstate', onPop)
        // return () => window.removeEventListener('popstate', onPop)
    }, [navigate])

  return (
      <>
          <div className="login-area">
              <div className="container">
                  <div className="row justify-content-center">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                          <div className="login-box">
                              <div className="login-box-head">
                                  <img src="images/star-blinks.png" alt="" className="star-blinks-img" />
                                  <div className="txt-align">
                                      <h1 className="httxt">Login</h1>
                                      <p className="sub-txt">Welcome Back</p>
                                  </div>
                              </div>
                              <div className="login-box-main">
                                  <Formik
                                      initialValues={loginInitialValues}
                                      validationSchema={loginValidationSchema}
                                      onSubmit={handleLoginSubmit}
                                  >
                                      {({ errors, touched }) => (
                                          <Form id="loginForm">
                                              <div className="form-group group">
                                                  <Field id="email" name="email" className={`form-control ${errors.email && touched.email ? 'input-error' : ''}`} placeholder=" " />
                                                  <label htmlFor="email">Email address</label>
                                                  {errors.email && touched.email ? <div className="form-err-msg">*{errors.email}</div> : null}
                                              </div>
                                              <div className="form-group group">
                                                  <Field id="password" name="password" type="password" className={`form-control ${errors.password && touched.password ? 'input-error' : ''}`} placeholder=" " />
                                                  <label htmlFor="password">Password</label>
                                                  {errors.password && touched.password ? <div className="form-err-msg">*{errors.password}</div> : null}
                                              </div>
                                              <div className="row">
                                                  <div className="col-12 col-sm-12 col-md-5 col-lg-5">
                                                      <div className="capcha-img">
                                                          <p className="form-control">HrT903A</p>
                                                      </div>
                                                  </div>
                                                  <div className="col-12 col-sm-12 col-md-2 col-lg-1">
                                                      <div className="capcha-reloder">
                                                          <i className="fas fa-redo-alt"></i>
                                                      </div>
                                                  </div>
                                                  <div className="col-12 col-sm-12 col-md-5 col-lg-6">
                                                      <div className="form-group group">
                                                          <Field id="captcha" name="captcha" className={`form-control ${errors.captcha && touched.captcha ? 'input-error' : ''}`} placeholder=" " />
                                                          <label htmlFor="captcha">Enter Capcha Here</label>
                                                          {errors.captcha && touched.captcha ? <div className="form-err-msg">*{errors.captcha}</div> : null}
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="row form-group">
                                                  <div className="col-12 col-sm-6 col-md-5 col-lg-5">
                                                      <div className="form-check">
                                                          <Field type="checkbox" id="remember" name="remember" className="form-check-input" />
                                                          <label className="form-check-label" htmlFor="remember">Remember Me</label>
                                                      </div>
                                                  </div>
                                                  <div className="col-12 col-sm-6 col-md-7 col-lg-7">
                                                      <div className="forget-sec">
                                                          <NavLink to="/forgot" className="float-end txt-red">Forget Password?</NavLink>
                                                      </div>
                                                  </div>
                                              </div>
                                              <button type="submit" className="comn-btn gradient-btn mt-3 w-100">
                                                  <i className="fa-solid fa-arrow-right-to-bracket"></i>LOGIN
                                              </button>
                                              <div className="register-txt-sec mt-3">
                                                <p className="text-center m-0">Don't have an account? 
                                                    <NavLink to="/register" className="txt-red">Register</NavLink>
                                                </p>
                                              </div>
                                          </Form>
                                      )}
                                  </Formik>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default Login
