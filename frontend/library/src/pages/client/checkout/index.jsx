import { memo, useState } from 'react';
import {
    Box,
    Container,
    Step,
    StepLabel,
    Stepper
} from "@mui/material";
import Address from './address';
import Confirm from './confirm';

const steps = ["Vận chuyển", "Mượn Sách"];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [location, setLocation] = useState("");

    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    return (
        <>
            <Box sx={{ p: 2 }}>
                <Container maxWidth="lg">
                    {/* Stepper */}
                    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {/* Form */}
                    {activeStep === 0 && (
                        <Address
                            location={location}
                            setLocation={setLocation}
                            handleNext={handleNext}
                        />
                    )}

                    {/* Confirm */}
                    {activeStep === 1 && (
                        <Confirm handleBack={handleBack} />
                    )}
                </Container>
            </Box>
        </>
    );
}

export default memo(Checkout);