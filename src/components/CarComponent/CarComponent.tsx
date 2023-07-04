import { useState, useEffect } from 'react'
import { useHomeContext } from '../Home/HomeContext';
import {
    Button,
    ModalFooter,
    ModalBody,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Checkbox,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    useToast
} from '@chakra-ui/react'

import {
    Field,
    Formik,
    Form,
    FormikErrors,
    FieldProps
} from 'formik';

import { CarDataType } from '@/types/datatypes'
import { generateId } from '@/utils/generateId'


const initialFormState: CarDataType = {
    id: generateId(),
    car: '',
    car_color: '',
    car_model: '',
    car_model_year: 0,
    car_vin: '',
    availability: true,
    price: '',
}

type CarComponentProps = { id?: number; isOpen: boolean; onClose: () => void };

const CarComponent = ({ id, onClose, isOpen }: CarComponentProps) => {
    const toast = useToast()
    const { cars, error, updateCar, addCar } = useHomeContext();
    const updatedCar = cars?.find((car) => car.id === id);

    const [newCar, setNewCar] = useState<CarDataType>(initialFormState);

    useEffect(() => { 
        if (updatedCar) {
            setNewCar(updatedCar);
        }
    }, [updatedCar]);

    function validate(values: CarDataType): FormikErrors<CarDataType> {
        const errors: FormikErrors<CarDataType> = {};
        if (!values.car) {
        errors.car = 'Company is required'
        }
        if (!values.car_model) {
        errors.car_model = "Model is required"
        }
        if (!values.car_model_year) {
        errors.car_model_year = "Model year is required"
        }
        if (!values.car_vin) {
        errors.car_vin = "Car VIN is required"
        }
        if (!values.price) {
        errors.price = "Car price is required"
        } else if (!/^\$/.test(values.price)) {
            errors.price = "Type '$' sign before price"
        }
        return errors
    }


    const savingHandler = (values: CarDataType) => {
        if (id) {
            updateCar(values)
        } else {
            addCar(values);
        }
        if (!error) {
            toast({
            description: id ? "Successfully updated." : "Successfully created.",
            status: 'success',
            duration: 7000,
            isClosable: true,
            })
            onClose();
        }
    }

    return (
        <Modal
            size='lg'
            onClose={onClose}
            isOpen={isOpen}
            scrollBehavior='outside'
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{id ? 'Edit car data' : 'Create new car'}</ModalHeader>
                <ModalCloseButton />
                <Formik
                    initialValues={newCar}
                    validate={validate}
                    onSubmit={(values, actions) => {
                        savingHandler(values);
                        actions.setSubmitting(false);
                        actions.resetForm();
                        onClose();
                    }}
                >   
                {({
                        errors,
                        touched,
                        dirty,
                        isSubmitting,
                        isValid,
                }) => (
                    
                    <Form>
                        <ModalBody>
                            <Field name='car'>
                                {({ field }: FieldProps<CarDataType['car']>) => (
                                <FormControl
                                    isDisabled={!!id}
                                    isInvalid={!!errors.car && touched.car}>
                                    <FormLabel>Company</FormLabel>
                                    <Input {...field} placeholder='company' />
                                    <FormErrorMessage>{errors.car}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                            <Field name='car_model'>
                                {({ field }: FieldProps<CarDataType['car_model']>) => (
                                <FormControl
                                    isDisabled={!!id}
                                    isInvalid={!!errors.car_model && touched.car_model}>
                                    <FormLabel>Model</FormLabel>
                                    <Input {...field} placeholder='car model' />
                                    <FormErrorMessage>{errors.car_model}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                            <Field name='car_vin'>
                                {({ field }: FieldProps<CarDataType['car_vin']>) => (
                                <FormControl
                                    isDisabled={!!id}
                                    isInvalid={!!errors.car_vin && touched.car_vin}>
                                    <FormLabel>VIN code</FormLabel>
                                    <Input {...field} placeholder='car VIN code' />
                                    <FormErrorMessage>{errors.car_vin}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                            <Field name='car_model_year'>
                                {({ field, form }: FieldProps<CarDataType['car_model_year']>) => (
                                <FormControl
                                    isDisabled={!!id}
                                    isInvalid={!!errors.car_model_year && touched.car_model_year}>
                                    <FormLabel>Year</FormLabel>
                                    <NumberInput
                                        id='car_model_year'
                                        max={2030}
                                        min={1910}
                                        value={field.value}
                                        onChange={(value) => form.setFieldValue(field.name, value)}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <FormErrorMessage>{errors.car_model_year}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                            <Field name='car_color'>
                                {({ field }: FieldProps<CarDataType['car_color']>) => (
                                <FormControl
                                    isInvalid={!!errors.car_color && touched.car_color}>
                                    <FormLabel>Color</FormLabel>
                                    <Input {...field} placeholder='car color' />
                                    <FormErrorMessage>{errors.car_color}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                            <Field name='availability'>
                                {({ field }: FieldProps<CarDataType['availability']>) => (
                                <FormControl>
                                    <FormLabel>Availability</FormLabel>
                                    <Flex align="center" gap="5px">
                                        <Checkbox 
                                            ml={3} 
                                            id='availability' 
                                            {...field} 
                                            isChecked={field.value}
                                        />
                                        <span>Available</span>
                                    </Flex>
                                </FormControl>
                                )}
                            </Field>
                            <Field name='price'>
                                {({ field }: FieldProps<CarDataType['price']>) => (
                                <FormControl
                                    isInvalid={!!errors.price && touched.price}>
                                    <FormLabel>Price</FormLabel>
                                    <Input 
                                        {...field} 
                                        placeholder='price'
                                    />
                                    <FormErrorMessage>{errors.price}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' onClick={onClose} mr={5}>Close</Button>
                            <Button 
                                type='submit'
                                isLoading={isSubmitting}
                                loadingText='Saving'
                                colorScheme='green'
                                isDisabled={!isValid || !dirty || isSubmitting}
                            >
                                Save
                            </Button>
                        </ModalFooter>
                    </Form>
                )}
                </Formik>
            </ModalContent>
        </Modal>
    )
} 

export default CarComponent;