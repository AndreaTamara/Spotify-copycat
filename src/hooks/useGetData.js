import { useEffect, useState } from "react";
import { getPrivateData } from "../api/privateServices";
import { getPublicData } from "../api/publicServices";


export const useGetData = (endpoint,loggedIn,userInfo) => {

    

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        const request = loggedIn?getPrivateData(endpoint,20):getPublicData(endpoint,20)
        try {
            const response = await request
            // console.log(response)
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
        if(userInfo&&!loggedIn) return;
        getData()
    }, [loggedIn, userInfo,endpoint])


    return { data, loading, error }

}
