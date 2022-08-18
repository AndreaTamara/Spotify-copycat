import { getUserData } from "../api/privateServices";

//actions
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const SET_USER_DATA = 'SET_USER_DATA'


//action creators
export const logIn = () => ({ type:LOG_IN});

export const logOut = () => ({ type:LOG_OUT});

export const setUserData= () => ({ type:SET_USER_DATA});

//middleware
export const requestUserData = ()=>{
    return async (dispatch) =>{
        const data = await getUserData();
        dispatch({type:SET_USER_DATA, payload: data})
    }
}


