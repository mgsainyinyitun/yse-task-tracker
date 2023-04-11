import { Stack, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from "react-redux";

function ProjectDetails({ register, errors,startDate,endDate,setStartDate,setEndDate }) {

    const user = useSelector(state => state.users.user);
    function checkEmpty(data) {
        if (data === "") {
            return "Field cannot be Empty!";
        } return true;
    }

    return (
        <Stack spacing={5} flex={1}>
            <TextField
                fullWidth
                error={!!errors.title}
                defaultValue={''}
                label="Title"
                type={'text'}
                {...register("title", {
                    validate: { checkTitle: (v) => checkEmpty(v) }
                })}
                helperText={errors.title ? errors.title.message : null}
            />
            <TextField
                fullWidth
                label="Description"
                error={!!errors.description}
                type={'text'}
                {...register("description", {
                    validate: { checkDescription: (v) => checkEmpty(v) }
                })}
                multiline
                rows={3}
                helperText={errors.description ? errors.description.message : null}
            />
            <TextField
                fullWidth
                label={'Creator'}
                defaultValue={user.username}
                type={'text'}
                disabled
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Start Date"
                    inputFormat="DD/MM/YYYY"
                    value={startDate}
                    onChange={(newDate) => setStartDate(newDate)}
                    renderInput={(params) =>
                        <TextField
                            fullWidth {...params}
                        />}
                />
                <DesktopDatePicker
                    label="End Date"
                    inputFormat="DD/MM/YYYY"
                    value={endDate}
                    onChange={(newDate) => setEndDate(newDate)}
                    renderInput={(params) =>
                        <TextField
                            fullWidth {...params}
                        />}
                />
            </LocalizationProvider>
        </Stack>
    );
}
export default ProjectDetails;