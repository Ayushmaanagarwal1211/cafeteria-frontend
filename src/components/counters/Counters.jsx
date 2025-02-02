import React, { Suspense, use, useCallback, useEffect, useMemo, useState } from "react";
import CounterItem from "./CounterItem";
import { useGet } from "../../hooks/useGet";
import Modal from "../Modal";
import { usePost } from "../../hooks/usePost";
import { selectUser } from "../../slices/authSlice";
import { useDelete } from "../../hooks/useDelete";
import Skeleton from "../Skeleton";
import { toast } from "react-toastify";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";


export function useRender(setPromise,url){
  return function (){
    setPromise(useGet(url))
  }
}

const CounterSection = React.memo(({promise,searchQuery,render})=>{
    const result = use(promise)
    const user = useSelector(state=>selectUser(state))
    const counters = result.data
  const deleteHook = useDelete()
    async function handleCounterDelete(id){
      const res = await deleteHook(`user/delete-counter/${id}`)
      render()
      toast("Counter Deleted")
    }
      return (
      counters.length>0 ?   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        { counters.map((counter,index) =>(user.role=="admin" || user.role=="customer" ||
         (counter.merchants.find(merchant=>merchant._id == user._id))) &&
         (searchQuery.length==0 || counter.dishes.find(dish=>dish.name.toLowerCase().startsWith(searchQuery.toLowerCase()))) &&  
           (
          <CounterItem key={counter._id} render={render}  onDelete={handleCounterDelete} counter={counter} id={index}/>
        )) }
      </div>:  <div className="font-bold text-2xl text-center flex items-center h-[200px] w-full justify-center">No Counters </div>
      )
})

export const ModalInnerBody = ({closeModal, isEdit,counter,render}) => {
  const [counterName,setCounterName] = useState(isEdit?counter.name:"")
  const [selectedMerchants,setSelectedMerchants] = useState(isEdit?counter.merchants:[])

  function handleSelectMerchant(merchant){
    setSelectedMerchants(prev=>[...prev,{name:merchant.name, _id:merchant._id}])
  }
  const post = usePost()
  async function handleSubmit(e){
    if(counterName.length==0){
      return toast("Please Enter Valid Counter Name")
    }
    const result = await post(`${isEdit?`user/edit-counter/${counter._id}`:"user/add-counter"}`,{name:counterName,merchants:selectedMerchants})
    render()
    closeModal()
    toast(isEdit?"Counter Updated Successfully":"Counter Added Successfully")
  }

  const  handleMerchantRemove=useCallback((merchant)=>{
    let arr = selectedMerchants
    arr =arr.filter(data=>data._id !== merchant._id)
    setSelectedMerchants(arr)
  })

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
    {/* Heading */}
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
      {isEdit ? "Edit Counter" : "Add Counter"}
    </h2>
  
    {/* Counter Name Input */}
    <div className="space-y-2">
      <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
        Counter Name
      </label>
      <input
        type="text"
        id="name"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter counter name"
        onChange={(e) => setCounterName(e.target.value)}
        value={counterName}
        aria-label="Counter Name"
      />
    </div>
  
    {/* Select Merchants */}
    <div className="space-y-2">
      <label htmlFor="merchants" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
        Select Merchants
      </label>
      <select
        id="merchants"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select a merchant</option>
        <MerchantList handleClick={handleSelectMerchant} selectedMerchants={selectedMerchants} />
      </select>
  
      {/* Selected Merchants Display */}
      <div className="w-full flex flex-wrap gap-2">
        {selectedMerchants.map((data) => (
          <div
            key={data._id}
            className="px-3 py-2 bg-blue-500 dark:bg-blue-700 w-auto flex items-center text-white rounded-md"
          >
            {data.name}
            <button
              onClick={() => handleMerchantRemove(data)}
              className="ml-2 text-sm underline hover:text-red-300 transition"
              aria-label={`Remove ${data.name}`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  
    {/* Submit Button */}
    <div className="flex justify-end">
      <button
        className="px-4 py-2 text-white cursor-pointer bg-indigo-600 rounded-lg hover:bg-indigo-700 transition focus:ring-2 focus:ring-indigo-400"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  </div>
  
  );
};


const  MerchantList=React.memo(({handleClick,selectedMerchants})=>{
  const [merchants,setMerchants] = useState([])
  
  useEffect(()=>{
    useGet('user/get-merchants').then(res=>{setMerchants(res.data)})
  },[])
  return (
    <>
      {
  merchants.map((merchant) => 
    !selectedMerchants.find((data) => data._id === merchant._id) && (
      <option
        key={merchant._id} 
        onClick={() => handleClick(merchant)}
      >
        {merchant.name}
      </option>
    )
  )
}

    </>
  )
})


const Counters = () => {
  
  const user = useSelector(state=>selectUser(state))
  const [promise,setPromise] = useState(useGet('user/get-counters')) 
  const render = useRender(setPromise,'user/get-counters')

  const [openModal,setOpenModal] = useState(false)
  const [searchQuery,setSearchQuery] = useState('')
  function closeModal() {
    setOpenModal(false);
  }

  return (
    <>
  {openModal &&   <Modal modalIsOpen={openModal} closeModal={closeModal} > <ModalInnerBody render={render} isEdit={false} closeModal={closeModal} />
    </Modal>}
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
    Counters
  </h1>

  <div className="relative flex  flex-wrap items-center justify-center sm:justify-start mb-10">
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
        size={20}
      />
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2 border-b-2 border-gray-600 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {user.role === "admin" && (
      <button
        onClick={() => setOpenModal(true)}
        className="ml-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition max-md:mt-5"
      >
        Add Counter
      </button>
    )}
  </div>

  {/* Counter Section with Suspense */}
  <Suspense fallback={<Skeleton />}>
    <CounterSection render={render} searchQuery={searchQuery} promise={promise} />
  </Suspense>
</div>

    </>
  );
};

export default Counters;
