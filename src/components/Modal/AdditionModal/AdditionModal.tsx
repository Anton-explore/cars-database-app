import {
    ChakraProvider,
    Button,
    useDisclosure,
} from '@chakra-ui/react'

import CarComponent from '@/components/CarComponent'

const AdditionModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button 
                width="80px"
                height="32px"
                color="#FFFF"
                backgroundColor="blue"
                borderRadius="8px"
                padding="7px"
                fontSize={16}
                onClick={onOpen}
            >
                + Add
            </Button>
            <CarComponent onClose={onClose} isOpen={isOpen} />
        </>
    )
}

export default AdditionModal;