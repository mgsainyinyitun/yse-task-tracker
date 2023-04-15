import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom';
import { renderName, renderTotalTasks, renderProgress, renderDepartment, renderDetail, renderEdit, renderDelete, renderDate, renderNumber, renderAddTask } from '../commonScripts';
import { PAGE } from '../pageConstants';
import { useEffect, useState } from 'react';
import { readProjects } from '../../backend/controller/projectController';
import NewTaskModal from '../tasks/crud/NewTaskModal';
import SuccessAlert from '../../components/SuccessAlert';
import ErrorAlert from '../../components/ErrorAlert';
const successTitle = "Added Successful"
const successMessage = "Successfully Added Task to Project";
function prepareProjects(projects) {
    const pProjects = projects.map((project, index) => {
        return { ...project, creator: project.creator.username, edit: project.id, delete: project.id, detail: project.id, addTask: project.id, no: index + 1 }
    })
    return pProjects;
}

function ProjectsList() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorObj, setErrorObj] = useState(null);
    const [projectId, setProjectId] = useState(null);
    const columns = [
        {
            field: 'no', headerName: 'No.', width: 70,
            renderCell: params => renderNumber(params),
        },
        { field: 'title', headerName: 'Title', minWidth: 50, flex: 1 },
        {
            field: 'creator', headerName: 'Creator', flex: 0.5,
            renderCell: params => renderName(params),
        },
        {
            field: 'tasks', headerName: 'No. of Tasks',
            renderCell: params => renderTotalTasks(params),
        },
        {
            field: 'startDate', headerName: 'Start Date', flex: 0.5,
            type: 'date',
            renderCell: params => renderDate(params),
        },
        {
            field: 'endDate', headerName: 'End Date', flex: 0.5,
            renderCell: params => renderDate(params),
            type: 'date',
        },
        {
            field: 'progress', headerName: 'Progress', flex: 0.5,
            renderCell: params => renderProgress(params),
        },
        {
            field: 'departments', headerName: 'Departments', flex: 1,
            renderCell: params => renderDepartment(params),
        },
        {
            field: 'detail', headerName: 'Detail', flex: 0.5,
            renderCell: params => renderDetail(params),
        },
        {
            field: 'edit', headerName: 'Edit', flex: 0.3,
            renderCell: params => renderEdit(params),
        },
        {
            field: 'delete', headerName: 'Delete', flex: 0.3,
            renderCell: params => renderDelete(params),
        },
        {
            field: 'addTask', headerName: 'Add Task', flex: 0.4,
            renderCell: params => renderAddTask(params, setOpen, setProjectId),
        },
    ];


    useEffect(() => {
        readProjects().then(res => {
            setProjects(prepareProjects(res.data));
        });
    }, [])


    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                overflow: 'scroll',
                flexDirection: 'column',
            }}
        >
            {(success && <SuccessAlert
                open={success}
                title={successTitle}
                message={successMessage}
            />)}

            {(error && <ErrorAlert
                open={error}
                title={errorObj.code}
                message={errorObj.message}
            />)}
            <Box m={1}>
                <Button
                    variant="outlined" startIcon={<AddCircleOutlinedIcon color="primary" />}
                    onClick={() => navigate(PAGE.LINK.PROJETCS.CREATE)}
                >
                    NEW
                </Button>
            </Box>
            <Divider />
            <DataGrid
                aria-label="Projects List"
                columns={columns}
                rows={projects}
                components={{
                    Toolbar: GridToolbar
                }}
                rowsPerPageOptions={[10, 15, 20]}
                sx={{
                    border: 'none',
                    boxShadow: 1,
                }}
            />
            <NewTaskModal 
                open={open} 
                setOpen={setOpen} 
                projectId={projectId}
                setError={setError}
                setSuccess={setSuccess}
                setErrorObj={setErrorObj}
             />
        </Box>
    );
}

export default ProjectsList;