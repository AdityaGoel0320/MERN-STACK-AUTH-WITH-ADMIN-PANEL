import React, { useEffect, useState } from 'react';
import { backendUrl } from '../../assets/FrontendUtils';
import { useAuthContextApi } from '../../store/auth';
import { NavLink} from 'react-router-dom';

const AdminUser = () => {
    const { AuthorisationToken } = useAuthContextApi();
    const [usersData, setusersData] = useState([]);

    let getAllUserDataFnc = async () => {
        let url = `${backendUrl}/api/admin/users`;
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: AuthorisationToken,
            },
        });

        let data = await response.json();
        console.log('Server Response:', data.username);

        if (response.ok) {
            console.log('Successful');
            setusersData(data);
        } else {
            alert(data.extraDetails ? data.extraDetails : 'Enter login data properly');
        }
    };

    useEffect(() => {
        getAllUserDataFnc();
    }, []);

    let deleteUser = async (id) => {
        try {
            let url = `${backendUrl}/api/admin/users/delete/${id}`;
            let response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: AuthorisationToken,
                },
            });
    
            let data = await response.json();
            if (data.ok) {
                console.log('Server Response:', data.message);
                
                // Update state after successful deletion
                setusersData(prevUsersData => prevUsersData.filter(user => user._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <>
            <div className="bg-gray-800 text-white p-4">AdminUser</div>

            <div className="grid gap-4 m-2  grid-cols-2 sm:grid-cols-4">

                {usersData.map((x) => {
                    let { _id, username, phone, email, isAdmin } = x;
                    return (
                        <div key={_id} className=" min-h-[100px] text-xs md:text-xl p-4 mt-4 shadow-xl rounded-xl border-4 bg-teal-300 w-ful ">
                            <h1 >UserName : {username}</h1>
                            <h1>Email : {email}</h1>
                            <h1>Phone : {phone}</h1>
                            <h1>Role : {isAdmin ? 'Admin' : 'User'}</h1>

                            <h1 className='bg-black m-2 text-white rounded-xl block w-fit p-2'>
                                <NavLink to={`/admin/users/${_id}/edit`}>update</NavLink>
                            </h1>


                            <h1 className='bg-black m-2 text-white rounded-xl block w-fit p-2' onClick={() => deleteUser(_id)}><button>Delete</button></h1>
                        </div>
                    );
                })}
            </div>

        </>
    );
};

export default AdminUser;
