import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function ProjectDetails() {

    return (
        <Stack spacing={5} flex={1}>
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Start Date"
                    inputFormat="MM/DD/YYYY"
                    onChange={() => console.log('date change')}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                />
                <DesktopDatePicker
                    label="End Date"
                    inputFormat="MM/DD/YYYY"
                    onChange={() => console.log('date change')}
                    renderInput={(params) => <TextField fullWidth {...params} />}
                />
            </LocalizationProvider>
        </Stack>
    );
}
export default ProjectDetails;