import { createContext, useState} from "react";

export const playContext = createContext();

export const PlayProvider = ({ children }) => {

    const [currentUri, setCurrentUri] = useState()

    const data ={currentUri,setCurrentUri}

    return (
        <playContext.Provider value={data}>
            {children}
        </playContext.Provider>
    )
}