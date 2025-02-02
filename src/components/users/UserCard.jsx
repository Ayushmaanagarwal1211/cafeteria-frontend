import React, { useState } from "react";
import { usePut } from "../../hooks/usePut";
import { toast } from "react-toastify";

const UserCard = ({user,render}) => {
  const [role, setRole] = useState(user.role);
  const put = usePut()
  async function handleChangeRole(e){
     await put(`user/change-role/${user._id}`,{role})
     render();
     toast("Role Changed Successfully")
  }
  return (
    <div className="max-w-sm min-w-[400px]  p-6 bg-blue-300 border-[1px] dark:border-gray-700 dark:bg-gray-800 text-white dark:text-gray-200 rounded-2xl shadow-xl transform hover:scale-103 transition-transform duration-200">
    <div className="text-center">
      <h2 className="text-2xl font-semibold">{user.name}</h2>
      <p className="text-sm opacity-80">{user.email}</p>
    </div>
  
    <div className="mt-6 space-y-3  ">
      <div>
        <label htmlFor="role" className=" block text-sm font-medium">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 border-[1px] border-gray-700 block w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
          aria-label="Select user role"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
          <option value="merchant">Merchant</option>
        </select>
      </div>
    </div>
  
    <button
      onClick={handleChangeRole}
      className="mt-6 w-full cursor-pointer py-2 bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700 rounded-lg shadow-md text-white font-semibold transition-all duration-300"
      aria-label="Save user role"
    >
      Save Role
    </button>
  </div>
  

  );
};

export default UserCard;
