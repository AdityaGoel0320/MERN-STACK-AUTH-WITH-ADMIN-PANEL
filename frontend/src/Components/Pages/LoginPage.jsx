import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { backendUrl } from '../../assets/FrontendUtils';
import { useAuthContextApi } from '../../store/auth';


import { ToastContainer, toast } from 'react-toastify';




const LoginPage = () => {
    let { storeTokenInLS } = useAuthContextApi();

    const [user, setuser] = useState(
        {
            email: "",
            password: "",
        }
    );


    let onchange = (e) => {

        const { name, value } = e.target;

        setuser((predata) => {
            return {
                ...predata,
                [name]: value,
            }

        })


    }

    let navigate = useNavigate();

    let postData = async (e) => {
        e.preventDefault();
        console.log("btn clicked");

        let { email, password } = user;

        console.log(user);

        let url = `${backendUrl}/api/auth/login`;
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        let data = await response.json();
        console.log("Server Response:", data.message);

        if (response.ok) {

            storeTokenInLS(data.jwtToken)
            console.log("Login successful");


            toast.success("login succesfull",
                {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            );


            navigate("/");

        } else {

            // alert(data.extraDetails ? data.extraDetails : "enter login data properly")

            toast.error(`${data.extraDetails ? data.extraDetails : "enter login data properly"}`,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            );






        }
    };


    return (
        <>
            <div className="container mx-auto mt-8">
                <form className="max-w-md mx-auto p-4 border rounded-md shadow-md" method='POST'>


                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            id="email"
                            value={user.email}
                            onChange={onchange}
                            required
                            autoComplete="off"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>



                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="text"
                            name="password"
                            placeholder="Enter your password"
                            id="password"
                            value={user.password}
                            onChange={onchange}
                            required
                            autoComplete="off"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md" onClick={postData} >
                        Login Now
                    </button>
                </form>
            </div>
        </>
    )
}

export default LoginPage