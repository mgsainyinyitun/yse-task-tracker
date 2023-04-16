import { Autocomplete, Avatar, Box, Button, Divider, Grid, IconButton, Paper, Stack, TextField, Typography, Fab } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { EditOutlined, SaveOutlined } from "@mui/icons-material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CONSTANTS } from "../../constants";
import { useState } from "react";
import { useEffect } from "react";
import { findTaskById, updateTask } from "../../../backend/controller/taskController";
import { readUsers } from "../../../backend/controller/userController";
import OverlayLoading from "../../../components/OverlayLoading";
import { useForm } from "react-hook-form";
import { checkEmpty } from "../../../validation/commonValidation";
import { findUserByUsername } from "../../../utils/commonFunctions";
import { serverTimestamp } from "firebase/firestore";
import { PAGE } from "../../pageConstants";
import SuccessPage from "../../general/SuccessPage";

const priority = Object.values(CONSTANTS.PRIORITY);
const status = Object.values(CONSTANTS.STATUS);

function TaskEdit() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [finishedDate, setFinishedDate] = useState(null);
    const [change, setChange] = useState(false);
    const nevigate = useNavigate();
    const { register, handleSubmit, formState, setValue } = useForm();
    const { errors } = formState;
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setLoading(true);
        findTaskById(id)
            .then((res) => {
                setTask(res.data);
                if (res.data.startDate) {
                    setStartDate(new Date(res.data.startDate));
                }
                if (res.data.dueDate) {
                    setDueDate(new Date(res.data.dueDate));
                }
                if (res.data.finishedDate) {
                    setFinishedDate(new Date(res.data.finishedDate));
                }
                setValue('consignee', res.data.consignee.username);
                setValue('priority', res.data.priority)
                setValue('status', res.data.status)
                setLoading(false);
            });

        readUsers()
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
    }, []);

    function handleTaskEditForm(data) {
        const { title, description, consignee, priority, status, deliverable, remarks } = data;
        let consigneeObj = findUserByUsername(consignee, users);
        let task = {
            id,
            title,
            description,
            consignee: consignee ? {
                uid: consigneeObj.uid,
                username: consigneeObj.username,
            } : null,
            priority,
            status,
            startDate: startDate ? new Date(startDate) : null,
            dueDate: dueDate ? new Date(dueDate) : null,
            finishedDate: finishedDate ? new Date(finishedDate) : null,
            remarks,
            deliverable,
            updatedAt: serverTimestamp(),
        }
        console.log(task);
        setLoading(true);
        updateTask(task)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        setLoading(false);
        setSuccess(true);
        // nevigate(PAGE.LINK.TASKS.INDEX);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                overflow: 'scroll',
                flexDirection: 'column',
                padding: '10px',
                alignItems: 'center',
            }}
        >
            {(task && success && <>
                <SuccessPage
                    link={PAGE.LINK.TASKS.INDEX}
                    name={'Tasks List'}
                />
                
            </>)}
            {(task && !success && <>
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
                <form onSubmit={handleSubmit(handleTaskEditForm)} noValidate>
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
                                    marginTop: '10px',
                                    marginBottom: '10px',
                                    height: 3
                                }} />
                                <Stack spacing={5} mt={3}>
                                    <TextField
                                        label="Title"
                                        defaultValue={task.title}
                                        {...register("title", {
                                            validate: { checkTitle: (v) => checkEmpty(v) }
                                        })}
                                        error={!!errors.title}
                                        helperText={errors.title ? errors.title.message : null}
                                        onChange={() => setChange(true)}
                                    />
                                    <TextField
                                        label="Description"
                                        color="primary"
                                        defaultValue={task.description}
                                        multiline
                                        rows={3}
                                        error={!!errors.description}
                                        {...register("description", {
                                            validate: { checkDescription: (v) => checkEmpty(v) }
                                        })}
                                        helperText={errors.description ? errors.description.message : null}
                                        onChange={() => setChange(true)}
                                    />
                                    <Stack spacing={5} direction={'row'}>
                                        <TextField
                                            label="Consigner"
                                            color="primary"
                                            disabled={true}
                                            defaultValue={task.consigner ? task.consigner.username : null}
                                            fullWidth
                                        />

                                        <Autocomplete
                                            fullWidth
                                            onChange={() => setChange(true)}
                                            defaultValue={task.consignee.username}
                                            options={users.map(user => user.username)}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    {...register("consignee")}
                                                    label="Consignee"
                                                    color="primary"
                                                />}
                                        />
                                    </Stack>
                                    <Stack spacing={5} direction={'row'}>
                                        <Autocomplete
                                            fullWidth
                                            defaultValue={task.priority}
                                            id="controllable-states-demo"
                                            options={priority}
                                            onChange={() => setChange(true)}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    label="Priority"
                                                    color="primary"
                                                    error={!!errors.priority}
                                                    {...register("priority", {
                                                        validate: { checkPriority: (v) => checkEmpty(v) }
                                                    })}
                                                    helperText={errors.priority ? errors.priority.message : null}
                                                />}
                                        />
                                        <Autocomplete
                                            fullWidth
                                            defaultValue={task.status}
                                            options={status}
                                            error={!!errors.status}
                                            onChange={() => setChange(true)}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    label="Status"
                                                    color="primary"
                                                    {...register("status", {
                                                        validate: { checkStatus: (v) => checkEmpty(v) }
                                                    })}
                                                    helperText={errors.status ? errors.status.message : null}
                                                />}
                                        />
                                    </Stack>
                                    <Stack spacing={5} direction={'row'}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DesktopDatePicker
                                                value={startDate}
                                                label="Start Date"
                                                inputFormat="DD/MM/YYYY"
                                                onChange={(newDate) => { setStartDate(newDate); setChange(true) }}
                                                renderInput={(params) => <TextField fullWidth {...params} />}
                                            />
                                            <DesktopDatePicker
                                                value={dueDate}
                                                label="Due Date"
                                                inputFormat="DD/MM/YYYY"
                                                onChange={(newDate) => { setDueDate(newDate); setChange(true) }}
                                                renderInput={(params) => <TextField fullWidth {...params} />}
                                            />
                                            <DesktopDatePicker
                                                value={finishedDate}
                                                label="Finished Date"
                                                inputFormat="DD/MM/YYYY"
                                                onChange={(newDate) => { setFinishedDate(newDate); setChange(true) }}
                                                renderInput={(params) => <TextField fullWidth {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Stack>
                                    <TextField
                                        label="Deliverables"
                                        color="primary"
                                        {...register("deliverable")}
                                        defaultValue={task.deliverable}
                                        onChange={() => setChange(true)}
                                    />
                                    <TextField
                                        label="Remarks"
                                        defaultValue={task.remarks}
                                        {...register("remarks")}
                                        color="primary"
                                        multiline
                                        onChange={() => setChange(true)}
                                        rows={3}
                                    />
                                    <Divider color={'primary.dark'} sx={{
                                        marginTop: '10px',
                                        height: 3
                                    }} />
                                    <Box>
                                        <Button disabled={!change} type="submit" startIcon={<SaveOutlined />} variant={'contained'} > UPDATE </Button>
                                    </Box>
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item md={2} sm={12}></Grid>
                    </Grid>
                </form>
            </>
            )}
            <OverlayLoading open={loading} />
        </Box>
    )
}

export default TaskEdit;