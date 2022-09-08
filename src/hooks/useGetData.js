import { useEffect, useState } from "react";
import { getPrivateData } from "../api/privateServices";
import { getPublicData } from "../api/publicServices";


export const useGetData = (endpoint,loggedIn,userInfo,snapshotId,clear) => {

    
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const request = (url,logState)=>{
        if(logState)return getPrivateData(url,50)
        if(!logState)return getPublicData(url,50)
    }

    const getData = async () => {
        try {
            const response = await request(endpoint,loggedIn)   
            const firstData = response   
            while(response.next){
                const nextData = await request(response.next,loggedIn)
                firstData.items.push(...nextData.items)
                response.next = nextData.next
            }
            setData(firstData)
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
