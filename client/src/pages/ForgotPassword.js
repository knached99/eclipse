import React from 'react'
import { Link } from 'react-router-dom'

/*import ImageLight from '../assets/img/forgot-password-office.jpeg'
import ImageDark from '../assets/img/forgot-password-office-dark.jpeg'
*/
import { Label, Input, Button } from '@windmill/react-ui'
import {useFormik} from "formik";
import * as Yup from 'yup';

function ForgotPassword() {
  const formik = useFormik({
    initialValues:{
      email: '',
    
    },
    validationSchema: Yup.object({
      email: Yup.string().required('your email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'you entered an invalid email')
    })
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
              src="https://images.unsplash.com/photo-1574882225022-9e0e447e9662?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
             // src={ImageDark}
             src="https://images.unsplash.com/photo-1574882225022-9e0e447e9662?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
           <form onSubmit={formik.handleSubmit}>
            <div className="w-full">
              <h1 className="mb-4 text-3xl font-black text-gray-700 dark:text-white">
                Forgot password ?
              </h1>
              <p className='mb-4 text-sm font-semibold text-gray-600 dark:text-gray-300'>
                No worries! Just follow the instructions and your password will be reset in no time
              </p>
              <Label>
          
                <Input className="mt-1" type="email" placeholder="Enter your email" name="email" onChange={formik.handleChange}  value={formik.values.email} onBlur={formik.handleBlur}/>
                {formik.touched.email && formik.errors.email ? <span style={{color: '#f71665'}}>{formik.errors.email}</span>: null }
              </Label>

              {/*<Button tag={Link} to="/login" block className="mt-4">
                Recover password
              </Button> */}
              <Button type="submit" block className="mt-4">Recover Password</Button>
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Login to your account
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

export default ForgotPassword
