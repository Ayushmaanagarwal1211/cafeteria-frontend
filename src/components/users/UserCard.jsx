import React, { useState } from "react";
import { usePut } from "../../hooks/usePut";
import { toast } from "react-toastify";

const UserCard = ({user,render}) => {
  const [role, setRole] = useState(user.role);
  async function handleChangeRole(e){
     await usePut(`user/change-role/${user._id}`,{role})
     render();
     toast("Role Changed Successfully")
  }
  return (
    <div className="max-w-sm min-w-[400px] mx-auto p-6 bg-blue-300 text-white rounded-2xl shadow-xl transform hover:scale-103 transition-transform duration-200">
      <div className="text-center">
        <div className="mb-4">
          
        </div>
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-sm opacity-80">{user.email}</p>
      </div>

      <div className="mt-6 space-y-3">
        <div>
          <label htmlFor="role" className="block text-sm font-medium">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e)=>setRole(e.target.value)}
            className="mt-1 block w-full bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="merchant">Merchant</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleChangeRole}
        className="mt-6 w-full cursor-pointer py-2 bg-purple-700 hover:bg-purple-800 rounded-lg shadow-md text-white font-semibold transition-all duration-300"
      >
        Save Role
      </button>
    </div>
  );
};

export default UserCard;
