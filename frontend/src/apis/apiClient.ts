import axios, { AxiosError } from 'axios';
import { ErrorResult } from '../models/common';

const apiClient = axios.create();

apiClient.interceptors.response.use(
	response => {
		return response;
	},
	(error: AxiosError<ErrorResult>) => {
		if(error.response && error.response.status === 401) {
			const loginMember = localStorage.getItem("loginMember");
			
    		if (loginMember !== null) {
				localStorage.removeItem("loginMember");
			}
		} 

		return Promise.reject(error);  
	}
);

export default apiClient;