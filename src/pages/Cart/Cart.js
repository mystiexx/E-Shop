import { Container, Box, Flex, Spacer, Text, Button,  } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CartBox from "./CartBox";
import { useMediaQuery } from "@chakra-ui/media-query";


const Cart = ({ cart, handleRemoveFromCart, handleEmptyCart, handleUpdateCartQty }) => {
    const [isNotSmallerScreen] = useMediaQuery("(min-width: 600px)");

    const EmptyCart = () => {
        return (
            <Text>
                You have no items in your shopping cart, start adding some!{" "}
                <Text as={Link} to="/home">
                    Back to Home
                </Text>
            </Text>
        );
    };

    if (!cart.line_items) return "loading...";

    return (
        <>
            <Container maxW="container.xl">
                {!cart.line_items.length ? (
                    <EmptyCart />
                ) : (
                    <>
                        <Flex direction={isNotSmallerScreen ? "row" : "column"}>
                            <Box w="100%">
                                {cart.line_items.map((data) => (
                                    <>
                                        <CartBox
                                            data={data}
                                            handleUpdateCartQty={handleUpdateCartQty}
                                            handleRemoveFromCart={handleRemoveFromCart}
                                        />
                                    </>
                                ))}

                                <Button onClick={handleEmptyCart}>Empty Cart </Button>
                            </Box>

                            <Box ml={5}>
                                <Text fontFamily="Comfortaa" fontSize="24px" mb={4}>
                                    {" "}
                                    Order Summary
                                </Text>

                                <Box
                                    w={isNotSmallerScreen ? "324px" : "100%"}
                                    h="147px"
                                    border="15px solid #F5F5F5"
                                    bg="#fff"
                                    p={4}
                                >
                                    <Flex>
                                        <Text
                                            color="#656565"
                                            fontFamily="Comfortaa"
                                            fontSize="18px"
                                        >
                                            Sub-total:{" "}
                                        </Text>
                                        <Spacer />
                                        <Text
                                            color="#656565"
                                            fontFamily="Comfortaa"
                                            fontSize="18px"
                                        >
                                            {" "}
                                            {cart.subtotal.formatted_with_symbol}{" "}
                                        </Text>
                                    </Flex>

                                    <Box borderBottom="1px dashed #E9E7E7" mt={3} />

                                    <Flex mt={5}>
                                        <Text
                                            color="#656565"
                                            fontFamily="Comfortaa"
                                            fontSize="21px"
                                            textTransform="uppercase"
                                        >
                                            Total:{" "}
                                        </Text>
                                        <Spacer />
                                        <Text
                                            color="#656565"
                                            fontFamily="Comfortaa"
                                            fontSize="21px"
                                            fontWeight="bold"
                                        >
                                            {" "}
                                            {cart.subtotal.formatted_with_symbol}{" "}
                                        </Text>
                                    </Flex>
                                </Box>

                                <Link to="/checkout">
                                    <Button
                                        mt={4}
                                        w="100%"
                                        textTransform="uppercase"
                                        color="#fff"
                                        bg="#74AFBE"
                                    >
                                        Proceed to checkout{" "}
                                    </Button>
                                </Link>
                            </Box>
                        </Flex>
                    </>
                )}
            </Container>
        </>
    );
};

export default Cart;
