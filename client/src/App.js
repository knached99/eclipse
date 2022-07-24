import React, { lazy, useState, useMemo} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import { AuthContext } from './context/AuthContext'
import Dash from './pages/user/dashboard'

// lazy loading improves app performance by only loading the components when needed
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/user/auth/Login'))
const CreateAccount = lazy(() => import('./pages/user/auth/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/user/auth/ForgotPassword'))


function App() {

const [user, setUser] =useState("");
const authUser = useMemo(()=>({user, setUser}), [user, setUser]);

  return (
    <>
         <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
        <AuthContext.Provider value={authUser}>
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />
          {/* Wrap Provider around all components that needs the user data*/}
          {/* Protected Route if session is active */}
          {authUser && <Route path="/app" component={Layout}/>}
          <Redirect exact from="/" to="/login" /> 
          </AuthContext.Provider>

 
        </Switch>
      </Router> 
    

  
    </>
  )
}

export default App
