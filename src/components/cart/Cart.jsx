import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCartCount, removeCartProduct, selectCart, selectUser, setUser, setUserCartToZero } from '../../slices/authSlice'
import { usePut } from '../../hooks/usePut';
import { usePost } from '../../hooks/usePost';
import { toast } from 'react-toastify';
import dish from './dish.webp'
export default function Cart() {
    const cartItems = useSelector(state=>selectCart(state))
    const post = usePost()
  const put = usePut()
    const dispatch = useDispatch()
const user = useSelector(state=>selectUser(state))
    async function handleDecreaseQuantity(count, dishId){
        if(count == 1){
            return handleRemoveCart(dishId)
        }
        await put(`cart/change-product-count/${dishId}`,{change : -1})
        dispatch(changeCartCount({dishId,change:-1}))
    }
    async function handleIncreaseCounter(dishId){
        await put(`cart/change-product-count/${dishId}`,{change : 1})
        dispatch(changeCartCount({dishId,change:1}))
    }
    async function handleRemoveCart(dishId){
       
        await put(`cart/remove-product-from-cart/${dishId}`,{})
        dispatch(removeCartProduct({dishId}))
    }
    async function handleOrder(){
      const orders = []

     for(let i of cartItems){
      orders.push({dish:i.dish._id,counterId : i.dish.counter,quantity:i.count})
      
    }
    await post(`order/add-order`,{orders})
    await put(`user/remove-all-cart-products/${user._id}`).then(res=>{
      toast("All Items Ordered Successfully")
      dispatch(setUser(res.data))
    })
    }
  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
      Your Cart
    </h2>
  
    {cartItems.length === 0 ? (
      <p className="text-center text-lg text-gray-600 dark:text-gray-400">
        Your cart is empty
      </p>
    ) : (
      cartItems?.map((item) => (
        <div key={item._id} className="flex justify-between items-center py-4 border-b border-gray-300 dark:border-gray-600">
          <div className="flex items-center">
            <img
              src={dish}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg mr-4"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
                {item.dish?.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                ${item.dish?.price}
              </p>
            </div>
          </div>
  
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <button
                onClick={() => handleDecreaseQuantity(item.count, item._id)}
                className="cursor-pointer px-3 py-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                -
              </button>
              <span className="px-4 text-gray-900 dark:text-gray-200">
                {item.count}
              </span>
              <button
                onClick={() => handleIncreaseCounter(item._id)}
                className="cursor-pointer px-3 py-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                +
              </button>
            </div>
  
            <button
              onClick={() => handleRemoveCart(item._id)}
              className="cursor-pointer px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition"
            >
              Remove
            </button>
          </div>
        </div>
      ))
    )}
  
    {cartItems.length > 0 && (
      <div className="mt-6 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
          Total
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          ${cartItems.reduce((total, item) => total + item.dish?.price * item.count, 0).toFixed(2)}
        </p>
      </div>
    )}
  
    <button
      className="w-full mt-6 py-3 bg-blue-500 dark:bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
      onClick={handleOrder}
    >
      Order Now
    </button>
  </div>
  
  )
}
