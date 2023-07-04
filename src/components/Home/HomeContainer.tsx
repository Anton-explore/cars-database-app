import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { HomeProvider } from './HomeContext'
import Home from './Home'
import { CarDataType } from '@/types/datatypes';
import { CarsAPI } from '@/services/cars';

const STORAGE_KEY = 'carsData';

const HomeContainer = () => {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState<CarDataType[] | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const carsDataFromStorage = localStorage.getItem(STORAGE_KEY);
      if (!carsDataFromStorage) {
        const carsData = await CarsAPI.getCars();
        setCars(carsData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(carsData))

      } else {
        setCars(JSON.parse(carsDataFromStorage))
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [])

  const deleteCar = useCallback((id: number) => {
    if (!!cars) {
      const nextCars = cars?.filter(car => car.id !== id);
      setCars(nextCars);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCars))
      return nextCars;
    }
  }, [cars])

  const updateCar = useCallback((values: CarDataType) => {
    if (!!cars) {
      const nextCars = cars?.map(car => {
        if (car.id === values.id) {
          return values
        }
        return car
      })
      setCars(nextCars);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCars))
    }
  }, [cars])

  const addCar = useCallback((newCar: CarDataType) => {
    if (!!cars){
      const nextCars = [newCar, ...cars];
      setCars(nextCars);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCars))
    }
  }, [cars])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const value = useMemo(() => ({
    error,
    isLoading,
    cars,
    fetchData,
    deleteCar,
    updateCar,
    addCar
  }), [cars, error, isLoading, fetchData, deleteCar, updateCar, addCar])

  return (
    <HomeProvider value={value}>
      <Home />
    </HomeProvider>
  )
}

export default HomeContainer;
