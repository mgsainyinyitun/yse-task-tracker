import { Button, Divider, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { timestampToDateString } from "../../../../utils/dateFunction";

function SubmitProjectForm({getValues,members,startDate,endDate }) {

    const { title, description} = getValues();
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Stack spacing={5} flex={1}>
                <TextField
                    fullWidth
                    label="Title"
                    type={'text'}
                    disabled
                    value={title}
                />
                <TextField
                    fullWidth
                    label="Description"
                    type={'text'}
                    multiline
                    disabled
                    value={description}
                    rows={3}
                />
                <TextField
                    fullWidth
                    label="Start Date"
                    type={'text'}
                    disabled
                    value={startDate?timestampToDateString(startDate):'Not Defined'}
                />
                <TextField
                    fullWidth
                    label="End Date"
                    type={'text'}
                    disabled
                    value={endDate?timestampToDateString(endDate):'Not Defined'}
                />

                <Stack
                    sx={{
                        border:'1px solid #626262',
                        borderRadius:'5px',
                        padding:'1rem',
                    }}
                >
                    <Typography variant="h6">
                        Members List
                    </Typography>
                    <Divider
                        sx={{
                            marginTop:'1rem',
                            marginBottom:'1rem',
                        }}
                    />
                    {
                        members.length>0?
                        members.map(member=>{
                            return(
                                <ListItemText
                                    key={member.uid}
                                    primary={member.username}
                                    secondary={member.department}
                                />
                            )
                        }):
                        <Box>
                            EMPTY
                        </Box>
                    }
                </Stack>
                <Stack
                    sx={{
                        border:'1px solid #626262',
                        borderRadius:'5px',
                        padding:'1rem',
                    }}
                >
                    <Typography variant="h6">
                        Tasks List
                    </Typography>
                    <Divider
                        sx={{
                            marginTop:'1rem',
                            marginBottom:'1rem',
                        }}
                    />
                    <ListItemText
                        primary={'Task tiele here'}
                        secondary={'task description go heree '}
                    />
                     <ListItemText
                        primary={'title of the task'}
                        secondary={'Social Media and Design Departmet'}
                    />

                </Stack>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Submit
                    </Button>
                </Box>

            </Stack>
        </Box>);
}
export default SubmitProjectForm;