import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { List, ListItem, Flex, Spacer } from "@chakra-ui/react";

const Review = ({ checkoutToken }) => {
    return (
        <Box bg='white' p={6}>
            <Text>Order Summary</Text>
            <List mt={5}>
                {checkoutToken.live.line_items.map((product) => (
                    <>
                        <ListItem>{product.name} </ListItem>
                        <Flex> 
                        <Text>Quantity: {product.quantity} </Text>
                            <Spacer/>
                            <Text>{product.line_total.formatted_with_symbol}</Text>
                        </Flex>
                       
                       
                    </>
                ))}

                <ListItem>
                    <Box borderBottom='1px dashed grey' mt={4} mb={5}/>
                    <Text> Total: </Text>
                    {checkoutToken.live.subtotal.formatted_with_symbol}
                </ListItem>
            </List>
        </Box>
    );
};

export default Review;
