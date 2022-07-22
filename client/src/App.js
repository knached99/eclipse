import React, { lazy} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import Dash from './pages/user/dashboard'


const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/user/auth/Login'))
const CreateAccount = lazy(() => import('./pages/user/auth/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/user/auth/ForgotPassword'))


function App() {


  return (
    <>
         <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />
    
          <Route path="/app" render={(props) => <Dash {...props}/>}component={Layout} /> 

          <Redirect exact from="/" to="/login" /> 
        </Switch>
      </Router> 
    

  
    </>
  )
}

export default App
