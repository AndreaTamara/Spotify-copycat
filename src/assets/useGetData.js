import { useEffect, useState } from "react";
import axios from "axios";



export const useGetData = (path, token) => {
    
    console.log('inicio del hook useGetData')
    const [data, setData] = useState(null);
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState(null);

    const baseUrl = 'https://api.spotify.com/v1';

    useEffect(() => {
        const getData = async()=>{
           try {
            const response = await axios({
                method: 'get',
                url: baseUrl + path,
                headers: {'Authorization': 'Bearer ' + token,}
            })
            setData(response.data)
            setLoading(false)
            setError(null)
            // console.log(data)
        } catch (error) {
            console.log('bloque catch')
            setError(error.response.data)
            setLoading(false)
        } 
        }
        getData()
        
      }, [path])
    

      return {data,loading, error}

}
