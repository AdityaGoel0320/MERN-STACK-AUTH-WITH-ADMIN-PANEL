import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { backendUrl } from '../../assets/FrontendUtils';
import { useAuthContextApi } from '../../store/auth';


import { ToastContainer, toast } from 'react-toastify';


const RegisterPage = () => {
    let { storeTokenInLS } = useAuthContextApi();


    const [user, setuser] = useState({
        username: "",
        email: "",
        phone: "",
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
        console.log("btn clicked")

        let {
            username, email, phone, password
        } = user;

        console.log(user)

        let url = `${backendUrl}/api/auth/register`;
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, phone, password })
        })


        let data = await response.json();

        console.log(data.extraDetails)
        console.log(data.message)
        console.log("data from backend " + data)

        if (response.ok) {

            storeTokenInLS(data.jwtToken);

            // window.alert("registration successfull")

            toast.success("registration successfull",
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


            navigate("/login")
        }

        else {
            // alert(data.extraDetails ? data.extraDetails : data.message)

            // Assuming data.extraDetails is an array of error messages
            data.extraDetails.forEach(error => {
                toast.error(`${error}`,
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
            });


        }




    }

    return (
        <div className="container mx-auto mt-8">
            <form className="max-w-md mx-auto p-4 border rounded-md shadow-md" method='POST'>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        id="username"
                        value={user.username}
                        onChange={onchange}
                        required
                        autoComplete="off"
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                </div>

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
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                        Phone
                    </label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter your phone"
                        id="phone"
                        value={user.phone}
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
                    Register Now
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
