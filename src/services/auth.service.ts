import axios from "axios";
import { IUser, TLoginValues } from "model/User";

const API_URL = "https://localhost:5001/api/authenticate";


type User = IUser|null;


export const register = (user:IUser) => {
    const { username, email, password } = user;

    return axios.post(`${API_URL}/signup`, {
        username, email, password
    });
};

export const login = (user:TLoginValues) => {
    const { username, password } = user;
    return axios.post<IUser>(`${API_URL}/login`, 
    {
        username:username, 
        password:password
    }).then((response) => {
        console.log(response);
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
};

export const logout = ():void => {
    localStorage.removeItem("user");
}

export const getCurrentUser = ():User => {
    const userStr = localStorage.getItem("user");
    if (userStr)
        return JSON.parse(userStr);
    return null;
}