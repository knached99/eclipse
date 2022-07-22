import React,{ Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Label, Input, Button } from '@windmill/react-ui'
import {useFormik, Formik} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { Redirect, useLocation } from 'react-router-dom';



function VerifyModal(props) {


    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef(null)
    const [loading, setLoading] = useState(false);
    const[error, setError] = useState(null);
    const[success, setSuccess] = useState(null);
    const [modal, setModal] = useState(null);
    const [redirect, setRedirect] = useState(false);
    /*const onSubmit= async(values)=>{
        setError(null);
        setLoading(true);
        const response = await axios 
        .post('http://localhost:5000/api/v1/verifyCode', values)
        .catch((err)=>{
            if(err && err.response)
            setError(err.resopnse.data.message);
            setSuccess(null);
            setLoading(false);
        });
        if(response){
            setLoading(false);
            setSuccess(response.data.message);
            setError(null);
        }
    }
    const formik = useFormik({
        initialValues: {
            code: '', 
            email: email
        },
        validationOnBlur: true, 
        onSubmit, 
        validationSchema: Yup.object({
            code: Yup.string().required('Verification code is required').min(6, ({min, value})=> `${min - value.length} numbers remaining`).max(6, 'verification code is six digits long'),
        })
    }); */
  

  return (
     
     <>
     <Transition.Root show={props.show && !redirect} as={Fragment}>
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
             <Dialog.Panel className="relative bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
               <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                 <div className="sm:flex sm:items-start">
                 
                   <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                   
                     <div className="mt-2 justify-center items-center">
                        {/* Form Start 
                        
                    const onSubmit= async(values)=>{
        setError(null);
        setLoading(true);
        const response = await axios 
        .post('http://localhost:5000/api/v1/verifyCode', values)
        .catch((err)=>{
            if(err && err.response)
            setError(err.resopnse.data.message);
            setSuccess(null);
            setLoading(false);
        });
        if(response){
            setLoading(false);
            setSuccess(response.data.message);
            setError(null);
        }
    }
    const formik = useFormik({
        initialValues: {
            code: '', 
            email: email
        },
        validationOnBlur: true, 
        onSubmit, 
        validationSchema: Yup.object({
            code: Yup.string().required('Verification code is required').min(6, ({min, value})=> `${min - value.length} numbers remaining`).max(6, 'verification code is six digits long'),
        })
    }); 
                        
                        */}
                        <Formik 
                        initialValues={{code: '', email: props.email}}
                        onSubmit={async(values)=>{
                          setError(null);
                          setLoading(true);
                          const response = await axios
                          .post('http://localhost:5000/api/v1/verifyAccount', values)
                          .catch((err)=>{
                            if(err && err.response){
                              setError(err.response.data.message);
                              setSuccess(null);
                              setLoading(false);
                            }
                          });
                          if(response){
                            setLoading(false);
                            setSuccess(response.data.message);
                            setError(null);
                            if(response.data.message=='Your account is now verified!'){
                              setRedirect(true);
                              
                            }  

                          }
                        }}
                        >
                          {({   values, errors, touched , handleSubmit, handleChange, handleBlur, isValid, dirty }) => (
                            <form onSubmit={handleSubmit} autoComplete="off">
                            <h1 className="mb-4 text-3xl font-black text-gray-700 dark:text-white">
                                {props.title}
                            </h1>
                            <p className="m-4 text-lg text-black dark:text-gray-300">{props.desc} <span className="text-black dark:text-purple-400">{props.email}</span> </p>
                            {/*!success &&  <p className="m-4 font-bold text-red-500">{error}</p> */}
                            {!error && <p className="m-4 font-bold text-red-400">{success}</p>}
                            {!success && loading && <> <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif" style={{width: 50, height: 50}} />
                            <p className='m-3 text-dark font-semibold dark:text-white'>Verifying...</p></>
                            }
                            <Label>
          
                           <Input className="mt-1" style={touched.code && errors.code ? {color: '#f71665', borderColor: '#f71665', borderWidth: 2}: null}  placeholder="Enter your verification code" name="code" onChange={handleChange}  value={values.code} onBlur={handleBlur}/>
                           {touched.code && errors.code ? <span style={{color: '#f71665'}}>{errors.code}</span>: null }
                          </Label>

                          
                          <Button type="submit" block className="mt-4" disabled={!(isValid && dirty)}>Verify Code</Button>
                            </form>
                          )}
                            </Formik>
                        {/* Form End */}
                     </div>
                   </div>
                 </div>
               </div>
               <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {/* <button
                   type="button"
                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                   onClick={() => setOpen(false)}
                 >
                   Deactivate
                 </button> */}
               
               </div>
             </Dialog.Panel>
           </Transition.Child>
         </div>
       </div>
     </Dialog>
   </Transition.Root>
   {modal ? modal : null}
   {redirect  && <Redirect to={window.location.pathname} />}

   </>
  )
}

export default VerifyModal