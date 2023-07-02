// import { useEffect, useState } from 'react';
// import { CarsAPI } from '@/pages/api/api';
// import { CarDataType } from '@/types/datatypes';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';

import { getCarsRequest } from '@/store/carsSlice';
import { selectCarsState } from '@/store/selectors';

export const useFetchData = () => {
  const dispatch = useAppDispatch();
  const { cars, status, error } = useAppSelector(selectCarsState);

  // const [error, setError] = useState<any>(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [cars, setCars] = useState<CarDataType[] | null>(null);

  useEffect(() => {
    
    // const fetchCars = async () => {
    //   setIsLoading(true);
    //   try {
    //     const carsArr: CarDataType[] = await CarsAPI.getCars();
    //     setCars(carsArr);
    //   } catch (error) {
    //     setError(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // fetchCars()
    dispatch(getCarsRequest());

  }, [dispatch]);

  return {
    cars,
    error,
    isLoading
  }
}
