import { Grid, Box, Text, Container, Button, Image, Flex } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/media-query";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react";
import { IoBagAddOutline } from "react-icons/io5";
import Categories from "../../components/Categories";

const Home = ({ onAddToCart, categories, products, fetchCategory }) => {
    const [isNotSmallerScreen] = useMediaQuery("(min-width: 600px)");

    if (!products) return "loading...";
    return (
        <Container maxW="container.xl">
            <Flex direction={isNotSmallerScreen ? "row" : "column"}>
                <Box w={isNotSmallerScreen ? "20%" : "100%"} mr={8} mb={5}>
                    <Accordion allowMultiple>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        Categories
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Categories categories={categories} fetchCategory={fetchCategory} />
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        Filters
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>

                <Box pb={6}>
                    <Text fontFamily="Comfortaa" fontSize="24px" mb={4}>
                        {" "}
                        All Products{" "}
                    </Text>
                    <Grid
                        templateColumns={isNotSmallerScreen ? "repeat(3, 1fr)" : "repeat(2, 1fr)"}
                        gap={6}
                    >
                        {products
                            .slice(0)
                            .reverse()
                            .map((product) => (
                                <Box key={product.id} maxW="lg" overflow="hidden" mb={8} w={isNotSmallerScreen ? "100%" : "100%"}>
                                    <Image
                                        src={product.media.source}
                                        boxSize={isNotSmallerScreen ? "320px" : "200px"}
                                    />
                                    <Box>
                                        <Text
                                            fontFamily="Comfortaa"
                                            fontSize={isNotSmallerScreen ? "20px" : "14px"}
                                            color="#263336"
                                            mt={2}
                                        >
                                            {product.name}
                                        </Text>
                                        <Text
                                            fontSize={isNotSmallerScreen ? "14px" : "10px"}
                                            fontFamily="Comfortaa"
                                            color="#A2A2A2"
                                            dangerouslySetInnerHTML={{
                                                __html: product.description,
                                            }}
                                        />
                                        <Text>{product.price.formatted_with_symbol}</Text>

                                        <Box
                                            as={Button}
                                            bg="transparent"
                                            onClick={() => onAddToCart(product.id, 1)}
                                            mt={2}
                                        >
                                            <IoBagAddOutline size="30px" />
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                    </Grid>
                </Box>
            </Flex>
        </Container>
    );
};

export default Home;
