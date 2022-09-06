import { useEffect, useState } from "react";
import { getPrivateData } from "../api/privateServices";
import { getPublicData } from "../api/publicServices";


export const useGetData = (endpoint,loggedIn,userInfo,snapshotId,clear) => {

    
    // console.log('usegetdata:'+endpoint)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        const request = loggedIn?getPrivateData(endpoint,50):getPublicData(endpoint,50)
        try {
            const response = await request
            // console.log(response)
            setData(response)
            setLoading(false)
            setError(null)
        } catch (err) {
            const obErr = err.response.data?err.response.data.error:{status:'404', message:'An error ocurred'}
            setError(obErr)
            setLoading(false)
            setData(null)
        }
    }

    useEffect(() => {  
        if(userInfo&&!loggedIn) return;
        if(!endpoint)return;
        getData()

        return () => {
            if(clear){
                setData(null)
                setLoading(true)
                setError(null)
            } 
          };
    }, [loggedIn, userInfo,endpoint,clear,snapshotId])


    return { data, loading, error }

}
