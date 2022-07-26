import { useState, useEffect, useRef } from "react";


// export const useAuth = () => {
//     const [token, setToken] = useState ('')
//     let prevToken;
//     // const [expiresIn, setExpiresIn] = useState('')

   

    export const getToken = async () => {
        
        const clientId = '3f182385c47b4459b03bba8df1a09d47';
        const clientSecret = '89b84d2544ac44938950c2fdcca11cd0';

        const result = await fetch('https://accounts.spotify.com/api/token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
                    'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
                },
                body: 'grant_type=client_credentials'
            });

        const data = await result.json();
        console.log(data.access_token)
      return data.access_token;
    }

    // useEffect(() => {
    //     if(!token){
    //         getToken()
    //         .then(res=>{
    //             setToken(res.access_token);
    //             prevToken = res.access_token
    //             // setExpiresIn(res.expires_in)
    //         })
    //     } 

        // const interval = setInterval(() => {
        //             getToken()
        //             .then(res=>{
        //                 setToken(res.access_token);
        //                 // setExpiresIn(res.expires_in)
        //             })
        //         }, (3540*1000))
            
        //         return () => clearInterval(interval)

        //     // console.log(data.access_token)
        //     // return data.access_token;
        // }, [])

    // useEffect(() => {

    //     console.log('useefect de useauth')
    //     const interval = setInterval(() => {
    //         getToken()
    //         .then(res=>{
    //             setToken(res.access_token);
    //             // setExpiresIn(res.expires_in)
    //         })
    //     }, (400000))
    
    //     return () => clearInterval(interval)

    //   }, [])
    
//       return token



// }








