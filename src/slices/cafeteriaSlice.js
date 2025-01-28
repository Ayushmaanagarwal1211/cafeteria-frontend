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
        orders : []
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
function delay(){
    return new Promise(res=>setTimeout(()=>res('sdsd'),3000))
}
// export  function fetchAndSetStateItems(url,dispatch,setItem) {
//     // dispatch(setLoading());
//     return async function (){

//         try {
//           const response = await axios("http://localhost:5000/"+url); // Replace with your API URL
//           dispatch(setItem(response.data))
//         //   dispatch(setData(data)); // Dispatch data to set in the store
//         } catch (error) {
//         //   dispatch(setError(error.message)); // Dispatch error if the API call fails
//         }
//     }
//   };
export const  {toggleSidebar, setMerchants,setUsers,setCart,toggleToast,setOrders,toggleOrderStatus} = cafeteriaSlice.actions
export default cafeteriaSlice.reducer