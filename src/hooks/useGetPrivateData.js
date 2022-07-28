import { useEffect, useState } from "react";


export const useGetPrivateData = (endpoint) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getInfo = async () => {

        try {
            const response = await getPrivateData(endpoint,20)
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
            getInfo();
    }, [])


    return { data, loading, error }

}