import { createContext, useState} from "react";

export const playContext = createContext();

export const PlayProvider = ({ children }) => {

    const [currentUri, setCurrentUri] = useState()
    const [currentTrack,setCurrentTrack]= useState()

    const data ={currentUri,setCurrentUri,currentTrack,setCurrentTrack}

    return (
        <playContext.Provider value={data}>
            {children}
        </playContext.Provider>
    )
}