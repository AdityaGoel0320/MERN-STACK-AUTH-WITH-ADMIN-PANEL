import React, { useState } from 'react'
import { useAuthContextApi } from '../../store/auth';
import { backendUrl } from '../../assets/FrontendUtils';
import TailwindcssLayout from './TailwindcssLayout';

const Home = () => {

  const { isLoggedIn } = useAuthContextApi();

  console.log(backendUrl)


  console.log("isLoggedIn    " + isLoggedIn);




  return (
    <>




      {
        (isLoggedIn) ? (
          <div>

            <h1>thanks for login see this layouts </h1>
            <TailwindcssLayout />
          </div>

        ) : (

          <div>
            <h1>login for better experience</h1>
            <h2>sample login data </h2>
            <p>
              email : - admin1@gmail.com
              password :- admin1@gmail.com
            </p>
          </div>

        )
      }


    </>
  )
}

export default Home