import { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import { getToken } from "./helpers";

// axios.interceptors.response.use(
//     response => response,
//     async (error) => {
//         console.log(error)
//         const prevRequest = error?.config;
//         console.log(prevRequest)
//         if (error?.response?.status === 401 && !prevRequest?.sent) {
//         if (error?.response?.status === 401) {
//             prevRequest.sent = true;
//             const newAccessToken = await getToken();
//             localStorage.setItem('token', newAccessToken)
//             prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//             return axios(error?.config);
//         }
//         return Promise.reject(error);
//     }
// }
// )



export const useGetData = (path) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseUrl = 'https://api.spotify.com/v1';

    const getData = async (token) => {

        try {
            const response = await axios({
                method: 'get',
                url: baseUrl + path,
                headers: { 'Authorization': 'Bearer ' + token, },
                params:{limit:20}
            })
            setData(response.data)
            setLoading(false)
            setError(null)
        } catch (err) {
            setError(err.response.data.error)
            setLoading(false)
            setData(null)
        }
    }

    useEffect(() => {

        const token = localStorage.getItem('token')
        if (!token) {
          getToken()
            .then(res => {
                localStorage.setItem('token', res)
                getData(res)
            })
        }else{
            getData(token)
        }
 
    }, [path])


    return { data, loading, error }

}
