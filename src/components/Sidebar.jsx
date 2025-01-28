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
      <div className="h-full flex flex-col p-4 z-[10000]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            {/* <img
              src={ 'https://via.placeholder.com/40'}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            /> */}
            <span className="font-medium">Hey, {user.name}</span>
          </div>
          <button 
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={handleClose}
          >
            <X size={20} />
          </button>
        </div>
  
        <nav className="flex-1">
          {menuItems.map(({ id, label, icon ,role,path}) => role.includes(userRole) && (
           <Link to={"/home"+path} >
           <button
              key={id}
              onClick={() => {
                // dispatch(setFilter(id as any));
                // onClose();
                setCurrId(id)
              }}
              className={`w-full flex items-center space-x-3 p-2 rounded-lg mb-2 ${
                currId === id ? 'bg-green-50 text-green-600' : 'hover:bg-gray-50'
              }`}
            >
              <icon size={20} />
              <span>{label}</span>
            </button>
           </Link>
          ))}
        </nav>
  
        
  
      </div>
    )
}
