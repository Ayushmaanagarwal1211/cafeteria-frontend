import React, { useEffect, useState } from 'react'
import { useGet } from '../../hooks/useGet';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router';
import { FaTrash } from 'react-icons/fa6';
import { usePost } from '../../hooks/usePost';
import { usePut } from '../../hooks/usePut';
import { useDelete } from '../../hooks/useDelete';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole, setUser } from '../../slices/authSlice';
import { CounterDetailsSkeleton } from '../Skeleton';
import { toast } from 'react-toastify';

export default function CounterDetails() {
     // Dummy data for the Counter
  const [counter,setCounter] = useState({
    _id: 1,
    name: "",
    merchants: [],
    dishes: [],
  })
  const [loading,setLoading] = useState(false)
  const role= useSelector(state=>selectUserRole(state))
  const {counterId} = useParams()

  async function fetchData(msg){
    setLoading(true)
    const res = await useGet(`user/view-counter/${counterId}`)
    setCounter(res.data)
    setLoading(false)
    if(msg){
      toast(msg)
    }
  }
  useEffect(()=>{
    fetchData()
  },[])

  async function handleRemoveDish(dishId){
    await useDelete(`user/remove-dish/${counterId}/${dishId}`).then(res=>{fetchData("Dish Removed");})
  }

  async function handleStockChange(inStock,dishId){
    await usePut(`user/update-dish/${dishId}`,{inStock}).then(res=>fetchData("Dish Updated Successfully"))
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("name");


  const dispatch = useDispatch()
  function handleAddDish(dish){
    usePost(`cart/add-dish/${dish._id}/${counter._id}`,{}).then(res=>{
      dispatch(setUser(res.data))
      toast("Dish Added to Cart")
    })
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {loading ? (
       <CounterDetailsSkeleton/>
      ) : (
        <div>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">{counter.name}</h1>
            <div className="flex justify-center gap-4 mt-4">
              <input
                type="text"
                placeholder="Search dishes..."
                className="px-4 py-2 border border-gray-300 rounded-lg w-80 shadow-sm focus:ring focus:ring-blue-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className='flex gap-2'>
              <input type="checkbox"></input>
              <p
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 shadow-md transition-colors"
                onClick={() => setSortType("name")}
              >
                Sort by Name
              </p>
                </div>
                <div className='flex gap-2'>
              <input type="checkbox"></input>
              <p
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 shadow-md transition-colors"
                onClick={() => setSortType("name")}
              >
                Sort by Availability
              </p>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Merchants
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                {counter.merchants.map((merchant, index) => (
                  <li key={index} className="mb-2">
                    {merchant.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Dishes
              </h3>
              {counter.dishes.length === 0 ? (
                <p className="text-gray-600">No dishes found.</p>
              ) : (
                <ul className="space-y-4">
                  {counter.dishes.map((dish, index) =>( searchTerm=="" || dish.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ) &&  (
                    <li
                      key={index}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
                    >
                      <span className="text-gray-800 font-medium">
                        {dish.name}
                      </span>
                      <div className="flex items-center gap-4">
                      {role == "merchant" ?   <label className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">In Stock</span>
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleStockChange(!dish.inStock, dish._id)
                            }
                            checked={dish.inStock}
                          />
                        </label> :dish.inStock ? <p className='text-green-400 font-semibold text-lg'>In Stock</p>:<p className='text-red-500 font-semibold text-lg'>Out Of Stock</p>} 
                      { role=="merchant" &&  <FaTrash
                          className="text-red-500 cursor-pointer hover:text-red-600"
                          onClick={() => handleRemoveDish(dish._id)}
                        />}

                      {role=="customer" && dish.inStock&&   <button
                          className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 shadow-md"
                          onClick={() => handleAddDish(dish)}
                        >
                          Add to Cart
                        </button>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
