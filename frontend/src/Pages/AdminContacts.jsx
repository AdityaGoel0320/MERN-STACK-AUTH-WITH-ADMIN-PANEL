import React, { useEffect, useState } from 'react';
import { backendUrl } from '../assets/FrontendUtils';
import { useAuthContextApi } from '../store/auth';

const AdminContacts = () => {

    const { AuthorisationToken } = useAuthContextApi();
    const [contactData, setcontactData] = useState([]);

    let getAllContactMsgDataFnc = async () => {
        let url = `${backendUrl}/api/admin/contacts`;
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: AuthorisationToken,
            },
        });

        let data = await response.json();
        console.log('Server Response:', data);

        if (response.ok) {
            console.log('Successfully contact data is loaded');
            setcontactData(data);
        } else {
            alert(data.extraDetails ? data.extraDetails : 'Enter login data properly');
        }
    };

    let deleteContactData = async(id) => {

        try {
            let url = `${backendUrl}/api/admin/contacts/delete/${id}`;
            let response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: AuthorisationToken,
                },
            });
    
            if (response.ok) {
                console.log("contact data deleted")
                getAllContactMsgDataFnc(); 
                // Update state after successful deletion
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllContactMsgDataFnc();
    }, []);





   
    return (
        <>
            <div>AdminContacts</div>

            <div className="grid gap-4 m-2  grid-cols-2 sm:grid-cols-4">

                {contactData.map((x) => {
                    let { _id, username, message, email } = x;
                    return (
                        <div key={_id} className=" min-h-[100px] text-xs md:text-xl p-4 mt-4 shadow-xl rounded-xl border-4 bg-teal-300 w-ful ">
                            <h1 >UserName : {username}</h1>
                            <h1>Email : {email}</h1>
                            <h1>Message : {message}</h1>

                            <h1 className='bg-black m-2 text-white rounded-xl block w-fit p-2'><button onClick={  ()=> deleteContactData(_id)}>Delete</button></h1>
                        </div>
                    );
                })}
            </div>



        </>





    )
}

export default AdminContacts



