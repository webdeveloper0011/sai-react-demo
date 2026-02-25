import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../../utils/auth'

const Register = () => {
    useEffect(() => {
        const target = document.querySelector('.main-body')
        target.classList.add('login-pg-wrapper')
        return () => {
            target.classList.remove('login-pg-wrapper')
        }
    }, [])

    // Define Initial Values (all register fields)
    const initialValues = {
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: '',
        state: '',
        district: '',
        village: '',
        pincode: '',
        terms: false,
    };

    // Define Validation Rules
    const validationSchema = Yup.object({
        firstName: 
            Yup.string()
            .matches(/^[a-zA-Z\s]*$/, 'First Name must only contain letters and spaces')
            .max(30, 'Must be 30 characters or less')
            .required('First Name is required'),
        lastName: 
            Yup.string()
            .matches(/^[a-zA-Z\s]*$/, 'Last Name must only contain letters and spaces')
            .max(30, 'Must be 30 characters or less')
            .required('Last Name is required'),
        mobile: Yup.string()
            .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
            .required('Mobile number is required'),
        email: 
            Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: 
            Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        state: 
            Yup.string()
            .required('State is required'),
        district: 
            Yup.string()
            .required('District is required'),
        village: 
            Yup.string()
            .matches(/^[a-zA-Z\s]*$/, 'Village must only contain letters and spaces')
            .required('Village is required'),
        pincode: 
            Yup.string()
            .matches(/^\d{6}$/, 'Pin Code must be 6 digits')
            .required('Pin Code is required'),
        terms: 
            Yup.boolean()
            .oneOf([true], 'You must accept the terms and conditions'),
    });

    // Handle Form Submission
    const onSubmit = (values, { setSubmitting, resetForm, setFieldError }) => {
        const { email, password, firstName, lastName, mobile, state, district, village, pincode } = values
        const payload = { email, password, firstName, lastName, mobile, state, district, village, pincode }
        const res = registerUser(payload)
        if (!res.success) {
            setFieldError('email', res.error)
            setSubmitting(false)
            return
        }
        // store prefill in session and redirect to login
        try { sessionStorage.setItem('prefill', JSON.stringify({ email, password })) } catch (e) {}
        setSubmitting(false)
        resetForm()
        navigate('/')
    };

    const navigate = useNavigate()

    return (
        <>
            <div className="login-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                            <div className="login-box">
                                <div className="login-box-head">
                                    <img src="images/star-blinks.png" alt="" className="star-blinks-img" />
                                    <div className="txt-align">
                                        <h1 className="httxt">User Register</h1>
                                        <p className="sub-txt">Register to get started</p>
                                    </div>
                                </div>
                                <div className="login-box-main">


                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={onSubmit}
                                    >
                                        {({ errors, touched }) => (
                                            <Form id="regsiterform">
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                        <div className="form-group group">
                                                            <Field name="firstName">
                                                                {({ field }) => (
                                                                    <input
                                                                        {...field}
                                                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '') }}
                                                                        className={`form-control ${errors.firstName && touched.firstName ? 'input-error' : ''}`}
                                                                        placeholder=" "
                                                                    />
                                                                )}
                                                            </Field>
                                                            <label htmlFor="firstName">First Name</label>
                                                            {errors.firstName && touched.firstName ? (
                                                                    <div className='form-err-msg'>*{errors.firstName}</div>
                                                                ) : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                        <div className="form-group group">
                                                            <Field name="lastName">
                                                                {({ field }) => (
                                                                    <input
                                                                        {...field}
                                                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '') }}
                                                                        className={`form-control ${errors.lastName && touched.lastName ? 'input-error' : ''}`}
                                                                        placeholder=" "
                                                                    />
                                                                )}
                                                            </Field>
                                                            <label htmlFor="lastName">Last Name</label>
                                                            {errors.lastName && touched.lastName ? (
                                                                    <div className='form-err-msg'>*{errors.lastName}</div>
                                                                ) : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                        <div className="form-group group">
                                                            <Field name="mobile">
                                                                {({ field }) => (
                                                                    <input
                                                                        {...field}
                                                                        type="tel"
                                                                        maxLength={10}
                                                                        onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10) }}
                                                                        className={`form-control ${errors.mobile && touched.mobile ? 'input-error' : ''}`}
                                                                        placeholder=" "
                                                                    />
                                                                )}
                                                            </Field>
                                                            <label htmlFor="mobile">Mobile Number</label>
                                                            {errors.mobile && touched.mobile ? (
                                                                    <div className='form-err-msg'>*{errors.mobile}</div>
                                                                ) : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                        <div className="form-group group">
                                                            <Field name="email" className={`form-control ${errors.email && touched.email ? 'input-error' : ''}`} placeholder=" " />
                                                            <label htmlFor="email">E-Mail Id</label>
                                                            {errors.email && touched.email ? (
                                                                    <div className='form-err-msg'>*{errors.email}</div>
                                                                ) : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                        <div className="form-group group">
                                                            <Field type="password" name="password" className={`form-control ${errors.password && touched.password ? 'input-error' : ''}`} placeholder=" " />
                                                            <label htmlFor="password">Password</label>
                                                            {errors.password && touched.password ? (
                                                                    <div className='form-err-msg'>*{errors.password}</div>
                                                                ) : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                        <div className="form-group group">
                                                            <Field type="password" name="confirmPassword" className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}`} placeholder=" " />
                                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                                            {errors.confirmPassword && touched.confirmPassword ? (
                                                                    <div className='form-err-msg'>*{errors.confirmPassword}</div>
                                                                ) : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                        <div className="form-group selectgroup group">
                                                            <Field as="select" name="state" className={`form-select cus-form-control ${errors.state && touched.state ? 'input-error' : ''}`}>
                                                                <option value="">select a option</option>
                                                                <option>Haryana</option>
                                                                <option>Delhi</option>
                                                                <option>Uttar Pardesh</option>
                                                            </Field>
                                                            <label htmlFor="state">State</label>
                                                            {errors.state && touched.state ? (
                                                                    <div className='form-err-msg'>*{errors.state}</div>
                                                                ) : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                        <div className="form-group selectgroup group">
                                                            <Field as="select" name="district" className={`form-select cus-form-control ${errors.district && touched.district ? 'input-error' : ''}`}>
                                                                <option value="">select a option</option>
                                                                <option>Haryana</option>
                                                                <option>Delhi</option>
                                                                <option>Uttar Pardesh</option>
                                                            </Field>
                                                            <label htmlFor="district">District</label>
                                                            {errors.district && touched.district ? (
                                                                    <div className='form-err-msg'>*{errors.district}</div>
                                                                ) : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                        <div className="form-group group">
                                                            <Field name="village">
                                                                {({ field }) => (
                                                                    <input
                                                                        {...field}
                                                                        onInput={(e) => { e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '') }}
                                                                        className={`form-control ${errors.village && touched.village ? 'input-error' : ''}`}
                                                                        placeholder=" "
                                                                    />
                                                                )}
                                                            </Field>
                                                            <label htmlFor="village">Village</label>
                                                            {errors.village && touched.village ? (
                                                                    <div className='form-err-msg'>*{errors.village}</div>
                                                                ) : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                        <div className="form-group group">
                                                            <Field name="pincode" className={`form-control ${errors.pincode && touched.pincode ? 'input-error' : ''}`} placeholder=" " />
                                                            <label htmlFor="pincode">Pin Code</label>
                                                            {errors.pincode && touched.pincode ? (
                                                                    <div className='form-err-msg'>*{errors.pincode}</div>
                                                                ) : null}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                                        <div className="form-control checkbox-highlight">
                                                            <div className="form-check">
                                                                <label className="form-check-label" htmlFor="terms">
                                                                    <Field type="checkbox" name="terms" id="terms" className="form-check-input" /> I accept the <NavLink to="/terms" className="txt-red">Terms & Conditions</NavLink>  and <NavLink to="/privacy" className="txt-red">Privacy Policy</NavLink>
                                                                </label>
                                                                {errors.terms && touched.terms ? (
                                                                    <div className='form-err-msg'>*{errors.terms}</div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-4 button-row">
                                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                        <button type="submit" className="comn-btn gray-btn">
                                                            Regsiter Now  <span className="ms-2">➤</span>
                                                        </button>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                                                        <NavLink to="/" className="comn-btn transparent-btn already-register-btn"><i className="fa-regular fa-user"></i>I already have an account</NavLink>
                                                    </div>
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

export default Register
