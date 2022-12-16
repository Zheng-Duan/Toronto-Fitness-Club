import {createContext, useState} from "react";

export const useAPIContext = () => {
    const [studios, setStudios] = useState([]);

    return {
        studios,
        setStudios,
    }
}

export const APIContext = createContext({
    studios: [], setStudios: () => {},
})

export default APIContext;