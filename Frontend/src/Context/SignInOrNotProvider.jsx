import React, { useState } from "react";
import SignInOrNotContext from "./SignInOrNot";


const SignInOrNotContextProvider = ({children}) => {
    const [signIn, setsignIn] = useState(false);
    return (
        <SignInOrNotContext.Provider value={{signIn,setsignIn}}>
            {children}
        </SignInOrNotContext.Provider>
    )
}

export default SignInOrNotContextProvider;