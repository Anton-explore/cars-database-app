import { useEffect, useState } from 'react';
import { CarDataType } from '@/types/datatypes';

import { CarsAPI } from '@/services/cars';


export const useFetchData = () => {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState<CarDataType[] | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const carsDataFromStorage = localStorage.getItem('carsData');
      if (!carsDataFromStorage) {
        const carsData = await CarsAPI.getCars();
        setCars(carsData);
        
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return {
    cars,
    error,
    isLoading
  }
}
