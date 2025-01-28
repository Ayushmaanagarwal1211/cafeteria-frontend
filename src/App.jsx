import { Suspense, useEffect, useState, version } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landing from './components/Landing'
import { BrowserRouter, Route, Routes } from 'react-router'
import Signup from './components/authentication/Signup'
import Login from './components/authentication/Login'
import Home, { AuthNavigate } from './components/Home'
import Counters from './components/counters/Counters'
import CounterDetails from './components/counters/CounterDetails'
import { useGet } from './hooks/useGet'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserRole, setUser } from './slices/authSlice'
import UserCard from './components/users/UserCard'
import { User } from 'lucide-react'
import Users from './components/users/Users'
import Cart from './components/cart/Cart'
import ProfilePage from './components/Profile'
import Orders from './components/orders/Orders'
import OrdersHistory from './components/orders/OrdersHistory'
import Summary from './components/summary/Summary'

function App() {
  
  const role = useSelector(state=>selectUserRole(state))
  console.log(role)
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route element={<AuthNavigate/>}>
          <Route element={<Home/>} path='/home'>
            <Route path="counters" element={<Counters/>}></Route>
            <Route path='view-counter/:counterId' element={<CounterDetails/>}></Route>
            <Route path='users' element={<Suspense fallback={<h1>...Loading</h1>}><Users/></Suspense>}></Route>
            <Route path='cart' element={<Cart/>}></Route>
            <Route path='profile' element={<ProfilePage/>}></Route>
            <Route path='orders' element={<Orders/>}></Route>
            <Route path='ordershistory' element={<OrdersHistory/>}></Route>
            <Route path='summary' element={<Summary/>}></Route>

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
     {/* <Landing/> */}
    </>
  )
}

export default App
