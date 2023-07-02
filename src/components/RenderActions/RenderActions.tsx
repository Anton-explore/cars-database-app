import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react"
import { useState } from "react"

import EditionModal from "@/components/Modal/EditionModal/EditionModal"
import DeletionModal from "../Modal/DeletionModal/DeletionModal";
import { ChevronDownIcon } from "@chakra-ui/icons";

const RenderActions = ({ id }: { id: number}) => {
    // const [isMenuOpen, setIsMenuOpen] = useState(false);

    // const toggleMenu = () => {
    //     setIsMenuOpen(!isMenuOpen);
    // };

    // const handleButtonClick = () => {
    //     setIsMenuOpen(false); 
    // };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            // alignItems="center"
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

            {/* <Button
                color="blue"
                backgroundColor="#FFFF"
                borderRadius={8}
                padding={5}
                fontSize={16}
                width={80}
                height={32}
                onClick={toggleMenu}
            >
              Open Menu
            </Button>
            {isMenuOpen && (<Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                // alignItems="center"
                padding={5} gap={10}
                borderRadius={10}
            >
                <EditionModal id={id} />
                <DeletionModal id={id} />
            </Box>)} */}
        </Box>
    )
}

export default RenderActions;