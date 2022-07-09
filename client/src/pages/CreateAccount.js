import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

//import ImageLight from '../assets/img/create-account-office.jpeg'
//import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Input, Label, Button } from '@windmill/react-ui'
import {useFormik} from "formik";
import * as Yup from 'yup';
function CreateAccount() {
  const [register, setRegister] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(null);
  //const [flashMsg, setFlashMsg] = useState(null);
  const validationSchema =  Yup.object({
    fName: Yup.string().required('your first name is required').min(3, 'your first name must contain at least 3 characters'),
    lName: Yup.string().required('your first name is required').min(3, 'your last name must contain at least 3 characters'),
    email: Yup.string().required('your email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'you entered an invalid email'),
    pwd: Yup.string().required('your password is required').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/, 'Your password is not strong enough'),
    retypePwd: Yup.string().required('You must retype your password').oneOf([Yup.ref('pwd')], 'both passwords must match') 
  });
  const onSubmit = async (values)=>{
  //alert(JSON.stringify(values));
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
  }
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
               { register ? "" : <p style={{color: 'green'}}>{register}</p>}

                 {/* display any messages related to contacting the server */}
               
             
                
              <h1 className="mb-4 text-3xl font-black text-gray-700 dark:text-white">
                Create account
              </h1>
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

              {/*<Button tag={Link} to="/login" block className="mt-4">
                Create account
              </Button> 
             
              */}
                {errors ? (
                  <p  style={{color: 'red'}}>{errors}</p>
                ) : (
                  null
                )}
              
                  {loading ? (
               <button type="submit" block className="bg-gray-600 text-white font-bold py-2 px-4 rounded" disabled={!(formik.isValid && formik.dirty && loading)}>
                loading, please wait...
                </button>

                  ):
                  <Button type="submit" block className="mt-4" disabled={!(formik.isValid && formik.dirty)}>
                    Create your account
                  </Button>
                }

             

             

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
  )
}

export default CreateAccount
