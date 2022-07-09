import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

//import ImageLight from '../assets/img/login-office.jpeg'
//import ImageDark from '../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'
import {useFormik} from "formik";
import * as Yup from 'yup';

function Login() {


  // Login Validation 
  const formik = useFormik({
    initialValues:{
      email: '',
      pwd: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().required('your email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'you entered an invalid email'),
      pwd: Yup.string().required('your password is required')
    }),
  
  });



  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              //src={ImageLight}
              src="https://images.unsplash.com/photo-1573120525707-4549889744f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              //src={ImageDark}
              src="https://images.unsplash.com/photo-1573120525707-4549889744f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <form autoComplete='off' onSubmit={formik.handleSubmit}>
            <div className="w-full">
              <h1 className="mb-4 text-3xl font-black text-gray-700 dark:text-white">Login to your account</h1>
              <Label>
                <Input className="mt-1" style={formik.touched.email && formik.errors.email ?{color: '#f71665', borderWidth: 2, borderColor: '#f71665'} : null} placeholder="Enter your email" name="email" onChange={formik.handleChange}  value={formik.values.email} onBlur={formik.handleBlur}/>
                {formik.touched.email && formik.errors.email ? <span style={{color: '#f71665'}}>{formik.errors.email}</span>: null }
              </Label>

              <Label className="mt-4">
                <Input className="mt-1"  style={formik.touched.pwd && formik.errors.pwd ?{color: '#f71665', borderWidth: 2, borderColor: '#f71665'} : null} type="password" placeholder="Enter your password" name="pwd" onChange={formik.handleChange}  value={formik.values.pwd} onBlur={formik.handleBlur} />
                {formik.touched.pwd && formik.errors.pwd ? <span style={{color: '#f71665'}}>{formik.errors.pwd}</span>: null }

              </Label>

             {/* <Button className="mt-4" block tag={Link} to="/app">
                Log in
  </Button> */}
              <Button className="mt-4" type="submit" block disabled={!(formik.isValid && formik.dirty)}>Login</Button>

              <hr className="my-8" />

              <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>
              <Button className="mt-4" block layout="outline">
                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Twitter
              </Button>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
            </form>
          </main>
          
        </div>
      </div>
    </div>
  )
}

export default Login
