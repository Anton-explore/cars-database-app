import { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Input,
  Spinner,
  Text,
  Center
} from '@chakra-ui/react'

import Image from 'next/image';

import CarDataTable from '@/components/CarDataTable/CarDataTable';
import { useCarColumns } from '@/components/CarDataTable/useColumns';
import AdditionModal from '@/components/Modal/AdditionModal/AdditionModal';

import WheelIcon from '@/icons/car-tire-wheel-icon.svg'
import { CarDataType } from '@/types/datatypes';
import { useHomeContext } from './HomeContext';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoading, cars, error} = useHomeContext();

  const carsData: CarDataType[] = cars as CarDataType[];

  const carColumns = useCarColumns();

  if (isLoading) {
    return (
      <ChakraProvider>
        <Center
          w="100vw"
          h="100vh"
          display="flex"
          flexDirection="column"
        >
          <Spinner
            thickness="4px"
            speed="0.45s"
            emptyColor="gray"
            color="blue"
            width="50px"
            height="50px"
          />
          <p>Loading...</p>
        </Center>
      </ChakraProvider>
    );
  }
  if (error) {
    return (
      <ChakraProvider>
        <Center
          w="100vw"
          h="100vh"
          display="flex"
          flexDirection="column"
        >
          <p>An error has occurred: {error}</p>
        </Center>
      </ChakraProvider>
    );
  }
  if (!cars) {
    return null;
  }

  return (
      <ChakraProvider>
        <Box
          display="flex"
          flexDirection="column"
          padding="50px 100px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            margin="16px"
          >
            <Box
              display="flex"
              gap="8px"
            >
              <Image src={WheelIcon} alt="icon" width="26" />
              <Text
                fontSize="24px"
                fontWeight="700"
                lineHeight="28px"
              >
                Car catalog
              </Text>
            </Box>
            <Input
              width="700px"
              height="40px"
              border="1px solid #D9E2EA"
              borderRadius="8px"
              padding="10px"
              placeholder="Search"
              value={searchQuery}
              onChange={val => setSearchQuery(val.target.value)}
            />
            <Box
              display="flex"
              gap={16}
            >
              <AdditionModal />
            </Box>
          </Box>
          <CarDataTable
            columns={carColumns}
            data={carsData}
            globalFilter={searchQuery}
            setGlobalFilter={setSearchQuery}
          />
        </Box>
      </ChakraProvider>
  )
}

export default Home;
