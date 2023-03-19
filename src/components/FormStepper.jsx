import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export function FormStepper({steps,current}) {
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper 
                activeStep={current} 
                alternativeLabel
                sx={{
                    "& .css-m8a1uf-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": { color: "green" },
                }}
            >
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