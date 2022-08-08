import { hasAccessToken } from "../services/user";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export default function useAuth(){
    // const isAuthenticated = await hasAccessToken();
    // return isAuthenticated;
    return useContext(AuthContext);
}