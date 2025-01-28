import { createSlice } from "@reduxjs/toolkit";
import { setCart } from "./cafeteriaSlice";

const authSlice = createSlice({
    name: "Auth_Cafeteria",
    initialState : {
        user : null,
        cart : []
    },
    reducers : {
        setUser : (state,action)=>{
            state.user = action.payload
        },
        changeCartCount : (state,action)=>{
            const {dishId,change} = action.payload
            state.user.cart = state.user.cart.map(dish=>{
                console.log(dish._id,dishId)
                if(dish._id == dishId){
                    return {...dish, count : dish.count + change}
                }
                return dish
            })
        },
        removeCartProduct : (state,action)=>{
            const {dishId} = action.payload
            state.user.cart = state.user.cart.filter(dish=> dish._id !== dishId)
        },
        setUserCartToZero : (state,action)=>{
            state.user.cart = []
        }
    }

})
export function selectUser(state){
    return state.auth.user
}
export function selectUserRole(state){
    return state.auth.user?.role
}
export function selectCart(state){
    return state.auth.user.cart
}
export const  {setUser,changeCartCount,removeCartProduct,setUserCartToZero} = authSlice.actions
export default authSlice.reducer