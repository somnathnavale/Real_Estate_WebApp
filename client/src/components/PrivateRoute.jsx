import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom';
const PrivateRoute = () => {

    const {currUser}=useSelector(store=>store.user);
    return currUser ? <Outlet/> :<Navigate to='/sign-in'/>
  
}

export default PrivateRoute