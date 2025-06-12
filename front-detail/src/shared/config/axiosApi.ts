import axios from 'axios';

const axiosApi = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_API_URL,
	withCredentials: true,
});

export default axiosApi;
