import React, { useEffect, useState, useTransition } from 'react'
import Sidebar from './Sidebar'
import { Search, Grid2X2, Moon, Menu } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSidebar, setCart,toggleSidebar } from '../slices/cafeteriaSlice';
import { Navigate, Outlet, useLocation } from 'react-router';
import { selectUser, selectUserRole, setUser } from '../slices/authSlice';
import { useGet } from '../hooks/useGet';
import { ToastContainer, toast } from 'react-toastify';



export const AuthNavigate=()=>{
  const role = useSelector(state=>selectUserRole(state))
  const [loading,setLoading] = useState(true)

  const dispatch = useDispatch()
  useEffect(()=>{
    useGet('user/get-user')
    .then(res=>{
      dispatch(setUser(res.data))
      console.log(res.data)
      setLoading(false)
    }).catch(err=>{
      setLoading(false)
    })
  },[])
  if(!loading){
    return role ? <Outlet/> :<Navigate to={'/login'}/>
  }
  <></>
}

export default function Home() {
    const isSidebarOpen = useSelector(state=>selectSidebar(state))
  const dispatch= useDispatch()

return <div className="flex h-screen bg-gray-50">
  <ToastContainer/>
{/* Mobile sidebar overlay */}
{isSidebarOpen && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
    onClick={() => dispatch(toggleSidebar())}
  />
)}

{/* Sidebar */}
<div className={`
  fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-200 ease-in-out
  lg:relative lg:transform-none
  ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
`}>
  <Sidebar   />
</div>

{/* Main content */}
<div className="flex-1 flex flex-col w-full lg:w-auto">
  <header className="bg-white p-4 border-b flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <button 
        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        onClick={() =>dispatch(toggleSidebar())}
      >
        <Menu size={20} />
      </button>
      
    </div>
   
  </header>

  <main className="overflow-auto flex relative">
    <div className="min-w-0 w-full">
      <div className="max-w-[100%]  py-8 px-1">
        {/* <AddTask />
        <TaskList onTaskSelect={() => setIsDetailsOpen(true)} isGridView={isGridView} /> */}
  <Outlet/>
      </div>
    </div>

    {/* Task Details Panel */}
  </main>
</div>
</div>
}
