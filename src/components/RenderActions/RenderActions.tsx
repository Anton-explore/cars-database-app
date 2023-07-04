import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react"

import EditionModal from "@/components/Modal/EditionModal/EditionModal"
import DeletionModal from "../Modal/DeletionModal/DeletionModal";
import { ChevronDownIcon } from "@chakra-ui/icons";

const RenderActions = ({ id }: { id: number}) => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
        >
            <Menu>
                {({ isOpen }) => (
                    <>
                        <MenuButton
                            borderRadius="8px"
                            padding="5px"
                            fontSize="16px"
                            width="110px"
                            height="32px"
                            isActive={isOpen}
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                        >
                            {isOpen ? 'Close menu' : 'Open menu'}
                        </MenuButton>
                        <MenuList>
                            <MenuItem mb="5px"><EditionModal id={id} /></MenuItem>
                            <MenuItem><DeletionModal id={id} /></MenuItem>
                        </MenuList>
                    </>
                )}
            </Menu>
        </Box>
    )
}

export default RenderActions;