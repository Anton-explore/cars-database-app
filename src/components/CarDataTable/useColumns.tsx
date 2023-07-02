import { CarDataType } from "@/types/datatypes"
import { createColumnHelper } from "@tanstack/react-table"

import RenderActions from "../RenderActions/RenderActions";

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
        cell: ({ row }) => <RenderActions id={row.original.id} />,
        header: () => 'Actions',
        size: 300
    }),
    ]

    return carColumns
}