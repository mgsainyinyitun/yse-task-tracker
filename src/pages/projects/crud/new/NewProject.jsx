import { Box, Button, Card, Container, Typography } from "@mui/material";
import { useState } from "react";
import FormStepper from "../../../../components/FormStepper";
import BackButton from "../../../general/BackButton/BackButton";
import AddMembers from "./AddMembers";
import AddTasks from "./AddTasks";
import ProjectDetails from "./ProjectDetails";
import Success from "./Success";

const steps = [
    'Project Detail',
    'Add Members',
    'Add Tasks',
    'Success',
];



function NewProject() {
    const [activeState, setActiveState] = useState(0);

    const renderStepForm = () => {
        switch (activeState) {
            case 0: return <ProjectDetails />
            case 1: return <AddMembers />
            case 2: return <AddTasks />
            case 3: return <Success />
            default: return <h3>Not Step</h3>
        }
    }

    function nextStep(previousStep) {
        if (previousStep > 3) return;
        setActiveState(previousStep + 1);
    }
    function previousStep(currentStep) {
        if (currentStep < 0) return;
        setActiveState(currentStep - 1);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                overflow: 'auto',
                flexDirection: 'column',
                padding: '10px',
                alignItems: 'flex-start',
            }}
        >
            <Box
                sx={{
                    alignSelf: 'flex-start',
                }}
            >
                <BackButton />
            </Box>

            <FormStepper
                steps={steps}
                current={activeState}
            />
            <Container
                maxWidth={'lg'}
                sx={{
                    height: '100%',
                }}
            >
                <Card
                    sx={{
                        borderRadius: '10px',
                        padding: '1rem',
                        marginBottom: '10px',
                        marginTop: '30px',
                    }}
                >
                    <Typography
                        color={'primary'}
                        variant={'h6'}
                    >
                        {steps[activeState].toUpperCase()}
                    </Typography>
                </Card>
                <Card
                    sx={{
                        borderRadius: '10px',
                        padding: '1rem',
                        minHeight: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {renderStepForm()}

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '15px',
                        }}
                    >
                        <Button
                            variant="outlined"
                            disabled={!activeState}
                            onClick={() => previousStep(activeState)}
                        >
                            Back
                        </Button>

                        {(!(activeState === 3) &&
                            <Button
                                variant="contained"
                                disabled={activeState === 3}
                                onClick={() => nextStep(activeState)}
                            >
                                NEXT
                            </Button>
                        )}
                    </Box>
                </Card>
            </Container>
        </Box>
    )
}

export default NewProject;