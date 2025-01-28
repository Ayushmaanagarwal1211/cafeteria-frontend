import axios from "axios"

export async function useGet(url){
    const token = JSON.parse(localStorage.getItem('token'))
    return axios.get(`http://localhost:5000/${url}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
}