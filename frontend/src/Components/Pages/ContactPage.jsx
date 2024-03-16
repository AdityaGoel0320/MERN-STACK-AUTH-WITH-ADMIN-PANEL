import React, { useEffect, useState } from 'react';
import { backendUrl } from '../../assets/FrontendUtils';
import { useAuthContextApi } from '../../store/auth';

const ContactPage = () => {
  const [contactDefaultData, setcontactDefaultData] = useState({ username: '', email: '', message: '' });
  const { userLoginedData } = useAuthContextApi();
  const [userData, setuserData] = useState(true);

  if (userData && userLoginedData) {
    setcontactDefaultData({
      username: userLoginedData.username,
      email: userLoginedData.email,
      message: "",
    });
    setuserData(false);
  }



  let handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setcontactDefaultData((prevcontactDefaultData) => ({ ...prevcontactDefaultData, [name]: value }));
    console.log(contactDefaultData);
  };

  let sendContactData = async (e) => {
    e.preventDefault();

    console.log('btn clicked');
    let { username, email, message } = contactDefaultData;

    console.log(contactDefaultData);
    let url = `${backendUrl}/api/form/contact`;
    console.log('contact form url is = ' + url);
    try {
      let res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, message }),
      });

      let data = await res.json();
      console.log('data' + data);
      if (!data) {
        alert('message not sent');
      } else {
        alert('message sent successfully');
      }
    } catch (error) {
      console.error(error);
      window.alert('Network Error: Unable to reach the server.');
    }

    console.log('first');
  };

  return (
    <>
      <form onSubmit={sendContactData} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Get in Touch</h1>

        <input
          type="text"
          placeholder="Username"
          name="username"
          required={true}
          value={contactDefaultData.username}
          onChange={handleInputs}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          required={true}
          value={contactDefaultData.email}
          onChange={handleInputs}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />

        <textarea
          rows="5"
          placeholder="Type your message"
          name="message"
          required={true}
          value={contactDefaultData.message}
          onChange={handleInputs}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        >
          Submit Contact Form
        </button>
      </form>
    </>
  );
};

export default ContactPage;
