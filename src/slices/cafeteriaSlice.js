import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cafeteriaSlice = createSlice({
    name: "Cafeteria",
    initialState : {
        sidebar : true,
        merchants : [],
        users : [],
        counters : [],
        toast : false,
        orders : [],
        loader : false
    },
    reducers : {
        toggleSidebar : (state,action)=>{
            state.sidebar = !state.sidebar
        },
        setMerchants : (state,action) => {
            state.merchants.push(action.payload)
        },
        setUsers : (state,action)=>{
            state.users = action.payload
        },
        setCart : (state,action)=>{
            state.cart = action.payload
        },
        toggleToast : (state,action)=>{
            state.toast = action.payload
        },
        setOrders : (state,action)=>{
            state.orders = action.payload
        },
        setCounters: (state,action)=>{
            state.counters = action.payload
        },
        toggleOrderStatus : (state,action)=>{
            const {orderId,value} = action.payload
            state.orders = state.orders.map(data=>data._id == orderId ? {...data,completed : value} : data)
        },
        toggleLoader : (state,action) =>{
            state.loader = action.payload
        }
    }   

})
export function selectSidebar(state){
    return state.cafeteria.sidebar
}
export function selectMerchants(state){
    return state.cafeteria.merchants
}
export function selectUsers(state){
    return state.cafeteria.users
}
export function selectToast(state){
    return state.cafeteria.toast
}
export function selectOrders(state){
    return state.cafeteria.orders
}
export function selectLoader(state){
    return state.cafeteria.loader
}
export const  {toggleSidebar, setMerchants,setUsers,setCart,toggleToast,setOrders,toggleOrderStatus,toggleLoader} = cafeteriaSlice.actions
export default cafeteriaSlice.reducer