import React, {useContext, useState} from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import { AuthContext } from '../../context/AuthContext'


function Dash() {
  const {user, setUser} = useContext(AuthContext);
  return (
    <>
      <PageTitle>Welcome Back {JSON.stringify(user)}!
        This dashboard is currently under construction 
        <img className="m-3 p-4" src="https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/website-under-construction-512.png" />
      </PageTitle>
    </>
  )
}

export default Dash
