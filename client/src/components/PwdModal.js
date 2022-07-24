import React,{ Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Label, Input, Button } from '@windmill/react-ui'
import {useFormik, Formik} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { Redirect } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    pwd: Yup.string().required('You must create your new password').min(8, ({min, value})=> `${min - value.length} characters remaining`).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/, 'Your password is not strong enough'),
    retypePwd: Yup.string().required('You must retype your password').oneOf([Yup.ref('pwd')], 'both passwords must match'),

});

function PwdModal(props) {
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef(null)
    const [loading, setLoading] = useState(false);
    const[error, setError] = useState(null);
    const[success, setSuccess] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const email = props.email;
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
     <Transition.Root show={open && !redirect} as={Fragment}>
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
                        initialValues={{pwd: '', retypePwd: '', email: email}}
                        validationSchema={validationSchema}
                        onSubmit={async(values)=>{
                          setError(null);
                          setLoading(true);
                          const response = await axios
                          .post('http://localhost:5000/api/v1/updatePwd', values)
                          .catch((err)=>{
                            if(err && err.response){
                              setError(err.response.data.message);
                              setSuccess(null);
                              setLoading(false);
                              setOpen(false);
                            }
                          });
                          if(response){
                            setLoading(false);
                            setSuccess(response.data.message);
                            setError(null);
                            setOpen(true);
                            
                            if(response.data.message == 'Your password has been updated!'){
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
                            <p className="m-4 text-lg text-black dark:text-gray-400">We're almost done! All you need to do is create your new password! </p>
                            {/*!success &&  <p className="m-4 font-bold text-red-500">{error}</p> */}
                            {!error && <p className="m-4 font-bold text-gray-200">{success}</p>}
                            <Label className="m-3">
          
                           <Input type="password" className="mt-1" style={touched.pwd && errors.pwd ? {color: '#f71665', borderColor: '#f71665', borderWidth: 2}: null}  placeholder="Type your new password" name="pwd" onChange={handleChange}  value={values.pwd} onBlur={handleBlur}/>
                           {touched.pwd && errors.pwd ? <span style={{color: '#f71665'}}>{errors.pwd}</span>: null }
                          </Label>

                          <Label className="m-3">
          
                        <Input type="password" className="mt-1" style={touched.retypePwd && errors.retypePwd ? {color: '#f71665', borderColor: '#f71665', borderWidth: 2}: null}  placeholder="Retype your new password" name="retypePwd" onChange={handleChange}  value={values.retypePwd} onBlur={handleBlur}/>
                        {touched.retypePwd && errors.retypePwd ? <span style={{color: '#f71665'}}>{errors.retypePwd}</span>: null }
                        </Label>

                          
                          <Button type="submit" block className="mt-4" disabled={!(isValid && dirty)}>Update Password</Button>
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
   {redirect && <Redirect to="/login"/>}
   </>
  )
}

export default PwdModal