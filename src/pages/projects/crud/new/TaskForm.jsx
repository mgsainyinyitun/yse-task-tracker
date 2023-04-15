import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../backend/firebase/firestore/userStoreFunction";
import OverlayLoading from "../../../../components/OverlayLoading";
import { addAllUser } from "../../../../redux/reducers/userSlice";
import { checkEmpty } from "../../../../validation/commonValidation";
const priority =
    [
        'Low',
        'High',
        'Medium',
    ];
function TaskForm({ register, setType, errors, skip, setSkip, taskStartDate, setTaskStartDate, dueDate, setDueDate }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    /** All user form redux */
    const Susers = useSelector(state => state.users.data);
    function handleAddTask() {
        setType('add');
        setSkip(false);
    }
    useEffect(() => {
        setLoading(true);
        if (Susers) {
            setUsers(Susers);
            setLoading(false);
        } else {
            getAllUsers().then(
                users => {
                    setUsers(users);
                    dispatch(addAllUser(users));

                    setLoading(false);
                }
            )
        }
    }, [])

    return (
        <Stack spacing={2} mr={1}>
            <TextField
                label="Title"
                type={'text'}
                error={!!errors.taskTitle}
                {...register("taskTitle", {
                    validate: { checkTitle: (v) => !skip ? checkEmpty(v) : null }
                })}
                helperText={errors.taskTitle ? errors.taskTitle.message : null}
            />
            <TextField
                label="Description"
                color="primary"
                type={'text'}
                error={!!errors.taskDescription}
                {...register("taskDescription", {
                    validate: { checkDescription: (v) => !skip ? checkEmpty(v) : null }
                })}
                helperText={errors.taskDescription ? errors.taskDescription.message : null}
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
                            validate: { checkPriority: (v) => !skip ? checkEmpty(v) : null }
                        })}
                        helperText={errors.priority ? errors.priority.message : null}
                        label="Priority"
                        color="primary"
                    />}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Start Date"
                    value={taskStartDate}
                    inputFormat="DD/MM/YYYY"
                    onChange={(newDate) => setTaskStartDate(newDate)}
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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                <Button
                    variant="contained"
                    type="submit"
                    onClick={handleAddTask}
                >
                    ADD
                </Button>
            </Box>
            <OverlayLoading open={loading} />
        </Stack>
    );
}
export default TaskForm;

// title:'Create Contents for IELTS',
// description:'To cretate about 500 words for upcoming IELTS course',
// consignee:{
//     id:5
//     name:'Ko Ko',
// },
// priority:'Low',
// startDate: new Date("2023-01-05"),
// dueDate:new Date("2023-02-07"),
// remarks:null,