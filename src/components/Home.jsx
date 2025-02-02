import React, { useEffect, useState, useTransition } from 'react'
import Sidebar from './Sidebar'
import { Search, Grid2X2, Moon, Menu } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSidebar, setCart,toggleSidebar } from '../slices/cafeteriaSlice';
import { Navigate, Outlet, useLocation } from 'react-router';
import { selectUser, selectUserRole, setUser } from '../slices/authSlice';
import { useGet } from '../hooks/useGet';
import { ToastContainer, toast } from 'react-toastify';
import { FaBell } from 'react-icons/fa6';



export const AuthNavigate=()=>{
  const role = useSelector(state=>selectUserRole(state))
  const [loading,setLoading] = useState(true)

  const dispatch = useDispatch()
  useEffect(()=>{
    useGet('user/get-user')
    .then(res=>{
      dispatch(setUser(res.data))
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

return <div className="h-auto min-h-[100vh] flex  bg-gray-50 dark:bg-gray-700">
<ToastContainer theme='dark'/>

<div
  className={`
    fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform z-[1000] duration-200 ease-in-out
    lg:relative lg:transform-none dark:bg-gray-800 dark:text-white
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
  `}
>
  <Sidebar />
</div>

<div className="flex-1 flex flex-col w-full lg:w-auto abc z-[1]">
  <header className="bg-white p-4 border-b flex items-center justify-between dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center w-full justify-between space-x-4">
      <button
        className={`${
          !isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } lg:invisible p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700`}
        onClick={() => dispatch(toggleSidebar())}
      >
        <Menu size={20} className="text-gray-800 dark:text-white" />
      </button>
      <FaBell size={'2rem'} color='white' className='justify-self-end'/>
    </div>
  </header>

  <main className="flex relative bg-gray-50 bg-gray-900">
    <div className="min-w-0 w-full">
      <div className="max-w-[100%] py-8 px-1">
        {/* <AddTask />
        <TaskList onTaskSelect={() => setIsDetailsOpen(true)} isGridView={isGridView} /> */}
        <Outlet />
      </div>
    </div>

    {/* Task Details Panel */}
  </main>
</div>
</div>

}
