import { Autocomplete, Box, Button, Card, Container, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import FormStepper from "../../../../components/FormStepper";
import AddMembers from "./AddMembers";

function NewProject() {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                overflow: 'auto',
                flexDirection: 'column',
                padding: '10px',
                alignItems: 'center',
            }}
        >
            <FormStepper />
            <Container
                maxWidth={'sm'}
                sx={{
                    height:'100%',
                }}
            >

                <Card
                    sx={{
                        borderRadius:'10px',
                        padding:'1rem',
                        marginTop:'30px',
                    }}
                >
                    <Stack spacing={5}>

                        <Typography
                            color={'primary'}
                            variant={'h6'}
                        >
                            PROJECT DETEAILS
                        </Typography>
                        <TextField
                            fullWidth
                            label="Title"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            multiline
                            rows={3}
                        />
                        <Autocomplete
                            fullWidth
                            options={[]}
                            renderInput={params =>
                                <TextField
                                    {...params}
                                    label="Creator"
                                    color="primary"
                                />
                            }
                        />
                        <Button
                            variant="contained"
                        >
                            NEXT
                        </Button>
                    </Stack>
                </Card>
            </Container>
        </Box>
    )
}

export default NewProject;