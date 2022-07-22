import React, {useContext, useState} from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import { AuthContext } from '../../context/AuthContext'


function Dash(props) {
  const {user, setUser} = useContext(AuthContext);
  return (
    <>
      <PageTitle>Welcome Back {user}!
        This dashboard is currently under construction 
        <button className='bg-purple-500 m-5 p-2 hover:bg-green-400' onClick={()=>setUser('Tim Cook')}>Change User</button>
        <img className="m-3 p-4" src="https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/website-under-construction-512.png" />
      </PageTitle>
    </>
  )
}

export default Dash
