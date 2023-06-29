import { useState } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'
import Image from 'next/image';
import { Inter } from '@next/font/google';

import { useFetchData } from '@/hooks/useFetchData';

import CarDataTable from '@/components/CarDataTable/CarDataTable';
import { useCarColumns } from '@/components/CarDataTable/useColumns';

import WheelIcon from '@/icons/car-tire-wheel-icon.svg'
import { CarDataType } from '@/types/datatypes';



const inter = Inter({ subsets: ['latin'] })

const theme = {
  styles: {
    global: {
      'html, body': {
        fontFamily: inter.style.fontFamily,
        color: '#33404A',
        fontSize: 14,
        textAlign: 'center'
      },
    },
  },
}


const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {cars, error, isLoading } = useFetchData();

  const carsData: CarDataType[] = cars as CarDataType[];

  const carColumns = useCarColumns();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>An error has occurred: {error.message}</p>;
  }
  if (!cars) {
    return null;
  }

  return (
    <ChakraProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        padding="50px 100px"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          margin={16}
        >
          <Box
            display="flex"
            gap={8}
          >
            <Image src={WheelIcon} alt="icon" width="26" />
            <Text
              fontSize={24}
              fontWeight="700"
              lineHeight="28px"
            >
              Our car offers catalog
            </Text>
          </Box>
          <Input
            width="700px"
            height="40px"
            border="1px solid #D9E2EA"
            borderRadius={8}
            padding={10}
            placeholder='Search'
            value={searchQuery}
            onChange={val => setSearchQuery(val.target.value)}
          />
          <Box
            display="flex" 
            gap={16} 
          >
            <Button 
              color="#FFFF"
              backgroundColor="blue"
              borderRadius={8}
              padding={7}
              fontSize={16}
              width={80}
              height={32}
            >
              + Add
            </Button>
            <Button 
              color="blue"
              backgroundColor="#FFFF"
              borderRadius={8}
              padding={7}
              fontSize={16}
              width="80px"
              height="32px"
            >
              Filter
            </Button>
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
