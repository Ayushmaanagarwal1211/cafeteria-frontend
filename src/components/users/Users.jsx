import React, { Suspense, use, useEffect, useState } from 'react'
import { useGet } from '../../hooks/useGet'
import UserCard from './UserCard'
import {useSelector } from 'react-redux'
import { selectUser } from '../../slices/authSlice'
import Skeleton from '../Skeleton'
import { useRender } from '../counters/Counters'
function LoadUsers({promise,render}){
    const fetched_users  =use(promise)
    const users = fetched_users.data
    const currUser = useSelector(state=>selectUser(state))
  return (
    <>
        <div className='flex flex-wrap gap-4 w-full h-auto justify-around '>
            {
                users?.map(user=>user._id !== currUser._id && <UserCard render={render} key={user._id}  user={user}/>)
            }
        </div>
    </>
  )
}

export default function Users() {
  const [promise,setPromise] = useState(useGet('user/get-users'))
  const render = useRender(setPromise,'user/get-users')

   return (
    <>
    <div className="dark:bg-gray-900 h-auto min-h-[100vh] p-6 rounded-xl">
  <h1 className="text-3xl font-bold text-white dark:text-gray-200 mb-8 text-center">
    Users
  </h1>
  <Suspense fallback={<Skeleton />}>
    <LoadUsers render={render} promise={promise} />
  </Suspense>
</div>

    </>
   )
}
