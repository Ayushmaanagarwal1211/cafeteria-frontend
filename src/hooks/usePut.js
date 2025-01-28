import axios from "axios"

export async function usePut(url,body){
    const token = JSON.parse(localStorage.getItem('token'))
    return axios.put(`https://cafeteira-backend.onrender.com/${url}`,{
      ...body
    },{
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
}