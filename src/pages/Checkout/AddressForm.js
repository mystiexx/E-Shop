import React, { useState, useEffect } from "react";
import { Box, Button, Text, Select, Flex, Spacer } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import { commerce } from "../../lib/commerce";
import { Link } from "react-router-dom";

const AddressForm = ({ checkoutToken, next }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState(" ");
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState(" ");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState(" ");
    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({
        id: code,
        label: name,
    }));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({
        id: code,
        label: name,
    }));
    const options = shippingOptions.map((sO) => ({
        id: sO.id,
        label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
    }));

    const fetchShippingCountries = async (checkoutId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutId);

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {
            country,
            region,
        });
        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision)
            fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shippingSubdivision]);

    return (
        <Box bg="white" p={6}>
            <Text>Shipping Address</Text>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit((data) =>
                        next({ ...data, shippingCountry, shippingSubdivision, shippingOption })
                    )}
                >
                    <Flex mb={4}>
                        <Box>
                            {" "}
                            <CustomTextField name="firstName" label="First name" />{" "}
                        </Box>
                        <Spacer />
                        <Box ml={5}>
                            <CustomTextField name="lastName" label="Last name" />
                        </Box>
                    </Flex>

                    <Flex mb={4}>
                        <Box>
                            <CustomTextField name="address1" label="Address" />
                        </Box>
                        <Spacer />
                        <Box ml={5}>
                            <CustomTextField name="email" label="Email" />
                        </Box>
                    </Flex>

                    <Flex mb={4}>
                        <Box>
                            <CustomTextField name="city" label="City" />
                        </Box>
                        <Spacer />
                        <Box ml={5}>
                            <CustomTextField name="zip" label="ZIP / Postal code" />
                        </Box>
                    </Flex>

                    <Text>Shipping Country</Text>
                    <Select
                        value={shippingCountry}
                        isFullWidth
                        onChange={(e) => setShippingCountry(e.target.value)}
                        mb={5}
                        mt={2}
                    >
                        {countries.map((country) => (
                            <option key={country.id} value={country.id}>
                                {country.label}
                            </option>
                        ))}
                    </Select>
                    <Text>Shipping Subdivision</Text>
                    <Select
                        value={shippingSubdivision}
                        isFullWidth
                        onChange={(e) => setShippingSubdivision(e.target.value)}
                        mb={5}
                        mt={2}
                    >
                        {subdivisions.map((subdivision) => (
                            <option key={subdivision.id} value={subdivision.id}>
                                {subdivision.label}
                            </option>
                        ))}
                    </Select>

                    <Text>Shipping Options</Text>
                    <Select
                        value={shippingOption}
                        isFullWidth
                        onChange={(e) => setShippingOption(e.target.value)}
                        mb={5}
                        mt={2}
                    >
                        {options.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </Select>

                    <Flex>
                        <Button as={Link} to="/cart">
                            Back to Cart
                        </Button>
                        <Spacer />
                        <Button type="submit">Next</Button>
                    </Flex>
                </form>
            </FormProvider>
        </Box>
    );
};

export default AddressForm;
