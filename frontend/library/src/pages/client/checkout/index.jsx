import { memo, useState, useEffect } from 'react';
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
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        address: "",
        phone: "",
    });

    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    useEffect(() => {
        document.title = "Library - Tiến hành muợn sách";
    }, []);

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
                            formData={formData}
                            setFormData={setFormData}
                        />
                    )}

                    {/* Confirm */}
                    {activeStep === 1 && (
                        <Confirm handleBack={handleBack} location={location} formData={formData} />
                    )}
                </Container>
            </Box>
        </>
    );
}

export default memo(Checkout);