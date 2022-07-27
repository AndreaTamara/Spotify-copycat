import { useEffect, useState, useLayoutEffect } from "react";
import axios from '../api/axios'
import { getData } from "../api/publicServices";
import { getToken } from "./helpers";




export const useGetData = (path) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    

    const getInfo = async () => {

        try {
            const response = await getData(path)
            console.log(response)
            setData(response)
            setLoading(false)
            setError(null)
        } catch (err) {
            setError(err.response.data.error)
            setLoading(false)
            setData(null)
        }
    }

    useEffect(() => {

       
            getInfo()

 
    }, [path])


    return { data, loading, error }

}
