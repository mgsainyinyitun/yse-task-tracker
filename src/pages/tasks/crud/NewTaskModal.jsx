import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Box, Stack, TextField, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import { readUsers } from "../../../backend/controller/userController";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm } from "react-hook-form";
import { checkEmpty } from "../../../validation/commonValidation";
import { useSelector } from "react-redux";
import { findUserByUsername } from "../../../utils/commonFunctions";
import { serverTimestamp } from "firebase/firestore";
import OverlayLoading from "../../../components/OverlayLoading";
import { addTask } from "../../../backend/controller/taskController";
import { CONSTANTS } from "../../constants";
const priority =
    [
        'Low',
        'High',
        'Medium',
    ];
function NewTaskModal({ open, setOpen, projectId,setError,setSuccess,setErrorObj }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stateDate, setStartDate] = useState(new Date());
    const [dueDate, setDueDate] = useState(null);
    const { register, handleSubmit, formState, getValues, reset } = useForm();
    const user = useSelector(state => state.users.user);
    const { errors } = formState;
useEffect(() => {
        readUsers()
            .then(res => {
                setUsers(res.data);
            })
    }, []);

    function submitNewTaskForm(data) {
        const { title, description, assignTo, priority, remark } = data;
        let consignee = findUserByUsername(assignTo, users);
        let task = {
            title,
            description,
            consigner: {
                uid: user.uid,
                username: user.username,
            },
            consignee: assignTo ? {
                uid: consignee.uid,
                username: consignee.username,
            } : null,
            priority,
            status: CONSTANTS.STATUS.NOTSTART,
            startDate: stateDate ? new Date(stateDate) : null,
            dueDate: dueDate ? new Date(dueDate) : null,
            remarks: remark,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        }
        setLoading(true);

        addTask(projectId, task)
            .then(res => {
                console.log(res);
                setLoading(false);
                if (res.status === 0) {
                    setSuccess(true);
                    setError(false);
                    setOpen(false);
                }
            })
            .catch(err => {
                setLoading(false);
                setSuccess(false);
                setError(true);
                setErrorObj(err);
            })
            reset();
    }

    return (
        <Dialog
            open={open}
            onClose={() => { setOpen(false); reset();}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="md"
        >
            <form onSubmit={handleSubmit(submitNewTaskForm)} >
                <DialogTitle id="alert-dialog-title" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    ADD NEW TASK
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mr={1} mt={1}>
                        <TextField
                            label="Title"
                            type={'text'}
                            {...register("title", {
                                validate: { checkTitle: (v) => checkEmpty(v) }
                            })}
                            error={!!errors.title}
                            helperText={errors.title ? errors.title.message : null}
                        />

                        <TextField
                            label="Description"
                            color="primary"
                            type={'text'}
                            error={!!errors.description}
                            {...register("description", {
                                validate: { checkDescription: (v) => checkEmpty(v) }
                            })}
                            helperText={errors.description ? errors.description.message : null}
                            multiline
                            rows={3}
                        />
                        <Autocomplete
                            fullWidth
                            options={users.map(user => {
                                return user.username;
                            })}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    {...register("assignTo")}
                                    label="Assign To"
                                    color="primary"
                                />}
                        />
                        <Autocomplete
                            fullWidth
                            options={priority}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    error={!!errors.priority}
                                    {...register("priority", {
                                        validate: { checkPriority: (v) => checkEmpty(v) }
                                    })}
                                    helperText={errors.priority ? errors.priority.message : null}
                                    label="Priority"
                                    color="primary"
                                />}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Start Date"
                                value={stateDate}
                                inputFormat="DD/MM/YYYY"
                                onChange={(newDate) => setStartDate(newDate)}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                            <DesktopDatePicker
                                label="Due Date"
                                value={dueDate}
                                inputFormat="DD/MM/YYYY"
                                onChange={(newDate) => setDueDate(newDate)}
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                        <TextField
                            label="Remark"
                            color="primary"
                            {...register("remark")}
                            multiline
                            rows={3}
                        />

                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        reset();
                        setOpen(false)
                    }} variant={'outlined'}>Cancel</Button>
                    <Button type="submit" autoFocus variant={'contained'} sx={{ minWidth: 100 }} color={'primary'}>
                        Submit
                    </Button>
                </DialogActions>
            </form>
            <OverlayLoading open={loading} />
        </Dialog>);
}
export default NewTaskModal;