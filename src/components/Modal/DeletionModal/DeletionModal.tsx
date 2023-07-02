import {
    ChakraProvider,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import styled from '@emotion/styled'

import { useFetchData } from '@/hooks/useFetchData';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { deleteCarRequest } from '@/store/carsSlice';

const StyledSpan = styled.span`
    font-size: 18px;
    font-weight: bold;
`

const DeletionModal = ({ id }: { id: number }) => {
    const dispatch = useAppDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { cars, error } = useFetchData();
    const deletedCar = cars.find((car) => car.id === id);

    const deleteHandler = () => {
        dispatch(deleteCarRequest({ id }))
        console.log(deletedCar);
        if (!error) {
            onClose();
        }
    }

    return (
        <>
            <Button
                color="#fff"
                backgroundColor="red"
                border="1px solid red"
                borderRadius="10px"
                padding="5px"
                width="55px"
                height="30px"
                textAlign="center"
                onClick={onOpen}
            >
                Delete
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Car deletion</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure want to delete <StyledSpan>
                        {deletedCar?.car_color} car {deletedCar?.car} {deletedCar?.car_model} {deletedCar?.car_model_year} model year 
                    </StyledSpan> from database?
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={5} onClick={onClose}>
                    Close
                    </Button>
                    <Button colorScheme='red' onClick={deleteHandler}>Delete</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeletionModal;