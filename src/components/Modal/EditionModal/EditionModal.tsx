import {
    ChakraProvider,
    Button,
    useDisclosure,
} from '@chakra-ui/react'

import CarComponent from '@/components/CarComponent'

// type ErrorsType = Omit<CarDataType, 'id' | 'car_model_year' | 'availability'> & {
//     car_model_year: string;
//     availability: string;
// }

const EditionModal = ({ id }: { id: number }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button
                width={55}
                height={30}
                color="#fff"
                backgroundColor="blue"
                border="1px solid blue"
                borderRadius={10}
                textAlign="center"
                onClick={onOpen}
            >
                Edit
            </Button>
            <CarComponent id={id} onClose={onClose} isOpen={isOpen} />
        </>
    )
}

export default EditionModal;