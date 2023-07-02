import { RootState } from './store';

export const selectCarsState = ({ cars }: RootState) => cars;

export const selectCars = ({ cars }: RootState) => cars.cars;