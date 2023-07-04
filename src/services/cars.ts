import axios from 'axios';
import { CarDataType } from '@/types/datatypes';


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFzIiwicGFzc3dvcmQiOiIxMjMiLCJ3ZWJzaXRlIjoid3d3Lm15ZmFrZWFwaS5jb20iLCJpYXQiOjE1NzM1NDMzNjcsImV4cCI6MTU3MzU0NTE2N30.95fFJcUIOsTVLrTNxSVdk4loPQnwWx9tBGJIb19o65"


axios.defaults.baseURL = 'https://myfakeapi.com/api';


export const CarsAPI = {
	async getCars() {
		const { data } = await axios.get<{ cars: CarDataType[] }>('/cars', {
			headers: {
				'Content-Type': 'application/json',
				// 'Authorization': `Bearer ${token}`,
			},
		});
		return data.cars;
	}
}
