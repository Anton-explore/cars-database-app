import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	CarsState,
	CarDataType,
} from '@/types/datatypes';
import { CarsAPI } from '@/pages/api/api';


export const getCarsRequest = createAsyncThunk<CarDataType[]>(
	'cars/get',
	async () => {
		try {
			const cars = await CarsAPI.getCars();
			return cars;
		} catch (error: any) {
			return error.message;
		}
	}
);
export const addCarRequest = createAsyncThunk('cars/add', async ({ car}) => {
	const response = await CarsAPI.addCar(car);
	return response;
});
export const getCarRequest = createAsyncThunk<string, any>(
	'cars/getCar',
	async (carId) => {
		const { data } = await CarsAPI.getCar(carId);
		return data;
	}
);
export const deleteCarRequest = createAsyncThunk(
	'cars/delete',
	async ({ id }) => {
		try {
			const { successful } = await CarsAPI.deleteCar(id);
			if (successful) {
				return id;
			}
		} catch (error: any) {
			return error.message;
		}
	}
);
export const updateCarRequest = createAsyncThunk('cars/update', async ({ car, id }) => {
	const response = await CarsAPI.updateCar(car, id);
	return response;
});

export const initialState: CarsState = {
	cars: [],
	status: false,
	error: null,
};

export const carsSlice = createSlice({
	name: 'cars',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(getCarsRequest.pending, pendingHandler)
			.addCase(
				getCarsRequest.fulfilled,
				(state: CarsState, { payload }: PayloadAction<CarDataType[]>) => {
					state.cars = [...payload];
					state.status = false;
				}
			)
			.addCase(getCarsRequest.rejected, rejectHandler)

			.addCase(addCarRequest.pending, pendingHandler)
			.addCase(
				addCarRequest.fulfilled,
				(
					state: CarsState,
					{ payload }: PayloadAction<ChangeCarResponse>
				) => {
					state.cars = [payload.result, ...state.cars];
					state.status = false;
				}
			)
			.addCase(addCarRequest.rejected, rejectHandler)

			.addCase(deleteCarRequest.pending, pendingHandler)
			.addCase(
				deleteCarRequest.fulfilled,
				(state: CarsState, { payload }: PayloadAction<number>) => {
					state.cars = state.cars.filter(
						(car) => car.id !== payload
					);
					state.status = false;
				}
			)
			.addCase(deleteCarRequest.rejected, rejectHandler)

			.addCase(updateCarRequest.pending, pendingHandler)
			.addCase(
				updateCarRequest.fulfilled,
				(
					state: CarState,
					{ payload }: PayloadAction<ChangeCarResponse>
				) => {
					state.cars = state.cars.map((car) =>
						car.id === payload.result.id ? payload.result : car
					);
					state.status = false;
				}
			)
			.addCase(updateCarRequest.rejected, rejectHandler),
});

function pendingHandler(state: CarsState) {
	state.error = null;
	state.status = true;
}
function rejectHandler(state: CarsState, { payload }: PayloadAction<any>) {
	state.error = payload;
	state.status = false;
}

export const carsReducer = carsSlice.reducer;
