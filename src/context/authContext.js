import { createContext, useState, useEffect } from "react";
import { getPrivateToken, getUserData } from "../api/privateServices";


export const authContext = createContext();


export const AuthProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState({name:'', id:''})

    const code = new URLSearchParams(window.location.search).get("code")
    // console.log(code)

    useEffect(() => {
        const privateToken = localStorage.getItem('privateToken');
        if (privateToken) {
            setLoggedIn(true)
        }
        else {
            getPrivateToken(code)
                .then(res => {
                    localStorage.setItem('privateToken', res.access_token);
                    localStorage.setItem('refreshtoken', res.refresh_token);
                    setLoggedIn(true)
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
                setUser({...user, name:res.display_name, id:res.id})
            })
        }
    }, [loggedIn])

    const handleLogOut = ()=>{
        setLoggedIn(false);
        localStorage.setItem('privateToken', '');
        localStorage.setItem('refreshtoken', '');
    }

    const data ={loggedIn,user, handleLogOut}

    return (
        <authContext.Provider value={data}>
            {children}
        </authContext.Provider>
    )
}


