import axios from 'axios';

const instance = axios.create()

instance.interceptors.response.use((response)=>response,
 (error)=>{
    if(error.response.status ===401){
        localStorage.clear();
        window.location.reload();
    }
    console.log(error)
    return Promise.reject(error)
 })

export default instance;