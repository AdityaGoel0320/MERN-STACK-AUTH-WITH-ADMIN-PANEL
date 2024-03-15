import React from 'react';
import { useAuthContextApi } from '../store/auth';

const ServicePage = () => {
  const { serviceData } = useAuthContextApi();

  return (
    <div className="container mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {serviceData.map((service) => (
        <div key={service._id} className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">{service.service}</h1>
          <p className="text-gray-700 mb-2">{service.description}</p>
          <p className="text-purple-600 font-bold mb-2">{service.price}</p>
          <p className="text-gray-500">{service.provider}</p>
        </div>
      ))}
    </div>
  );
};

export default ServicePage;
