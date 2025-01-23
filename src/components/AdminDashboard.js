import React from 'react';
import CreateUser from './CreateUser';
import { Header } from './Dashboard';
import CourseUrlChange from './CourseUrlChange';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header userName={''} />

      {/* Content Section */}
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Render Components */}
          <div className=" bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create User</h2>
            <CreateUser />
          </div>
          <div className=" bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Course URL Management</h2>
            <CourseUrlChange />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
