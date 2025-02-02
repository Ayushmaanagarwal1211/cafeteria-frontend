import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCartCount, removeCartProduct, selectCart, selectUser, setUser, setUserCartToZero } from '../../slices/authSlice'
import { usePut } from '../../hooks/usePut';
import { usePost } from '../../hooks/usePost';
import { toast } from 'react-toastify';
import dish from './dish.webp'
export default function Cart() {
    const cartItems = useSelector(state=>selectCart(state))
    const dispatch = useDispatch()
const user = useSelector(state=>selectUser(state))
    async function handleDecreaseQuantity(count, dishId){
        if(count == 1){
            return handleRemoveCart(dishId)
        }
        await usePut(`cart/change-product-count/${dishId}`,{change : -1})
        dispatch(changeCartCount({dishId,change:-1}))
    }
    async function handleIncreaseCounter(dishId){
        await usePut(`cart/change-product-count/${dishId}`,{change : 1})
        dispatch(changeCartCount({dishId,change:1}))
    }
    async function handleRemoveCart(dishId){
       
        await usePut(`cart/remove-product-from-cart/${dishId}`,{})
        dispatch(removeCartProduct({dishId}))
    }
    async function handleOrder(){
      const orders = []

     for(let i of cartItems){
      orders.push({dish:i.dish._id,counterId : i.dish.counter,quantity:i.count})
      
    }
    await usePost(`order/add-order`,{orders})
    await usePut(`user/remove-all-cart-products/${user._id}`).then(res=>{
      toast("All Items Ordered Successfully")
      dispatch(setUser(res.data))
    })
    }
  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty</p>
      ) : (
        cartItems?.map((item) => (
          <div key={item._id} className="flex justify-between items-center py-4 border-b">
            <div className="flex items-center">
              <img src={dish} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
              <div>
                <h3 className="text-xl font-semibold">{item.dish?.name}</h3>
                <p className="text-gray-600">${item.dish?.price}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <button
                  onClick={() => handleDecreaseQuantity(item.count,item._id)}
                  className="px-3 py-1 bg-gray-300 rounded-lg"
                >
                  -
                </button>
                <span className="px-4">{item.count}</span>
                <button
                  onClick={() => handleIncreaseCounter(item._id)}
                  className="px-3 py-1 bg-gray-300 rounded-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemoveCart(item._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Total</h3>
          <p className="text-2xl font-bold">${cartItems.reduce((total, item) => total + item.dish?.price * item.count, 0).toFixed(2)}</p>
        </div>
      )}
      <button className='p-2 bg-blue-400 text-white rounded-xl cursor-pointer' onClick={handleOrder}>Order Now </button>
    </div>
  )
}
