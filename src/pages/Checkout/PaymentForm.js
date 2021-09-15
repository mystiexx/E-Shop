import React from "react";
import Review from "./Review";
import { Button, Divider, Text, Flex, Spacer, Box } from "@chakra-ui/react";
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, shippingData, onCaptureCheckout, backStep, nextStep, timeout }) => {

    console.log('DATA', shippingData)

    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            console.log(error);
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: shippingData.firstName,
                    lastname: shippingData.lastName,
                    email: shippingData.email,
                },
                shipping: {
                    name: "Primary",
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry,
                },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: "stripe",
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                },
            };

            onCaptureCheckout(checkoutToken.id, orderData);

            timeout()

            nextStep();
        }
    };
    return (
        <Box bg='white' p={6}>
            <Review checkoutToken={checkoutToken} />

            <Divider />
            <Text mb={4}>Payment Method</Text>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <br />
                            <br />
                            <Flex>
                                <Button onClick={backStep}>Back</Button>
                                <Spacer />
                                <Button  disabled={!stripe} type='submit'>
                                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </Flex>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </Box>
    );
};

export default PaymentForm;
