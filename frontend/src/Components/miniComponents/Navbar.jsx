import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContextApi } from '../../store/auth';

const Navbar = () => {
  let { isLoggedIn, userLoginedData, isAdmin } = useAuthContextApi();


  console.log("isAdmin ========" + userLoginedData)




  return (
    <section>
      <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <NavLink to="/" className="font-semibold text-xl tracking-tight">
            Logo
          </NavLink>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <NavLink
              to="/"
              activeClassName="text-white"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
            >
              HOME
            </NavLink>
            <NavLink
              to="/contact"
              activeClassName="text-white"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4"
            >
              CONTACT
            </NavLink>


          </div>
          <div>
            {!isLoggedIn ? (
              <div>
                <NavLink
                  to="/login"
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
                >
                  LOGIN
                </NavLink>
                <NavLink
                  to="/register"
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0 ml-2"
                >
                  REGISTER
                </NavLink>
              </div>
            ) : (
              <div>


                <NavLink
                  to="/about"
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0 ml-2"
                >
                  ABOUT
                </NavLink>

                <NavLink
                  to="/logout"
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
                >
                  LOGOUT
                </NavLink>

                {
                  (isAdmin) ? (
                    <NavLink
                      to="/dash"
                      className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
                    >
                      DASH
                    </NavLink>) : null
                }


              </div>
            )}
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
