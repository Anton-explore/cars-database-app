export interface CarDataType {
    id: number;
    car: string;
    car_color: string;
    car_model: string;
    car_model_year: number;
    car_vin: string;
    availability: boolean;
    price: string;
}

export interface CarsState {
	cars: CarDataType[];
	isLoading: boolean;
	error: string | null;
}