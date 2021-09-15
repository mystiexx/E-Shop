import { Box, Flex, Image, Button, Text, Spacer, IconButton } from "@chakra-ui/react";
import { RiDeleteBin4Line } from "react-icons/ri";

const CartBox = ({ data, handleRemoveFromCart, handleUpdateCartQty }) => {
    return (
        <>
            <Box w="100%" borderBottom="1px dashed #E9E7E7" mb={3} p={6}>
                <Flex>
                    <Image src={data.media.source} boxSize="100px" />
                    <Text fontFamily="Comfortaa" color="#B7B7B7" fontSize="14px" mt={8} ml={5}>
                        {" "}
                        {data.name}{" "}
                    </Text>
                    <Spacer />
                    <Text fontFamily="Comfortaa" color="#383838" fontSize="14px" mt={8} ml={5}>
                        {" "}
                        {data.line_total.formatted_with_symbol}{" "}
                    </Text>
                    <Spacer />

                    <Button
                        mt={5}
                        bg="transparent"
                        onClick={() => handleUpdateCartQty(data.id, data.quantity - 1)}
                    >
                        {" "}
                        -{" "}
                    </Button>
                    <Text
                        ml={3}
                        mr={3}
                        fontFamily="Comfortaa"
                        color="#383838"
                        fontSize="14px"
                        mt={8}
                    >
                        {data.quantity}
                    </Text>
                    <Button
                        bg="transparent"
                        mt={5}
                        onClick={() => handleUpdateCartQty(data.id, data.quantity + 1)}
                    >
                        {" "}
                        +{" "}
                    </Button>
                    <Spacer />
                    <IconButton
                    bg='transparent'
                    mt={5}
                        onClick={() => handleRemoveFromCart(data.id)}
                        isRound
                        aria-label="Search database"
                        icon={<RiDeleteBin4Line />}
                    />
                </Flex>
            </Box>
        </>
    );
};

export default CartBox;
