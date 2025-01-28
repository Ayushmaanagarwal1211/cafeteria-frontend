import axios from "axios"

export async function useDelete(url){
    const token = JSON.parse(localStorage.getItem('token'))
    return axios.delete(`https://cafeteira-backend.onrender.com/${url}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
}