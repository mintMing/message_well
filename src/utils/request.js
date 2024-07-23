import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000,
    headers: {
        "api-version": "v1",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(  
    (response) => {  
        return response.data;  
    },  
    (error) => {  
        let message = "";  
        if (error.response) {  
            const status = error.response.status;  
            switch (status) {  
                case 401:  
                    message = "TOKEN过期";
                    break;  
                case 403:  
                    message = "无权访问";
                    break;  
                case 404:  
                    message = "请求地址错误";
                    break;  
                case 500:  
                    message = "服务器出现问题";
                    break;  
                default:  
                    message = "未知错误";  
                    break;  
            }  
        } else {  
            message = "网络出现问题";  
        }  
        return Promise.reject(new Error(message)); 
    },  
); 
export default axiosInstance;
