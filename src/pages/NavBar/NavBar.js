import { Box, Container, Flex, Spacer, Image, IconButton, Input } from "@chakra-ui/react";
import logo from "../../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@material-ui/core";
import { BsBag } from "react-icons/bs";

const NavBar = ({ totalItems }) => {
    const location = useLocation();
    

   
    return (
        <>
            <Box
                w="100%"
                zIndex="999"
                position="sticky"
                top="0"
                h="70px"
              
                bg={location.pathname === "/" ? "#F6F7FB" : "#F6F7FB"}
            >
                <Container maxW="container.xl">
                    <Flex mt={4}>
                        <Link to="/">
                            <Box h="40px">
                                <Image src={logo} />
                            </Box>
                        </Link>
                        <Spacer />
                        <Box mr={4}>
                            {" "}
                            <Input placeholder="Search..." />{" "}
                        </Box>

                        {location.pathname !== "/cart" ? (
                            <Link to="/cart">
                                <Badge badgeContent={totalItems} color="primary">
                                    <IconButton
                                        bg="#74AFBE"
                                        isRound
                                        aria-label="Search database"
                                        icon={<BsBag color="#fff" />}
                                    />
                                </Badge>
                            </Link>
                        ) : (
                          <>

                          </>
                        )}
                    </Flex>
                </Container>
            </Box>
        </>
    );
};

export default NavBar;
