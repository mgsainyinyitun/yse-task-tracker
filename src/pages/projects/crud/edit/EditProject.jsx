import { Autocomplete, Avatar, Box, Button, Container, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { EditOutlined, SaveOutlined } from "@mui/icons-material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PAGE } from "../../../pageConstants";
import { checkEmpty } from "../../../../validation/commonValidation";
import { readUsers } from "../../../../backend/controller/userController";
import OverlayLoading from "../../../../components/OverlayLoading";
import SuccessPage from "../../../general/SuccessPage";
import { findProjectById, updateProject } from "../../../../backend/controller/projectController";
import MemberField from "./MemberFields";
import { readDepartments } from "../../../../backend/controller/departmentController";
import { findObjectByName } from "../../../../utils/commonFunctions";
import { serverTimestamp } from "firebase/firestore";
import ErrorAlert from "../../../../components/ErrorAlert";

function EditProject() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [users, setUsers] = useState([]);
    const [updatedMembers, setUpdatedMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [change, setChange] = useState(false);
    const nevigate = useNavigate();
    const { register, handleSubmit, formState, setValue } = useForm();
    const { errors } = formState;
    const [success, setSuccess] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState(false);
    const [errorObj, setErrorObj] = useState(null);
    useEffect(() => {
        setLoading(true);
        findProjectById(id)
            .then((res) => {
                setProject(res.data);
                setUpdatedMembers(res.data.members);
                if (res.data.startDate) {
                    setStartDate(new Date(res.data.startDate));
                }
                if (res.data.endDate) {
                    setEndDate(new Date(res.data.endDate));
                }
                setValue('departments', res.data.departments.name);
            });
        readUsers()
            .then(res => {
                setUsers(res.data);
            });
        readDepartments()
            .then(res => {
                if (res.status === 0)
                    setDepartments(res.data);
            })
        setLoading(false);
    }, []);

    function handleProjectEditForm(data) {
        setLoading(true);
        const { title, description, department, progress } = data;
        console.log(data);
        let project = {
            id,
            title,
            description,
            startDate: startDate ? new Date(startDate) : null,
            endDate: endDate ? new Date(endDate) : null,
            progress,
            members: updatedMembers,
            updatedAt: serverTimestamp(),
            departments: department ? findObjectByName(department, departments) : 'All',
        }
        console.log(project)
        updateProject(project)
            .then(res => {
                console.log(res);
                setLoading(false);
                if (res.status === 0) {
                    setSuccess(true);
                    setError(false);
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setSuccess(false);
                setError(true);
                setErrorObj(err.error);
            });
    }

    return (
        <Container
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
            {(error && <ErrorAlert
                open={error}
                title={errorObj.code}
                message={errorObj.message}
            />)}
            {(project && success && <>
                <SuccessPage
                    link={PAGE.LINK.PROJETCS.INDEX}
                    name={'Projects List'}
                />
            </>)}
            {(project && !success && <>
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
                <form onSubmit={handleSubmit(handleProjectEditForm)} noValidate>
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
                            <Typography variant="h5" color={'primary.dark'}>PROJECT EDIT FORM</Typography>
                        </Box>

                        <Divider color={'primary.dark'} sx={{
                            marginTop: '10px',
                            marginBottom: '10px',
                            height: 3
                        }} />
                        <Stack spacing={5} mt={3}>
                            <TextField
                                label="Title"
                                defaultValue={project.title}
                                {...register("title", {
                                    validate: { checkTitle: (v) => checkEmpty(v) }
                                })}
                                fullWidth
                                error={!!errors.title}
                                helperText={errors.title ? errors.title.message : null}
                                onChange={() => setChange(true)}
                            />
                            <TextField
                                label="Description"
                                color="primary"
                                defaultValue={project.description}
                                multiline
                                rows={3}
                                error={!!errors.description}
                                {...register("description", {
                                    validate: { checkDescription: (v) => checkEmpty(v) }
                                })}
                                helperText={errors.description ? errors.description.message : null}
                                onChange={() => setChange(true)}
                            />
                            <TextField
                                label="Creator"
                                defaultValue={project.creator.username}
                                fullWidth
                                disabled={true}
                            />
                            <Autocomplete
                                fullWidth
                                onChange={() => setChange(true)}
                                defaultValue={
                                    project.departments ?
                                        project.departments.name === "All" ? null : project.departments.name
                                        : null}
                                options={departments.map(dep => {
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
                                        value={endDate}
                                        label="End Date"
                                        inputFormat="DD/MM/YYYY"
                                        onChange={(newDate) => { setEndDate(newDate); setChange(true) }}
                                        renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                            <TextField
                                type="number"
                                label="Progress"
                                defaultValue={project.progress}
                                fullWidth
                                {...register("progress")}
                                inputProps={{
                                    min: 0,
                                    max: 100,
                                }}
                                onChange={() => setChange(true)}
                            />
                            <MemberField
                                users={users}
                                updatedMembers={updatedMembers}
                                setUpdatedMembers={setUpdatedMembers}
                                setChange={setChange}
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
                </form>
            </>
            )}
            <OverlayLoading open={loading} />
        </Container>
    )
}

export default EditProject;