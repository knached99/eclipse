import React, { lazy, useState, useMemo} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import { AuthContext } from './context/AuthContext'
import Dash from './pages/user/dashboard'


const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/user/auth/Login'))
const CreateAccount = lazy(() => import('./pages/user/auth/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/user/auth/ForgotPassword'))


function App() {

const [user, setUser] =useState("Khaled");
const providerValue = useMemo(()=>({user, setUser}), [user, setUser]);

  return (
    <>
         <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />
          {/* Wrap Provider around all components that needs the user data*/}
          <AuthContext.Provider value={providerValue}>
          <Route path="/app" component={Layout} /> 
          </AuthContext.Provider>

          <Redirect exact from="/" to="/login" /> 
        </Switch>
      </Router> 
    

  
    </>
  )
}

export default App
