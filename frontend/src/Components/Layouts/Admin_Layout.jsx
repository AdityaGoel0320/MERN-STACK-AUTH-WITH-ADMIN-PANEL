import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuthContextApi } from '../../store/auth';

const AdminLayout = () => {
  const {isLoading  ,  userLoginedData } = useAuthContextApi();

  if(isLoading){
    return <h1>Laoding ..... </h1>
  }

  // as this uselogiinedData has all the data of the loggined user so i ahev to maek that only admin = true will se this route

  if (!userLoginedData.isAdmin) {
    return(
      <>
        <Navigate to="/" />
        

      </>

    )
  }

  return (
    <>
      <ul className="admin-nav flex gap-3 m-12 text-center font-bold border-8 border-teal-500">
        <li className="nav-item"> <NavLink to="/admin/users" className="nav-link">Users</NavLink></li>
        <li className="nav-item"> <NavLink to="/admin/contacts" className="nav-link">Contacts</NavLink></li>
        <li className="nav-item"> <NavLink to="/admin/services" className="nav-link">services</NavLink></li>
      </ul>
      <Outlet />
    </>
  );
}

export default AdminLayout;
