import {createContext, useContext, useState} from "react";

const Context = createContext(null);

const getUserInContext =()=>{
    try{
        const user = localStorage.getItem("user");
        if(user){
            return JSON.parse(user);
        }
    }catch(error){
        console.log(error);
        return null;
    }
}
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(getUserInContext);

    const login = (user)=>{
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    }
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    }

    const value = {
        user,
        isLoggedIn: !!user,
        login,
        logout,
    }
    return <Context.Provider value={value}>
        {children}
    </Context.Provider>;
}

export const useAuth = () => {
    return useContext(Context)
}