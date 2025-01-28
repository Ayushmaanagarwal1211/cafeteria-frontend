import React, { useState } from 'react'
import {FaTrash,FaPenToSquare} from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../slices/authSlice'
import Modal from '../Modal'
import { ModalInnerBody } from './Counters'
import { usePost } from '../../hooks/usePost'
import { setMerchants } from '../../slices/cafeteriaSlice'
import { Navigate, useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const DishModalInnerBody=({handleAddDish})=>{
  const [formData,setFormData] = useState({name:"",price:0,inStock:true})
  function handleValueChange(e){
    const obj = {...formData}
    obj[e.target.name] = e.target.value
    setFormData(obj)
  }
  function handleSubmit(){
    handleAddDish({...formData})
  }
  return (

  <div className="p-6 space-y-4">
  <h2 className="text-2xl font-bold text-gray-800">Add Dish</h2>
  <div className="space-y-2">
    <label htmlFor="name" className="block text-sm font-medium text-gray-600">
      Dish Name
    </label>
    <input
      type="text"
      id="name"
      name="name"
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Enter Dish name"
      onChange={handleValueChange}
      value={formData.name}
    />
  </div>
  <div className="space-y-2">
    <label htmlFor="name" className="block text-sm font-medium text-gray-600">
      Price
    </label>
    <input
      type="number"
      id="price"
      name='price'
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Enter Price"
      onChange={handleValueChange}
      value={formData.price}
    />
  </div>
  <div className="space-y-2 flex gap-4">
    <label htmlFor="name" className="block text-sm font-medium text-gray-600">
      In Stock
    </label>
    <input
      type="checkbox"
      id="inStock"
      className="  border-gray-300 w-[20px] h-[20px] rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="Enter counter name"
      checked={formData.inStock}
      onChange={()=>setFormData(prev=>({...prev,inStock:!formData.inStock}))}
    />
  </div>
  <div className="flex justify-end">
    <button
      className="px-4 py-2 text-white cursor-pointer bg-indigo-600 rounded-lg hover:bg-indigo-700"
      onClick={handleSubmit}
    >
      Submit
    </button>
  </div>
</div>
  )
}

export default function CounterItem({counter,onDelete,render}) {
  const [openModal,setOpenModal] = useState(false)
  const [openDishModal,setOpenDishModal] = useState(false)
  const user = useSelector(state=>selectUser(state))
  const navigate = useNavigate()

  function closeDishModal() {
    setOpenDishModal(false);
  }

    function closeModal() {
      setOpenModal(false);
    }

     async function handleAddDish(dish){
      if(dish.name=="" ){
        return toast("Please Enter Valid Dish Name")
      }
       await usePost(`user/add-dish/${counter._id}`,dish)
        render()
        closeDishModal()
        toast("Dish Added")
      }

     function handleViewCounter(){
      if(user.role == "admin"){
        return 
      }
      return navigate(`/home/view-counter/${counter._id}`)
     }
  return (
    <>
    {openDishModal &&  <Modal modalIsOpen={openDishModal} closeModal={closeDishModal} > 
      <DishModalInnerBody handleAddDish={handleAddDish} onClose={closeDishModal}/>
    </Modal>}
   {openModal &&  <Modal modalIsOpen={openModal} closeModal={closeModal} > <ModalInnerBody render={render} isEdit={true} counter={counter}  closeModal={closeModal} />
        </Modal>}
    <div
            key={counter._id}
            onClick={handleViewCounter}
            className="bg-white cursor-pointer shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
          >

            <div className='flex w-full justify-between'>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {counter.name}
              </h2>
              {user.role == "admin" && 
              <div className='flex gap-2'>
                <FaTrash color='red' onClick={()=>onDelete(counter._id)}/>
                <FaPenToSquare color='blue' onClick={(e)=>{    e.stopPropagation()
;setOpenModal(true)}}/>
              </div>
              }
            </div>
            <div>
              <h3 className="text-lg text-gray-700 font-medium mb-2">
                Merchants:
              </h3>
              <ul className="flex flex-wrap gap-2 mb-4">
                {counter.merchants.map((merchant, index) => (
                  <li
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors"
                  >
                    {merchant.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg text-gray-700 font-medium mb-2">
                Dishes:
              </h3>
              <ul className="flex flex-wrap gap-2">
                {counter.dishes.map((dish, index) => (
                  <li
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-medium cursor-pointer hover:bg-green-200 transition-colors"
                  >
                    {dish.name}
                  </li>
                ))}
              </ul>
            </div>
           {user.role == 'merchant' &&  <button className='bg-blue-500 text-white font-semibold p-2 mt-3 rounded-lg cursor-pointer' onClick={(e)=>{e.stopPropagation();setOpenDishModal(true)}}>Add Dish</button>}
          </div>
    </>
  )
}
