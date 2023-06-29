import { useEffect, useState } from 'react';
import { CarsAPI } from '@/pages/api/api';
import { CarDataType } from '@/types/datatypes';

export const useFetchData = () => {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState<CarDataType[] | null>(null);

  useEffect(() => {
    
    const fetchCars = async () => {
      setIsLoading(true);
      try {
        const carsArr: CarDataType[] = await CarsAPI.getCars();
        setCars(carsArr);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars()
  }, []);

  return {
    cars,
    error,
    isLoading
  }
}
