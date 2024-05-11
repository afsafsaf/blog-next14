import { appConfig } from "@/utils/config";
import axios, { AxiosInstance } from "axios";


const { baseURL } = appConfig
export const axiosInstance: AxiosInstance = axios.create({
    //disini axios akan menghandle baseurl, jadi tidak perlu menulisakan routingan di belakang baseURL
    baseURL: baseURL,
});

// dengan menggunakan interceptor otomatis di setiap request kita pasti ada tokennya
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
},
    //kalau ada error kita tinggal reject
    (error) => {
        return Promise.reject(error);
    })
