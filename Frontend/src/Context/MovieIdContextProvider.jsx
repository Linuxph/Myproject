import React, { useState } from "react";
import MovieIdContext from "./MovieId";


const MovieIdContextProvider = ({children}) => {
    const [movieid, setmovieid] = useState("");
    return (
        <MovieIdContext.Provider value={{movieid,setmovieid}}>
            {children}
        </MovieIdContext.Provider>
    )
}

export default MovieIdContextProvider;