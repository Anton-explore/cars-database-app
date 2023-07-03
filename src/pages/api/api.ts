import axios from 'axios';

import { CarDataType } from '@/types/datatypes';
import { delay } from '@/utils/delay';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFzIiwicGFzc3dvcmQiOiIxMjMiLCJ3ZWJzaXRlIjoid3d3Lm15ZmFrZWFwaS5jb20iLCJpYXQiOjE1NzM1NDMzNjcsImV4cCI6MTU3MzU0NTE2N30.95fFJcUIOsTVLrTNxSVdk4loPQnwWx9tBGJIb19o65"


axios.defaults.baseURL = 'https://myfakeapi.com/api';

class GlobalCarsAPI {
	private static instance: GlobalCarsAPI;
	private carsData: CarDataType[];

	private constructor() {
		this.carsData = [];
	}

	public static getInstance(): GlobalCarsAPI {
		if (!GlobalCarsAPI.instance) {
		GlobalCarsAPI.instance = new GlobalCarsAPI();
		}
		return GlobalCarsAPI.instance;
	}

	private async getCarsOnce(): Promise<void> {
		const carsDataFromStorage = sessionStorage.getItem('carsData');

		if (carsDataFromStorage) {
		this.carsData = JSON.parse(carsDataFromStorage);
		} else {
		try {
			const { data } = await axios.get<{ cars: CarDataType[] }>('/cars', {
			headers: {
				'Content-Type': 'application/json',
				// 'Authorization': `Bearer ${token}`,
			},
			});
			this.carsData = data.cars;
			sessionStorage.setItem('carsData', JSON.stringify(this.carsData));
		} catch (error) {
			console.error('Error fetching cars data:', error);
		}
		}
	}

	public async getCars(): Promise<CarDataType[]> {
		await this.getCarsOnce();
		return this.carsData;
	}

	public async addCar(carData: CarDataType): Promise<CarDataType> {
		await delay(500);
		this.carsData = [carData, ...this.carsData];
		sessionStorage.setItem('carsData', JSON.stringify(this.carsData));
		return carData;
	}

	public async updateCar(carData: CarDataType, id: number): Promise<CarDataType> {
		await delay(500);
		this.carsData = this.carsData.map((car) =>
		car.id === id ? carData : car
		);
		sessionStorage.setItem('carsData', JSON.stringify(this.carsData));
		return carData;
	}

	public async deleteCar(carId: number): Promise<number> {
		await delay(500);
		this.carsData = this.carsData.filter(
		(car) => car.id !== carId
		);
		sessionStorage.setItem('carsData', JSON.stringify(this.carsData));
		return carId;
	}
}

export const CarsAPI = GlobalCarsAPI.getInstance();


// const getCarsOnce = async () => {
// 	const { data } = await axios.get<{cars: CarDataType[]}>(`/cars`,
// 		{
// 		headers: {
// 				'Content-Type': 'application/json',
// 				// 'Authorization': `Bearer ${token}`,
// 			}
// 		});
// 	return data.cars;
// }

// let carsData: CarDataType[] = [];

// const getCarsOnce = async () => {
// 	const carsDataFromStorage = sessionStorage.getItem('carsData');

// 	if (carsDataFromStorage) {
// 		carsData = JSON.parse(carsDataFromStorage);
// 	} else {
// 		try {
// 		const { data } = await axios.get<{ cars: CarDataType[] }>('/cars', {
// 			headers: {
// 			'Content-Type': 'application/json',
// 			// 'Authorization': `Bearer ${token}`,
// 			},
// 		});
// 		carsData = data.cars;
// 		sessionStorage.setItem('carsData', JSON.stringify(carsData));
// 		} catch (error) {
// 		console.error('Error fetching cars data:', error);
// 		}
// 	}
// };

// getCarsOnce();


// export const CarsAPI = {

// 	async getCars() {
// 		await delay(500);
// 		sessionStorage.setItem('carsData', JSON.stringify(carsData));
// 		return carsData;
// 		// const { data } = await axios.get<{cars: CarDataType[]}>(`/cars`,
// 		// 	{
// 		// 	headers: {
// 		// 			'Content-Type': 'application/json',
// 		// 			// 'Authorization': `Bearer ${token}`,
// 		// 		}
// 		// 	});
// 		// return data.cars;
// 	},

// 	async addCar(carData: CarDataType) {
// 		await delay(500);
// 		carsData = [carData, ...carsData];
// 		sessionStorage.setItem('carsData', JSON.stringify(carsData));
// 		return carData;
// 	},

// 	async updateCar(carData: CarDataType, id: number) {
// 		await delay(500);
// 		carsData = carsData.map((car) =>
// 			car.id === id ? carData : car
// 		);
// 		sessionStorage.setItem('carsData', JSON.stringify(carsData));
// 		return carData;
// 	},

// 	async deleteCar(carId: number) {
// 		await delay(500);
// 		carsData = carsData.filter(
// 			(car) => car.id !== carId
// 		);
// 		sessionStorage.setItem('carsData', JSON.stringify(carsData));
// 		return carId;
// 	}

// };
