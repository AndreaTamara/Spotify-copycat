import { createContext, useState, useEffect } from "react";
import { getPrivateToken, getUserData } from "../api/privateServices";


export const authContext = createContext();


export const AuthProvider = ({ children }) => {
    // console.log('render context')
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState({name:'', id:'',country:''})
    

    const code = new URLSearchParams(window.location.search).get("code")
    // console.log(code)

    useEffect(() => {
        const refreshToken = localStorage.getItem('refreshToken');
         if (refreshToken) {
            setLoggedIn(true)
         }
        // else 
        if (!refreshToken&&code){
            getPrivateToken(code)
                .then(res => {
                    // localStorage.setItem('privateToken', res.access_token);
                    localStorage.setItem('token', res.access_token);
                    localStorage.setItem('refreshToken', res.refresh_token);
                    setLoggedIn(true)
                    console.log('actualicé token')
                    window.location.reload()
                    
                }
                )
                .catch(() => setLoggedIn(false))     
        }
        window.history.pushState({}, null, "/")
    }, [])

    useEffect(() => {
        if (loggedIn) {
            getUserData()
            .then(res=>{
                // console.log(res);
                setUser({name:res.display_name, id:res.id, country:res.country})
                console.log('pedi datos de usuario')
            })
        }
    }, [loggedIn])

    const handleLogOut = ()=>{
        setLoggedIn(false);
        localStorage.setItem('token', '');
        localStorage.setItem('refreshToken', '');
        
    }

    const data ={loggedIn,user, handleLogOut}

    return (
        <authContext.Provider value={data}>
            {children}
        </authContext.Provider>
    )
}


