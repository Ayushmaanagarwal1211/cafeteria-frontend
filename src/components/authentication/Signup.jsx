import axios from "axios";
import React, { useState } from "react";
import process from 'process';
import { useNavigate } from "react-router";
// const BASE_URL = process.env.REACT_APP_API_BASE_URL
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "ayushmaan",
    email: "ayushmaan@gmail.com",
    password: "ayushmaan",
    confirmPassword: "ayushmaan",
    role: "Admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
const navigate = useNavigate()
  async function  handleSubmit (e) {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword || formData.email == '' || formData.name=="" || formData.password=="" || formData.role == ""){
        return 
    }
    await axios.post(`${'https://cafeteira-backend.onrender.com'}/auth`,{
        ...formData
    })
    navigate('/login')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Create an Account
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-3 text-gray-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            required
          />
        </div>
  
        {/* Email */}
        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@domain.com"
            className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-3 text-gray-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            required
          />
        </div>
  
        {/* Password */}
        <div className="mb-5">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-3 text-gray-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            required
          />
        </div>
  
        {/* Confirm Password */}
        <div className="mb-5">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-3 text-gray-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            required
          />
        </div>
  
        {/* Role */}
        <div className="mb-6">
          <label htmlFor="role" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
            Role
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-3 text-gray-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            required
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
            <option value="merchant">Merchant</option>
          </select>
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-indigo-500 dark:bg-indigo-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Sign Up
        </button>
      </form>
  
      {/* Login Link */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
        Already have an account?{" "}
        <a href="/login" className="text-indigo-500 dark:text-indigo-400 font-medium hover:underline">
          Log in
        </a>
      </p>
    </div>
  </div>
  
  );
};

export default Signup;
