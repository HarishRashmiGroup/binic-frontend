import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { Login } from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ResetPassword } from './components/ResetPassword';
import CreateUser from './components/CreateUser';
import AdminDashboard from './components/AdminDashboard';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/admin" element={<AdminDashboard />}></Route>
      <Route path="/home" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  </BrowserRouter>
);
export default App;