import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { backendUrl } from '../../assets/FrontendUtils';
import { useAuthContextApi } from '../../store/auth';

const AdminUpdate = () => {
    const { AuthorisationToken } = useAuthContextApi();
    const [DefaultUserData, setDefaultUserData] = useState({
        username: '',
        email: '',
        phone: '',
    });

    const { id } = useParams(); // Get the user ID from the URL parameters

    const getSingleUserData = async (id) => {
        try {
            let url = `${backendUrl}/api/admin/users/${id}`;
            console.log(url);
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: AuthorisationToken,
                },
            });

            let data = await response.json();
            console.log('Server Response:', data.username);

            setDefaultUserData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleUserData(id); // Pass the user ID to the function
    } , []);



    let handleInputTag = (e)=>{
        console.log("dsifjsdbfidfbidfbisrfir")
        let name = e.target.name;
        let value = e.target.value;
        setDefaultUserData({ ...DefaultUserData, [name]: value } )  ; 
    }



    let navigate = useNavigate();

    let sendUpdateData = async (e) => {
        e.preventDefault();
    
        console.log('btn clicked');
        let { username, email, phone } =DefaultUserData    ; 
    
        let url = `${backendUrl}/api/admin/users/update/${id}`;
        console.log("user update api hitting is  :- "  + url)
       

        try {
            let res = await fetch(url, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: AuthorisationToken,
              },
              body: JSON.stringify({ username, email,phone }),
            });
      
            let data = await res.json();
            console.log('data' + data);
            if (!data) {
              alert('message not sent');
            } else {
              alert('message sent successfully');

            navigate("/admin/users");

            }
          } catch (error) {
            console.error(error);
            window.alert('Network Error: Unable to reach the server.');
          }
    
        console.log('first');
      };
    
    
    return (
        <>
            <form className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">Update user data</h1>

                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    required={true}
                    value={DefaultUserData.username}
                    onChange={handleInputTag}

                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    required={true}
                    value={DefaultUserData.email}
                    onChange={handleInputTag}

                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />

                <input
                    type="text"
                    placeholder="phone"
                    name="phone"  // Corrected the name attribute to "phone"
                    required={true}
                    value={DefaultUserData.phone}
                    onChange={handleInputTag}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />




                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    onClick={sendUpdateData}
                >
                    Update user data
                </button>
            </form>
        </>
    );
};

export default AdminUpdate;
