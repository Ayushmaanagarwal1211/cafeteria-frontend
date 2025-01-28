import axios from "axios"

export async function usePost(url,body){
    const token = JSON.parse(localStorage.getItem('token'))
    console.log(token)
    return axios.post(`http://localhost:5000/${url}`,{
      ...body
    },{
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
}