import React, { useEffect, useState, Fragment, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

import { GithubIcon, TwitterIcon } from '../../../icons'
import { Input, Label, Button } from '@windmill/react-ui'
import {useFormik} from "formik";
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import * as Yup from 'yup';
function CreateAccount() {
  const [success, setSuccess] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(null);
  const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef(null)
  //const [flashMsg, setFlashMsg] = useState(null);
  const validationSchema =  Yup.object({
    fName: Yup.string().required('your first name is required').min(3, 'your first name must contain at least 3 characters'),
    lName: Yup.string().required('your first name is required').min(3, 'your last name must contain at least 3 characters'),
    email: Yup.string().required('your email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'you entered an invalid email'),
    pwd: Yup.string().required('your password is required').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/, 'Your password is not strong enough'),
    retypePwd: Yup.string().required('You must retype your password').oneOf([Yup.ref('pwd')], 'both passwords must match') 
  });

  const onSubmit = async(values)=>{
    const {retypePwd, ...data} = values;

    const response = await axios
    .post('http://localhost:5000/api/v1/register', data) 
    .catch((err)=>{
      setLoading(true);
      if(err && err.response) setErrors(err.response.data.message);
      setLoading(false);
      setSuccess(null);
    });
    if(response && response.data){
      setErrors(null);
      setLoading(true);
      setSuccess(response.data.message);
      formik.resetForm();
    }
  };
 /* const onSubmit = async (values)=>{

  const {retypePwd, ...data} = values;
    setLoading(true);
    const response =  await axios.post('http://localhost:5000/api/v1/register', data).catch((err)=>{
      if(err && err.response){

       // alert('An unknown error occurred: ', err);
        console.log('Error ', err);
        setErrors('Error creating your account');
      }
    });
    if(response && response.data){
      console.log(response.data.message)
      setRegister(response.data.message)
    } 
  } */
  const formik = useFormik({
    initialValues:{
      fName: '',
      lName: '',
      email: '',
      pwd: ''
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
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
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
             // src={ImageDark}
             src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="w-full">
              {/* display success message */}

                 {/* display any messages related to contacting the server */}
               
             
                
              <h1 className="mb-4 text-3xl font-black text-gray-700 dark:text-white">
                Create account
              </h1> 
              {!errors && <p className="text-green-400 font-semibold">{success ? success : ""} </p>}
              <Label className="mt-4">
                <Input className="mt-1" style={formik.touched.fName && formik.errors.fName ? {borderWidth: 2, borderColor: '#f71665', color: '#f71665'} : null}
                   placeholder="Enter your first name" name="fName" onChange={formik.handleChange}  value={formik.values.fName} onBlur={formik.handleBlur}/>
                {formik.touched.fName && formik.errors.fName ? <span style={{color: '#f71665'}}>{formik.errors.fName}</span> : null}
              </Label>

              <Label className="mt-4">
                <Input className="mt-1"  style={formik.touched.lName && formik.errors.lName ? {borderWidth: 2, borderColor: '#f71665', color: '#f71665'}: null} placeholder="Enter your last name" name="lName" onChange={formik.handleChange}  value={formik.values.lName} onBlur={formik.handleBlur}/>
                {formik.touched.lName && formik.errors.lName ? <span style={{color: '#f71665'}}>{formik.errors.lName}</span> : null}

              </Label>

              <Label className="mt-4">
                <Input className="mt-1"  style={formik.touched.email && formik.errors.email ? {borderWidth: 2, borderColor: '#f71665', color: '#f71665'}: null} placeholder="Enter your email" name="email" onChange={formik.handleChange}  value={formik.values.email} onBlur={formik.handleBlur}/>
                {formik.touched.email && formik.errors.email ? <span style={{color: '#f71665'}}>{formik.errors.email}</span> : null}

              </Label>
              
              <Label className="mt-4">
                <Input className="mt-1"  style={formik.touched.pwd && formik.errors.pwd ? {borderWidth: 2, borderColor: '#f71665', color: '#f71665'}: null} placeholder="Create your password" name="pwd" type="password"  onChange={formik.handleChange}  value={formik.values.pwd} onBlur={formik.handleBlur}/>
                {formik.touched.pwd && formik.errors.pwd ? <span style={{color: '#f71665'}}>{formik.errors.pwd}</span> : null}

              </Label>
              <Label className="mt-4">
                <Input className="mt-1"  style={formik.touched.retypePwd && formik.errors.retypePwd ? {borderWidth: 2, borderColor: '#f71665', color: '#f71665'}: null} placeholder="Retype your password" name="retypePwd" type="password" onChange={formik.handleChange}  value={formik.values.retypePwd} onBlur={formik.handleBlur} />
                {formik.touched.retypePwd && formik.errors.retypePwd ? <span style={{color: '#f71665'}}>{formik.errors.retypePwd}</span> : null}

              </Label>

              <Label className="mt-6" check>
                <Input type="checkbox" />
                <span className="ml-2">
                  I agree to the <span className="underline">privacy policy</span>
                </span>
              </Label>


              {!success && loading && <Button block disabled className="mt-4">
              <img src="https://mygrant.ors.hawaii.edu/rCOI/images/loading.gif" style={{width: 30, height: 30, margin: 5}} />
                </Button>}:
                  <Button type="submit" block className="mt-4" disabled={!(formik.isValid && formik.dirty)}>
                    Create your account
                  </Button>
                
              <hr className="my-8" />

              <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>
              <Button block className="mt-4" layout="outline">
                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Twitter
              </Button>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
            </form>
          </main>
        </div>
      </div>
    </div>

       {/* Modal Popup for errors */}
   

       <Transition.Root show={errors ? open : false} as={Fragment}>
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
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-black text-gray-900">
                      Signup Error 
                      </Dialog.Title> 
                      <div className="mt-2">
                      {!success && <p className="text-red-400 font-semibold">{errors ? errors : ""}</p>}
                      
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

export default CreateAccount
