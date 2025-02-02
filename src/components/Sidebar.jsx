import React, { useState } from 'react'
import { ListTodo, Calendar, Star, ClipboardList, Users, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../slices/cafeteriaSlice';
import { selectUser, selectUserRole } from '../slices/authSlice';
import { Link, useLocation } from 'react-router';
export default function Sidebar() {
  const userRole = useSelector(state=>selectUserRole(state))
  const user = useSelector(state=>selectUser(state))
    const location = useLocation()
    const menuItems = [
      { id: 'Counters', label: 'Counters', icon: ListTodo,role : ['customer','admin',"merchant"] ,path:'/counters'},
      { id: 'Cart', label: 'Cart', icon: ListTodo,role : ['customer'] ,path:"/cart"},
      { id: 'Order History', label: 'Order History', icon: ListTodo,role : ['customer',"merchant"],path:"/ordershistory" },
      { id: 'users', label: 'users', icon: Calendar ,role : ['admin'],path:"/users" },
      // { id: 'merchants', label: 'Merchants', icon: Star,role : ['admin'] ,path:"/merchants"  },
      { id: 'orders', label: 'Orders', icon: ClipboardList,role : ['merchant',"customer"],path:"/orders"  },
      { id: 'summary', label: 'Summary', icon: Users ,role:["merchant"],path:"/summary" },
      { id: 'profile', label: 'Profile', icon: Users ,role:["merchant","customer",'admin'],path:"/profile" },

    ];
    const [currId,setCurrId] = useState("")
    const dispatch = useDispatch()
    function handleClose(){
        dispatch(toggleSidebar())
    }
    return (
      <div className="h-auto min-h-[100vh] flex flex-col p-4 z-[1000] bg-gray-900 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-2xl  text-white dark:text-gray-200">Hey, {user.name}</span>
        </div>
        <button 
          className="lg:hidden p-2 hover:bg-gray-700 rounded-lg"
          onClick={handleClose}
        >
          <X size={20} className="text-white dark:text-gray-200"/>
        </button>
      </div>
    
      <nav className="flex-1">
        {menuItems.map(({ id, label, icon, role, path }) => role.includes(userRole) && (
          <Link to={"/home" + path} key={id}>
            <button
              onClick={() => {
                setCurrId(id);
              }}
              className={ `font-semibold text-xl cursor-pointer w-full flex items-center space-x-3 p-2 rounded-lg mb-2 ${
                currId === id ? 'bg-green-600 text-white' : 'hover:bg-gray-700 hover:text-white'
              }`}
            >
              <icon size={20} className="text-white dark:text-gray-200"/>
              <span className="text-white dark:text-gray-200">{label}</span>
            </button>
          </Link>
        ))}
      </nav>
    </div>
    
    )
}
