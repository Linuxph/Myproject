import React, { useState } from "react";
import LogoutContext from "./LogoutContext";


const LogoutContextProvider = ({children}) => {
    const [logout, setlogout] = useState(false);
    return (
        <LogoutContext.Provider value={{logout,setlogout}}>
            {children}
        </LogoutContext.Provider>
    )
}

export default LogoutContextProvider;