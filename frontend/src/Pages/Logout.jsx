import React, { useContext, useEffect } from 'react'

import { Navigate } from 'react-router-dom'
import { useAuthContextApi } from '../store/auth';


import { ToastContainer, toast } from 'react-toastify';


const Logout = () => {
    let { logoutUserFnc } = useAuthContextApi();


    useEffect(() => {
        logoutUserFnc() ; 

    }, [logoutUserFnc])

    


    return (
        <>
            <Navigate to="/login" />
        </>
    )
}

export default Logout