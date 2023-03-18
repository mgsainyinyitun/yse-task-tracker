import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
    'Project Detail',
    'Add Members',
    'Add Tasks',
    'Success',
];

export function FormStepper() {
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={1} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}
export default FormStepper;