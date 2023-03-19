import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { mockUser } from "../../../../data/mockData";
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
function TaskForm() {
    return (
        <Stack spacing={2} mr={1}>
            <TextField
                label="Title"
            />
            <TextField
                label="Description"
                color="primary"
                multiline
                rows={3}
            />
            <Autocomplete
                fullWidth
                options={mockUser.map(user => {
                    return user.name;
                })}
                renderInput={(params) =>
                    <TextField
                        {...params}
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
                        label="Priority"
                        color="primary"
                    />}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Start Date"
                    value={null}
                    inputFormat="MM/DD/YYYY"
                    onChange={() => console.log('date change')}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                />
                <DesktopDatePicker
                    label="Due Date"
                    value={null}
                    inputFormat="MM/DD/YYYY"
                    onChange={() => console.log('date change')}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                />
            </LocalizationProvider>
            <Box
                sx={{
                    display:'flex',
                    justifyContent:'flex-end'
                }}
            >
                <Button variant="contained">
                    ADD
                </Button>
            </Box>
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