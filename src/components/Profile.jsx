import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../slices/authSlice";
import { usePut } from "../hooks/usePut";
import Modal from "./Modal";
import { toast } from "react-toastify";
function ProfileModalInnerBody({ closeModal,id}){
    const [password,setPassword] = useState('')
    const [confirmPass,setConfirmPass] = useState('')
    const put = usePut()
    async function handleSubmit(){
        if(confirmPass !== password || password.length==0){
            return 
        }
        await put(`user/change-pass/${id}`,{password})
        closeModal()
        toast("Password Changed")
    }
        return (
          <div className="p-6 space-y-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Change Password</h2>
  
  <div className="space-y-2">
    <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
      Password
    </label>
    <input
      type="password"
      id="name"
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 dark:text-white"
      placeholder="Enter Password"
      onChange={(e) => setPassword(e.target.value)}
      value={password}
    />
  </div>

  <div className="space-y-2">
    <label htmlFor="confirmPass" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
      Confirm Password
    </label>
    <input
      type="password"
      id="confirmPass"
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-400 dark:text-white"
      placeholder="Confirm Password"
      onChange={(e) => setConfirmPass(e.target.value)}
      value={confirmPass}
    />
  </div>

  <div className="flex justify-end">
    <button
      className="cursor-pointer px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
      onClick={handleSubmit}
    >
      Submit
    </button>
  </div>
</div>

        );
      
}
const ProfilePage = () => {
  const user = useSelector(state=>selectUser(state))
 const [openModal,setOpenModal] = useState(false)
  
  function closeModal() {
    setOpenModal(false);
  }


  return (
    <>
    <Modal  modalIsOpen={openModal} closeModal={closeModal}><ProfileModalInnerBody id={user._id} closeModal={closeModal} /></Modal>
    <div className="min-h-screen flex justify-center px-4 dark:bg-gray-900">
  <div className="bg-white h-auto border-[1px] border-gray-700 dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-8">
    <div className="text-center mb-6">
      {/* Profile Avatar */}
      {/* <img
        src="https://via.placeholder.com/100"
        alt="Profile Avatar"
        className="w-24 h-24 rounded-full mx-auto shadow-lg border-4 border-purple-500"
      /> */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">{user.name}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
      <span className="mt-2 inline-block px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded-full dark:bg-purple-600 dark:text-purple-200">
        {user.role}
      </span>
    </div>

    <div className="space-y-4">
      {/* Edit Password */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
          Password
        </label>
        <button
          onClick={() => setOpenModal(true)}
          className="cursor-pointer mt-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all dark:bg-purple-700 dark:hover:bg-purple-600"
        >
          Edit Password
        </button>
      </div>

      {/* User Information */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
          Name
        </label>
        <div className="mt-1 p-2 bg-gray-100 rounded-lg text-gray-700 dark:bg-gray-700 dark:text-white">
          {user.name}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
          Email
        </label>
        <div className="mt-1 p-2 bg-gray-100 rounded-lg text-gray-700 dark:bg-gray-700 dark:text-white">
          {user.email}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
          Role
        </label>
        <div className="mt-1 p-2 bg-gray-100 rounded-lg text-gray-700 dark:bg-gray-700 dark:text-white">
          {user.role}
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default ProfilePage;
