import React from 'react';
import { useAuthContextApi } from '../../store/auth';
import {NavLink ,  Route, Routes } from 'react-router-dom';


const AboutPage = () => {
  const { userLoginedData  ,isAdmin } = useAuthContextApi();

  console.log("isAdmin :---" + isAdmin)
  

  return (
    <>
      <div className="container mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold mb-4 bg-red-600 text-white p-2">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Name: {userLoginedData.username}</h3>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Email: {userLoginedData.email}</h3>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Phone: {userLoginedData.phone}</h3>
          </div>
        </div>
      </div>

        {

          (userLoginedData.isAdmin)? (
            <h1>user is admin see admin panel <NavLink className="bg-yellow-400 border-4 border-black" to="/admin"> <button>Admin Btn</button> </NavLink> </h1>
            ) :(
              <h1>user is not an admin</h1>
              )
            }
    </>
  );
};

export default AboutPage;
