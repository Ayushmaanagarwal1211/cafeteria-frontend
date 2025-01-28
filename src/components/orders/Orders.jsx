import React, { useEffect, useState } from 'react'
import { useGet } from '../../hooks/useGet';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../slices/authSlice';
import { selectOrders, setOrders, toggleOrderStatus } from '../../slices/cafeteriaSlice';
import { usePut } from '../../hooks/usePut';
import { toast } from 'react-toastify';
import { usePagination } from './OrdersHistory';
// import { genPaginationStructure } from './OrdersHistory';

export default function Orders() {
  return (
    <OrdersPage/>
  )
}

const OrdersPage = () => {
    const orders = useSelector(state=>selectOrders(state))
  const [structure,currPage,pagination] = usePagination()

  const user = useSelector(state=>selectUser(state))
  async function handleChangeStatus(orderId){
    usePut(`order/change-status/${orderId}`).then(res=>{dispatch(toggleOrderStatus({orderId,value : res.data}));toast("Mark As Completed");fetchData(currPage)})
  }
  const dispatch = useDispatch()
  function fetchData(page){
    useGet(user.role=="customer" ? `order/get-orders-by-user/${user._id}/incomplete?page=${page}`:`order/get-orders/incomplete?page=${page}`).then(res=>{
      let {curr_page_result}  = res.data
      console.log(curr_page_result)
      curr_page_result  =curr_page_result.filter(data=>data.counter && data.dish)
        dispatch(setOrders(curr_page_result))
        pagination(res.data)
      })
  }
  useEffect(()=>{
    fetchData(currPage)
  },[])
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Orders Management
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-2 border border-gray-300 text-left">Dish Name</th>
                <th className="px-4 py-2 border border-gray-300 text-left">User Name</th>
                <th className="px-4 py-2 border border-gray-300 text-left">User Email</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Quantity</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Counter Name</th>
                <th className="px-4 py-2 border border-gray-300 text-center">
                  Order Completed
                </th>
               {user.role=="merchant" &&  <th className="px-4 py-2 border border-gray-300 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100 transition-all">
                  <td className="px-4 py-2 border border-gray-300">{order.dish?.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{order.user.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{order.user.email}</td>
                  <td className="px-4 py-2 border border-gray-300 text-center">{order.quantity}</td>
                  <td className="px-4 py-2 border border-gray-300">{order.counter?.name}</td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        order.completed
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.completed ? "Yes" : "No"}
                    </span>
                  </td>
                {user.role=="merchant" &&   <td className="px-4 py-2 border border-gray-300 text-center">
                    <button
                      onClick={() => handleChangeStatus(order._id)}
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
                    >
                      {order.completed ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                  </td>}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-7 gap-2">
  {/* Previous Button */}
  <button
    onClick={() => fetchData(currPage - 1)}
    disabled={currPage === 1}
    className={`px-4 py-2 rounded-md shadow ${
      currPage === 1
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-blue-500 text-white hover:bg-blue-600"
    } transition-all`}
  >
    Previous
  </button>

  {structure.map((data) => (
    <button
      key={data}
      onClick={() => fetchData(data)}
      className={`px-4 py-2 rounded-md shadow ${
        data === currPage
          ? "bg-blue-600 text-white"
          : "bg-blue-100 text-blue-500 hover:bg-blue-300"
      } transition-all`}
    >
      {data}
    </button>
  ))}

  <button
    onClick={() => fetchData(currPage + 1)}
    disabled={currPage === structure.length}
    className={`px-4 py-2 rounded-md shadow ${
      currPage === structure.length
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-blue-500 text-white hover:bg-blue-600"
    } transition-all`}
  >
    Next
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

