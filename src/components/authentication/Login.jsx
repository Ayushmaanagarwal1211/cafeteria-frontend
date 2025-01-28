import axios from "axios";
import React, { useState } from "react";
import process from 'process';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../slices/authSlice";
// const BASE_URL = process.env.REACT_APP_API_BASE_URL
const Login = () => {
    const user = useSelector(state=>selectUser(state))
    const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "ayushmaan@gmail.com",
    password: "ayushmaan",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
const navigate = useNavigate()
  async function  handleSubmit (e) {
    e.preventDefault();
    if(formData.email == '' || formData.password=="" ){
        return 
    }
    const result = await axios.post(`${'https://cafeteira-backend.onrender.com'}/auth/login`,{
        ...formData
    })
    console.log(result)
    const {user,token} = result.data
    dispatch(setUser(user))
    localStorage.setItem('token',JSON.stringify(token))
    navigate('/home')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
      

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@domain.com"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              required
            />
          </div>



          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 px-4 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          >
                Login
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
