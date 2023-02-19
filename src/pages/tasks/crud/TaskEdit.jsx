import { Autocomplete, Avatar, Box, Button, Container, Divider, Grid, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { findTask } from "../../../utils/commonFunctions";
import { mockTasks } from "../../../data/mockData";
import { EditOutlined, SaveOutlined } from "@mui/icons-material";
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const priority =
    [
        'Low',
        'High',
        'Medium',
    ];

const status =
    [
        'In Progress',
        'Finished',
        'Not Start Yet',
    ];

function TaskEdit() {
    const { id } = useParams();
    const task = findTask(id, mockTasks);
    const nevigate = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '83vh',
                overflow: 'scroll',
                flexDirection: 'column',
                padding: '10px',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    alignSelf: 'flex-start',
                }}
            >
                <IconButton onClick={() => nevigate(-1)}
                    sx={{
                        color: theme => theme.palette.primary.dark,
                        fontWeight: 'bold',
                    }}
                >
                    <ArrowBackIosOutlinedIcon fontSize={'small'} />
                </IconButton>
            </Box>

            <Grid container>
                <Grid item md={2} sm={12}></Grid>
                <Grid item md={8} sm={12}>
                    <Box
                        sx={{
                            border: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '20px',
                            borderRadius: '10px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'primary.main',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'blue',
                                },
                            }
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px',
                                borderRadius: '30px',
                            }}>
                            <Avatar sx={{ marginRight: '10px', background: theme => theme.palette.primary.dark }}>
                                <EditOutlined />
                            </Avatar>
                            <Typography variant="h5" color={'primary.dark'}>TASK EDIT FORM</Typography>
                        </Box>

                        <Divider color={'primary.dark'} sx={{
                            marginTop:'10px',
                            marginBottom:'10px',
                            height:3
                        }} />


                        <Stack spacing={5} mt={3}>
                            <TextField
                                label="Title"
                                defaultValue={task.title}
                            />
                            <TextField
                                label="Description"
                                color="primary"
                                defaultValue={task.description}
                                multiline
                                rows={3}
                            />
                            <Stack spacing={5} direction={'row'}>
                                <TextField
                                    label="Consigner"
                                    color="primary"
                                    defaultValue={task.consigner.name}
                                    fullWidth
                                />
                                <TextField
                                    fullWidth
                                    defaultValue={task.consignee.name}
                                    label="Consignee"
                                    color="primary"
                                />
                            </Stack>
                            <Stack spacing={5} direction={'row'}>
                                <Autocomplete
                                    fullWidth
                                    defaultValue={task.priority}
                                    id="controllable-states-demo"
                                    options={priority}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Priority"
                                            color="primary"
                                        />}
                                />
                                <Autocomplete
                                    fullWidth
                                    defaultValue={task.status}
                                    id="controllable-states-demo"
                                    options={status}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Status"
                                            color="primary"
                                        />}
                                />
                            </Stack>
                            <Stack spacing={5} direction={'row'}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        value={task.startDate}
                                        label="Start Date"
                                        inputFormat="MM/DD/YYYY"
                                        onChange={() => console.log('date change')}
                                        renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                    <DesktopDatePicker
                                        value={task.dueDate}
                                        label="Due Date"
                                        inputFormat="MM/DD/YYYY"
                                        onChange={() => console.log('date change')}
                                        renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                    <DesktopDatePicker
                                        value={task.finishedDate}
                                        label="Finished Date"
                                        inputFormat="MM/DD/YYYY"
                                        onChange={() => console.log('date change')}
                                        renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                            <TextField
                                label="Deliverables"
                                color="primary"
                                defaultValue={task.deliverable}
                            />
                            <TextField
                                label="Remarks"
                                value={task.remark}
                                color="primary"
                                multiline
                                rows={3}
                            />
                        <Divider color={'primary.dark'} sx={{
                            marginTop:'10px',
                            height:3
                        }} />
                            <Box>
                                <Button startIcon={<SaveOutlined />} variant={'contained'} sx={{ borderRadius: '20px' }}> Save </Button>
                            </Box>
                        </Stack>
                    </Box>

                </Grid>
                <Grid item md={2} sm={12}></Grid>
            </Grid>



        </Box>
    )
}

export default TaskEdit;