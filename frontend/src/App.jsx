import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/Pages/HomePage';
import ContactPage from './Components/Pages/ContactPage';
import LoginPage from './Components/Pages/LoginPage';
import RegisterPage from './Components/Pages/RegisterPage';
import AboutPage from './Components/Pages/AboutPage';
import ServicePage from './Components/Pages/ServicePage';
import Error404Page from './Components/Pages/Error404Page';
import Footer from './Components/miniComponents/Footer';
import "./App.css";
import Logout from './Components/Pages/Logout';
import Admin_Layout from './Components/Layouts/Admin_Layout';
import AdminUser from './Components/Pages/AdminUser';
import AdminContacts from './Components/Pages/AdminContacts';
import AdminServices from './Components/Pages/AdminServices';
import AdminUpdate from './Components/Pages/AdminUpdate';
import Navbar from './Components/miniComponents/Navbar';
import DasgBoard from './Components/Pages/DasgBoard';

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
          <Route path="/dash" element={<DasgBoard/>} />
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
