import { Box, Container, Text, Flex, Spacer, Image, Grid, Button } from "@chakra-ui/react";
import nike from "../../assets/nike1.png";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { useMediaQuery } from "@chakra-ui/media-query";
import "./index.css";
import { PUBLIC_PATHS } from "../../components/constants";

const HomePage = ({ products, onAddToCart }) => {
    const [isNotSmallerScreen] = useMediaQuery("(min-width: 600px)");

    return (
        <Box w="100%">
          
                <Container maxW="container.xl">
                    <Box bg="white" p={6}>
                        <Box
                            w="454px"
                            h="454px"
                            borderRadius="100%"
                            bg="#D7E8EB"
                            position="absolute"
                            zIndex="1"
                            marginLeft="40%"
                            marginTop="10%"
                            display={isNotSmallerScreen ? 'block' : 'none'}
                        />
                        <Box zIndex="30" position="relative" h="100vh">
                            <Flex>
                                <Box marginTop="200px" ml={8}>
                                    <Text fontSize="56px" textTransform="uppercase" color="#263336">
                                        Welcome to <br /> Sutairu
                                    </Text>
                                    {/* <Text fontFamily="Comfortaa" fontSize="18px" color="#586163">
                                        This Nike AF1’s designed by Nike, this simple <br /> black
                                        and white color mash-up will suit your <br /> every day
                                        needs
                                    </Text> */}



                                    <Box as={Link} to={PUBLIC_PATHS.HOME}>
                                        <Box
                                            bg="#74AFBE"
                                            borderRadius="30px"
                                            w="209px"
                                            h="53px"
                                            mt={3}
                                        >
                                            <Flex>
                                                <Text
                                                    textTransform="uppercase"
                                                    color="#fff"
                                                    fontFamily="Comfortaa"
                                                    fontSize="14px"
                                                    mt={4}
                                                    ml={4}
                                                    fontWeight="700"
                                                >
                                                    Shop now
                                                </Text>
                                                <Spacer />
                                                <Box
                                                    w="34px"
                                                    h="34px"
                                                    borderRadius="100%"
                                                    bg="#fff"
                                                    mt={2}
                                                    mr={4}
                                                >
                                                    <AiOutlineRight
                                                        color="#74AFBE"
                                                        size="30px"
                                                        style={{
                                                            marginTop: "2px",
                                                            marginLeft: "2px",
                                                        }}
                                                    />
                                                </Box>
                                            </Flex>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box>
                                    <Image src={nike} alt="nike"  display={isNotSmallerScreen ? 'block' : 'none'}/>
                                </Box>
                            </Flex>
                        </Box>
                    </Box>

                    <Box mt={8} w="100%">
                        <Text fontSize="1.5rem" mb={5}>
                            Catalog{" "}
                        </Text>
                        <Grid
                            templateColumns={
                                isNotSmallerScreen ? "repeat(3, 1fr)" : "repeat(1, 1fr)"
                            }
                            gap={isNotSmallerScreen ? 2 : 2}
                        >
                            {products
                                .slice(0, 6)
                                .reverse()
                                .map((data) => (
                                    <Box
                                        key={data.id}
                                        maxW="lg"
                                        overflow="hidden"
                                        w={isNotSmallerScreen ? "100%" : "100%"}
                                        mb={8}
                                        className="card"
                                    >
                                        <Image
                                            src={data.media.source}
                                            objectFit="cover"
                                            boxSize="400px"
                                            className="img"
                                        />
                                        <Box className="info">
                                            <Button
                                                bg="transparent"
                                                w="100%"
                                                onClick={() => onAddToCart(data.id, 1)}
                                            >
                                                Add to Bag
                                            </Button>
                                        </Box>
                                    </Box>
                                ))}
                        </Grid>

                        <Box pb={6}>
                            <a href={PUBLIC_PATHS.HOME}>View All Catalog</a>
                        </Box>
                    </Box>
                </Container>
         
        </Box>
    );
};

export default HomePage;
