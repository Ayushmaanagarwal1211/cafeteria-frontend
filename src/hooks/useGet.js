import axios from "axios"

export async function useGet(url){
    const token = JSON.parse(localStorage.getItem('token'))
    return axios.get(`https://cafeteira-backend.onrender.com/${url}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
}