import axios from "axios"
import { useDispatch } from "react-redux"
import { toggleLoader } from "../slices/cafeteriaSlice"

export  function usePut(url,body){
    const token = JSON.parse(localStorage.getItem('token'))
    const dispatch = useDispatch()
    return async function (url,body){
        
        dispatch(toggleLoader(true))
       return  axios.put(`https://cafeteira-backend.onrender.com/${url}`,{
        ...body
      },{
          headers:{
              Authorization : `Bearer ${token}`
          }
      }).then((res)=>{
        dispatch(toggleLoader(false));
        return res
    })
   
}
    
}