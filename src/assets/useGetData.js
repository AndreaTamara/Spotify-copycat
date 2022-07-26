import { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";



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
                headers: { 'Authorization': 'Bearer ' + token, }
            })
            setData(response.data)
            setLoading(false)
            setError(null)
        } catch (error) {
            setError(error.response.data)
            setLoading(false)
            setData(null)
        }
    }

    useLayoutEffect(() => {
        const token = localStorage.getItem('token')
        getData(token)
    }, [path])


    return { data, loading, error }

}
