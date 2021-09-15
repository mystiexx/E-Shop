import React, { useState, useEffect } from "react";
import { Stepper, Step, CircularProgress, Divider, StepLabel } from "@material-ui/core";
import { Box, Container, Text, Button, Center } from "@chakra-ui/react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import { commerce } from "../../lib/commerce";
import { Link, useHistory } from "react-router-dom";

const steps = ["Shipping address", "Payment Details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: "cart" });
                setCheckoutToken(token);
            } catch (err) {
                history.push("/");
            }
        };

        generateToken();
    }, [cart, history]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);

        nextStep();
    };

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true);
        }, 3000);
    };

    let Confirmation = () =>
        order.customer ? (
            <>
                <div>
                    <Text>
                        Thank you for your purchase, {order.customer.firstname}{" "}
                        {order.customer.lastname}
                    </Text>
                    <Divider />
                    <Text> Order ref: {order.customer_reference}</Text>
                </div>
                <br />
                <Button as={Link} to="/">
                    Back to Home
                </Button>
            </>
        ) : isFinished ? (
            <>
                <div>
                    <Text>Thank you for your purchase</Text>
                    <Divider />
                </div>
                <br />
                <Button as={Link} to="/">
                    Back to Home
                </Button>
            </>
        ) : (
            <div>
                <CircularProgress />
            </div>
        );

    if (error) {
        <>
            <Text> Error: {error}</Text>
            <br />
            <Button as={Link} to="/">
                Back to Home
            </Button>
        </>;
    }

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm checkoutToken={checkoutToken} next={next} />
        ) : (
            <PaymentForm
                backStep={backStep}
                checkoutToken={checkoutToken}
                shippingData={shippingData}
                onCaptureCheckout={onCaptureCheckout}
                nextStep={nextStep}
                timeout={timeout}
            />
        );
    return (
        <Box>
            <Container maxW="container.lg">
                <Center>
                    <Box>
                        <Text textAlign="center">Checkout</Text>
                        <Stepper activeStep={activeStep}>
                            {steps.map((step) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                    </Box>
                </Center>
            </Container>
        </Box>
    );
};

export default Checkout;
