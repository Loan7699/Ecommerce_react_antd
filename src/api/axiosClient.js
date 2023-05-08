import axios from "axios";
import queryString from 'query-string';

const axiosClient = axios.create(
    {
        baseURL: "https://dummyjson.com",
        paramsSerializer: (params) => queryString.stringify(params)
    }
)

export default axiosClient