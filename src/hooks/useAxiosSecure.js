import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Request interceptor to add authorization header for every secure call to the API
        const requestInterceptor = axiosSecure.interceptors.request.use(function (config) {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        // Response interceptor to handle 401 and 403 status automatically
        const responseInterceptor = axiosSecure.interceptors.response.use(function (response) {
            return response;
        }, async (error) => {
            const status = error.response?.status;
            // For 401 or 403, log out the user and redirect to login
            if (status === 401 || status === 403) {
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        });

        // Cleanup interceptors
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        }
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
