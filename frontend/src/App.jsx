import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ContactPage from './Pages/ContactPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import AboutPage from './Pages/AboutPage';
import ServicePage from './Pages/ServicePage';
import Error404Page from './Pages/Error404Page';
import Footer from './Components/miniComponents/Footer';
import "./App.css";
import Logout from './Pages/Logout';
import Admin_Layout from './Components/Layouts/Admin_Layout';
import AdminUser from './Pages/AdminUser';
import AdminContacts from './Pages/AdminContacts';
import AdminServices from './Pages/AdminServices';
import AdminUpdate from './Pages/AdminUpdate';
import Navbar from './Components/miniComponents/Navbar';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />


          <Route path = "users/:id/edit"  element = {<AdminUpdate/>} />


          <Route path="*" element={<Error404Page />} />

          <Route path = "/admin" element={<Admin_Layout/>}>
            <Route path = "users"  element = {<AdminUser/>} />
            <Route path = "contacts"  element = {<AdminContacts/>} />
            <Route path = "services"  element = {<AdminServices/>} />
            <Route path = "users/:id/edit"  element = {<AdminUpdate/>} />

          </Route>


        </Routes>

        
      </div>
    </div>
  );
};

export default App;
