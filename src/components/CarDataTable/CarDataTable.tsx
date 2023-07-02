import React, { Dispatch, FC } from "react";
import { 
    Table, 
    Thead, 
    Tr, 
    Th, 
    Tbody, 
    Td, 
    TableContainer} from "@chakra-ui/react";
import { 
    getCoreRowModel, 
    useReactTable, 
    flexRender, 
    ColumnDef, 
    FilterFn, 
    getFilteredRowModel, 
    getPaginationRowModel,  
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";

import Pagination from "../Pagination/Pagination";

import { CarDataType } from "@/types/datatypes";

type CarDataTable = {
    columns: ColumnDef<CarDataType, any>[];
    data: CarDataType[];
    globalFilter: string;
    setGlobalFilter: Dispatch<React.SetStateAction<string>>
}

const CarDataTable: FC<CarDataTable> = ({ columns, data, globalFilter, setGlobalFilter }) => {

    const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
        itemRank,
    });
    return itemRank.passed;
    };

    const table = useReactTable({
        data,
        columns,
        filterFns: {
        fuzzy: fuzzyFilter,
        },
        state: {
        globalFilter: globalFilter
        },
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    },
    )

    return (
    <TableContainer 
        backgroundColor="#FFFFFF"  
        borderRadius="8px" 
        padding="18px" 
        display="flex" 
        flexDirection="column"  
        alignItems="center"
    >
        <Table textAlign="left" style={{ borderCollapse: 'collapse' }}>
        <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
            <Tr
                key={headerGroup.id}
                height="40px"
            >  
                {headerGroup.headers.map((header) => (
                <Th
                    {...{
                    style: {
                        width: header.getSize(),
                        padding: '10px 8px'
                    }
                    }}
                    key={header.id}
                >
                    {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )}
                </Th>
                ))}
            </Tr>
            ))}
        </Thead>
        <Tbody>
            {table.getRowModel().rows.map((row, i) => {
            return (
                <Tr 
                {...
                    i % 2 === 0 ? { style: {
                    backgroundColor: '#F9F9F9'
                    }}: null 
                }
                key={row.id}
                lineHeight="25px"
                >
                {row.getVisibleCells().map(cell => (
                    <Td 
                    {...{
                        style: {
                        width: cell.column.getSize(),
                        padding: '10px 8px',            
                        }
                    }}
                    key={cell.id}
                    >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                ))}
                </Tr>
            );
            })}
        </Tbody>
        </Table>
        <Pagination data={data} table={table} />
    </TableContainer>
    );
}

export default CarDataTable;