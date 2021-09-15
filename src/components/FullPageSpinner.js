import { Spinner, Center } from "@chakra-ui/react";

const PageSpinner = () => {
    return (
        <>
            <Center marginTop='20%'>
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            </Center>
        </>
    );
};

export default PageSpinner;
