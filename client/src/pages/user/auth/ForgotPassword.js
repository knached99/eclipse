import React, { useEffect, useState, Fragment, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { Label, Input, Button } from '@windmill/react-ui'
import {useFormik} from "formik";
import * as Yup from 'yup';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon, CheckCircleIcon } from '@heroicons/react/outline'

function ForgotPassword() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const cancelButtonRef = useRef(null)
  const onSubmit = async(values)=>{
    setError(null);
    setLoading(true);
    const response = await axios 
    .post('http://localhost:5000/api/v1/forgotpwd', values)
    .catch((err)=>{
      if(err && err.response) 
      setError(err.response.data.message);
      setSuccess(null);
      setOpen(true);
      setLoading(false);
    });
    if(response){
      setLoading(false);
      setSuccess(response.data.message);
    }

  }
  const formik = useFormik({
    initialValues:{
      email: '',
    
    },
    validationOnBlur: true, 
    onSubmit, 
    validationSchema: Yup.object({
      email: Yup.string().required('your email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'you entered an invalid email')
    })
  });

  return (
    <>
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
           <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="w-full">
              <h1 className="mb-4 text-3xl font-black text-gray-700 dark:text-white">
                Forgot password ?
              </h1>
           
              <p className='mb-4 text-sm font-semibold text-gray-600 dark:text-gray-300'>
                No worries! Just follow the instructions and your password will be reset in no time
              </p>
              <Label>
          
                <Input className="mt-1" style={formik.touched.email && formik.errors.email ? {color: '#f71665', borderColor: '#f71665', borderWidth: 2}: null} type="email" placeholder="Enter your email" name="email" onChange={formik.handleChange}  value={formik.values.email} onBlur={formik.handleBlur}/>
                {formik.touched.email && formik.errors.email ? <span style={{color: '#f71665'}}>{formik.errors.email}</span>: null }
              </Label>
              { loading  && !success && <Button disabled block>
                <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                 </svg>
                  Loading...
              </Button> 
              }
              <Button type="submit" block className="mt-4" disabled={!(formik.isValid && formik.dirty)}>Recover Password</Button>
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

       {/* Modal Popup for errors */}
   

       <Transition.Root show={error ? open : success ? open : false} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                     {! success && 
                       <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> 
                      </div>
                      }
                      {! error &&  
                       <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                      </div>
                       }
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-black text-gray-900">
                       {!success && 'Password Reset Error '}
                       {!error && 'Next Steps'}
                      </Dialog.Title> 
                      <div className="mt-2">
                      <p className="text-red-400 font-semibold">{error ? error : ""}</p>
                      <p className="text-green-400 font-semibold">{success ? success : ""}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                 {/* <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button> */}
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Ok
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  )
}

export default ForgotPassword
