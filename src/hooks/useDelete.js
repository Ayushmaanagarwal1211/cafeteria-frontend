import axios from "axios"

export async function useDelete(url){
    const token = JSON.parse(localStorage.getItem('token'))
    return axios.delete(`http://localhost:5000/${url}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
}