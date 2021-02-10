import axios from 'axios'
const baseURL = 'http://127.0.0.1:8000/dukcapil/api'
const axiosInstance = axios.create({ baseURL })

export default axiosInstance