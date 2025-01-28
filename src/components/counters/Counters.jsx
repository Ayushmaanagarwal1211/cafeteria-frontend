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
import { useSelector } from "react-redux";


export function useRender(setPromise,url){
  return function (){
    setPromise(useGet(url))
  }
}

const CounterSection = React.memo(({promise,searchQuery,render})=>{
    const result = use(promise)
    const user = useSelector(state=>selectUser(state))
    const counters = result.data

    async function handleCounterDelete(id){
      const res = await useDelete(`user/delete-counter/${id}`)
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

  async function handleSubmit(e){
    if(counterName.length==0){
      return toast("Please Enter Valid Counter Name")
    }
    const result = await usePost(`${isEdit?`user/edit-counter/${counter._id}`:"user/add-counter"}`,{name:counterName,merchants:selectedMerchants})
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
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{isEdit ? "Edit Counter":"Add Counter"}</h2>
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
          Counter Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter counter name"
          onChange={(e)=>setCounterName(e.target.value)}
          value={counterName}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="merchants" className="block text-sm font-medium text-gray-600">
          Select Merchants
        </label>
        <select
          id="merchants"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select a merchant</option>
            <MerchantList  handleClick={handleSelectMerchant} selectedMerchants={selectedMerchants} />
        </select>
        <div className="w-[100%] flex gap-2 ">
            {
              selectedMerchants.map(data=><div key={data._id} className="px-3 py-2 bg-blue-500 w-full flex justify-between items-center text-white rounded-md">{data.name} <p onClick={()=>handleMerchantRemove(data)} className="cursor-pointer">Remove Merchant</p></div>)
            }
        </div>
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
  );
};


const  MerchantList=React.memo(({handleClick,selectedMerchants})=>{
  const [merchants,setMerchants] = useState([])
  useEffect(()=>{
    useGet('user/get-merchants').then(res=>{console.log(res.data);setMerchants(res.data)})
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
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Counters
      </h1>
      <div className="relative hidden sm:block mb-10 ">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border-b-[1px] border-black rounded-none bg-gray-50  w-full sm:w-auto"
              />
      {user.role=="admin" && <button onClick={()=>setOpenModal(true)} className="ml-5 px-2 py-1 bg-green-400 font-semibold text-xl text-white rounded-lg cursor-pointer">Add Counter</button>}
            </div>
      <Suspense fallback={<Skeleton/>}>
        <CounterSection render={render} searchQuery={searchQuery} promise={promise}/>
      </Suspense>
    </div>
    </>
  );
};

export default Counters;
