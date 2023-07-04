import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    useDisclosure,
    useToast
} from '@chakra-ui/react'


import { useHomeContext } from '@/components/Home/HomeContext';
import { RedButton, StyledSpan } from './DeletionModal.style';

const DeletionModal = ({ id }: { id: number }) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { cars, error, deleteCar } = useHomeContext();
    const deletedCar = cars?.find((car) => car.id === id);

    const deleteHandler = () => {
        deleteCar(id);
        if (!error) {
            toast({
            description: "Successfully deleted.",
            status: 'success',
            duration: 7000,
            isClosable: true,
            })
            onClose();
        }
    }

    return (
        <>
            <RedButton
                onClick={onOpen}
            >
                Delete
            </RedButton>
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