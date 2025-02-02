import axios from "axios"
import { useDispatch } from "react-redux"
import { selectLoader, toggleLoader } from "../slices/cafeteriaSlice"

export  function useDelete(){
    const token = JSON.parse(localStorage.getItem('token'))
    const dispatch = useDispatch()
    return async function (url){
        
        dispatch(toggleLoader(true))
       return  axios.delete(`https://cafeteira-backend.onrender.com/${url}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).then((res)=>{
        dispatch(toggleLoader(false));
        return res
    })
    // dispatch(toggleLoader(false))
    // return res
}
}