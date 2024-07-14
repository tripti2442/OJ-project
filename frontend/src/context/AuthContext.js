/*import {createContext, useState} from 'react';
import { useContext } from 'react';

export const AuthContext = createContext();

export const useAuthContext = ()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) =>{
     const [authUser , setAuthUser]= useState(localStorage.getItem("token") || null);

     return <AuthContextProvider value={{authUser,setAuthUser}}>
        {children}
     </AuthContextProvider>;
}*/