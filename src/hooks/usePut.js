import axios from "axios"

export async function usePut(url,body){
    const token = JSON.parse(localStorage.getItem('token'))
    return axios.put(`http://localhost:5000/${url}`,{
      ...body
    },{
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
}