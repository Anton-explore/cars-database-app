import { CarDataType } from '@/types/datatypes';
import axios from 'axios';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFzIiwicGFzc3dvcmQiOiIxMjMiLCJ3ZWJzaXRlIjoid3d3Lm15ZmFrZWFwaS5jb20iLCJpYXQiOjE1NzM1NDMzNjcsImV4cCI6MTU3MzU0NTE2N30.95fFJcUIOsTVLrTNxSVdk4loPQnwWx9tBGJIb19o65"


axios.defaults.baseURL = 'https://myfakeapi.com/api';

export const CarsAPI = {
	async getCars() {
		const { data } = await axios.get<{cars: CarDataType[]}>(`/cars`,
			{
			headers: {
					'Content-Type': 'application/json',
					// 'Authorization': `Bearer ${token}`,
				}
			});
			return data.cars;
	},
	
	// async addCar(carData: CourseType, token: string) {
	// 	const { data } = await axios.post(
	// 		`/cars`,
	// 		carData,
	// 		{
	// 			headers: { Authorization: `${token}` },
	// 		}
	// 	);
	// 	return data;
	// },
	// async deleteCar(carId: string, token: string) {
	// 	const { data } = await axios.delete(`/cars/${carId}`, {
	// 		headers: { Authorization: `${token}` },
	// 	});
	// 	return data;
	// },
	// async updateCar(carData: CourseType, carId: string, token: string) {
	// 	const { data } = await axios.put(
	// 		`/cars/${carId:}`,
	// 		carData,
	// 		{
	// 			headers: { Authorization: `${token}` },
	// 		}
	// 	);
	// 	return data;
	// },
};
