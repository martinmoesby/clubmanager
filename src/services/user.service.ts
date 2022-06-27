import axios from "axios";
import { IWeatherForecast } from "model/Weather";
import authHeader from "./auth-header";

const API_URL = "https://localhost:5001/api/weatherforecast";

export const getPublicContent = () => {

     return axios.get<IWeatherForecast[]>(`${API_URL}/public`);
}

export const getSecretContent = () => {
    return axios.get<IWeatherForecast[]>(`${API_URL}/secret`, {
        headers: authHeader()
    });
}

export const getAdminContent = () => {
    return axios.get<IWeatherForecast[]>(`${API_URL}/admin`, {
        headers: authHeader()
    });
}