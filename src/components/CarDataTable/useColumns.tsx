import { CarDataType } from "@/types/datatypes"
import { Box, Button } from "@chakra-ui/react"
import { createColumnHelper } from "@tanstack/react-table"

const renderActions = (status: boolean) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            padding={5} gap={10}
            border={status ? "none" : "1px solid red"}
            borderRadius={10}
        >
            <Button 
                color="blue"
                backgroundColor="#FFFF"
                border="1px solid blue" 
                borderRadius={10}
                padding={5}
                width={55}
                height={30}
                textAlign="center"
            >
                Edit
            </Button>
            <Button 
                color="red"
                backgroundColor="#FFFF"
                border="1px solid red" 
                borderRadius={10}
                padding={5}
                width={55}
                height={30}
                textAlign="center"
            >
                Delete
            </Button>
        </Box>
    )
  }

export const useCarColumns = () => {
    const columnHelper = createColumnHelper<CarDataType>()

    const carColumns = [
    columnHelper.accessor('car', {
        id: 'car',
        header: () => 'Company',
        size: 250
    }),
    columnHelper.accessor('car_model', {
        id: 'car_model',
        header: () => 'Model',
        size: 250
    }),
    columnHelper.accessor('car_vin', {
        id: 'car_vin',
        header: () => 'VIN',
        size: 300
    }),
    columnHelper.accessor('car_color', {
        id: 'car_color',
        header: () => 'Color'
    }),
    columnHelper.accessor('car_model_year', {
        id: 'car_model_year',
        header: () => 'Year'
    }),
    columnHelper.accessor('price', {
        id: 'price',
        header: () => 'Price'
    }),
    columnHelper.accessor(() => null, {
        id: 'availability',
        cell: ({ row }) => row.original.availability ? 'available' : 'sold out',
        header: () => 'Availability'
    }),
    columnHelper.accessor(() => null, {
        id: 'actions',
        cell: ({row}) => renderActions(row.original.availability),
        header: () => 'Actions',
        size: 300
    }),
    ]

    return carColumns
}