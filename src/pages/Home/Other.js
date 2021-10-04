import { useState, useEffect } from "react";
import { Grid, Box, Text, Container, Button, Image, Flex } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/media-query";
import { IoBagAddOutline } from "react-icons/io5";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react";
import Categories from "../../components/Categories";
import PageSpinner from "../../components/FullPageSpinner";
import { useParams } from "react-router-dom";


const Other = ({ products, onAddToCart, categories }) => {
    const [isNotSmallerScreen] = useMediaQuery("(min-width: 600px)");
    const [loading, setLoading] = useState(true);

    const { id } = useParams()

    

    useEffect(() => {
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container maxW="container.xl">
            {loading ? (
                <PageSpinner />
            ) : (
                <>
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
                                        <Categories categories={categories} />
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
                                    <AccordionPanel pb={4}></AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </Box>

                        <Grid
                            templateColumns={
                                isNotSmallerScreen ? "repeat(3, 1fr)" : "repeat(2, 1fr)"
                            }
                            gap={6}
                        >
                            {products.filter((p) => p.categories.find((cat) => cat.id ===id ))
                                .slice(0)
                                .reverse()
                                .map((product) => (
                                    <Box
                                        key={product.id}
                                        maxW="lg"
                                        overflow="hidden"
                                        mb={8}
                                        w={isNotSmallerScreen ? "100%" : "100%"}
                                    >
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
                    </Flex>
                </>
            )}
        </Container>
    );
};

export default Other;
