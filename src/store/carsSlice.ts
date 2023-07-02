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
export const addCarRequest = createAsyncThunk<
	CarDataType,
	{ car: CarDataType }
>('cars/add', async ({ car }) => {
	const response = await CarsAPI.addCar(car);
	return response;
});
export const deleteCarRequest = createAsyncThunk<any,{ id: number }>(
	'cars/delete', async ({ id }) => {
		try {
			const response = await CarsAPI.deleteCar(id);
			return response;
		} catch (error: any) {
			return error.message;
		}
	}
);
export const updateCarRequest = createAsyncThunk<
	CarDataType,
	{ car: CarDataType, id: number }
>('cars/update', async ({ car, id }) => {
	const response = await CarsAPI.updateCar(car, id);
	return response;
});

export const initialState: CarsState = {
	cars: [],
	isLoading: false,
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
					state.isLoading = false;
				}
			)
			.addCase(getCarsRequest.rejected, rejectHandler)

			.addCase(addCarRequest.pending, pendingHandler)
			.addCase(
				addCarRequest.fulfilled,
				(
					state: CarsState,
					{ payload }: PayloadAction<CarDataType>
				) => {
					state.cars = [payload, ...state.cars];
					state.isLoading = false;
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
					state.isLoading = false;
				}
			)
			.addCase(deleteCarRequest.rejected, rejectHandler)

			.addCase(updateCarRequest.pending, pendingHandler)
			.addCase(
				updateCarRequest.fulfilled,
				(
					state: CarsState,
					{ payload }: PayloadAction<CarDataType>
				) => {
					state.cars = state.cars.map((car) =>
						car.id === payload.id ? payload : car
					);
					state.isLoading = false;
				}
			)
			.addCase(updateCarRequest.rejected, rejectHandler),
});

function pendingHandler(state: CarsState) {
	state.error = null;
	state.isLoading = true;
}
function rejectHandler(state: CarsState, { payload }: PayloadAction<any>) {
	state.error = payload;
	state.isLoading = false;
}

export const carsReducer = carsSlice.reducer;
