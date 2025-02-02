import axios from "axios"
import { useDispatch } from "react-redux"
import { toggleLoader } from "../slices/cafeteriaSlice"

export  function usePost(){
    const token = JSON.parse(localStorage.getItem('token'))
    const dispatch = useDispatch()
    return async function (url,body){
        
        dispatch(toggleLoader(true))
       return  axios.post(`https://cafeteira-backend.onrender.com/${url}`,{
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