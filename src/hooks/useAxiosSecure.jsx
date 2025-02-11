import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://med-camp-server.vercel.app'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptor', token)
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error)
    });

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, function async(error) {
        const status = error.response.status;
        // console.log(status)
        if (status === 401) {
            logOut();
            navigate('/login')
        }
        return Promise.reject(error)
    });

    return axiosSecure;
};

export default useAxiosSecure;