import { Autocomplete, Stack, TextField, useTheme } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getDepartmentsDatafromLocal } from "../../../../backend/localstorage/departments";

function ProjectDetails({ register, errors,startDate,endDate,setStartDate,setEndDate }) {

    const [deparments,setDepartment] = useState([]);
    const user = useSelector(state => state.users.user);
    const deps = useSelector(state =>  state.departments);

    function checkEmpty(data) {
        if (data === "") {
            return "Field cannot be Empty!";
        } return true;
    }

    useEffect(()=>{
        if(Object.keys(deps).length !== 0){
            setDepartment(deps.data);
        } else {
            let deps = getDepartmentsDatafromLocal();
            setDepartment(deps);
        }
    },[]);


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
             <Autocomplete
                fullWidth
                options={deparments.map(dep => {
                    return dep.name;
                })}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        {...register("department")}
                        label="Department"
                        color="primary"
                    />}
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