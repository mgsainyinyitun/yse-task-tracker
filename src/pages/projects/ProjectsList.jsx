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
import { useSelector } from 'react-redux';
import ProjectDeleteModal from './crud/ProjectDeleteModal';
import { isoDateStringToDateString } from '../../utils/dateFunction';

const successTitle = "Added Successful"
const successMessage = "Successfully Added Task to Project";

const deleteSuccessTitle = "Deleted Successful"
const deleteSuccessMessage = "Successfully deleted project";

function prepareProjects(projects) {
    const pProjects = projects.map((project, index) => {
        // Find Task's Project
        

        return { ...project, creator: project.creator.username, edit: project.id, delete: project.id, detail: project.id, addTask: project.id, no: index + 1 }
    })
    return pProjects;
}

function ProjectsList() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteProject, setDeleteProject] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorObj, setErrorObj] = useState(null);
    const [projectId, setProjectId] = useState(null);
    const reduxProjects = useSelector(state => state.projects.data);

    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [deleteErrorObj, setDeleteErrorObj] = useState(null);
    const [selectedCell,setSelectedCell] = useState([]);

    const handleCellClick = (params)=>{
        switch(params.field){
            case "title":setSelectedCell(params.value);break;
            case "creator":setSelectedCell(params.value);break;
            case "tasks":setSelectedCell(`No. of Task : ${params.value.length}`);break;
            case "startDate":setSelectedCell(isoDateStringToDateString(params.value));break;
            case "endDate":
                params.value?setSelectedCell(isoDateStringToDateString(params.value)):setSelectedCell('Not Defined');break;
            case "progress":setSelectedCell(`${params.value}%`);break;
            case "departments":setSelectedCell(params.value.name);break;
            default:setSelectedCell("");
        }
    }

    const columns = [
        {
            field: 'no', headerName: 'No.',width:50,
            renderCell: params => renderNumber(params),
        },
        { field: 'title', headerName: 'Title', minWidth: 150, flex: 1 },
        {
            field: 'creator', headerName: 'Creator', flex: 0.5,minWidth:120,
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
            field: 'progress', headerName: 'Progress', flex: 0.5,minWidth:100,
            renderCell: params => renderProgress(params),
        },
        {
            field: 'departments', headerName: 'Departments', flex: 1,minWidth:100,
            renderCell: params => renderDepartment(params),
        },
        {
            field: 'detail', headerName: 'Detail', flex: 0.5,minWidth:80,
            renderCell: params => renderDetail(params),
        },
        {
            field: 'edit', headerName: 'Edit', flex: 0.3,
            renderCell: params => renderEdit(params),
        },
        {
            field: 'delete', headerName: 'Delete', flex: 0.3,
            renderCell: params => renderDelete(params, setDeleteOpen, setDeleteProject),
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
    }, [reduxProjects])
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
                setSucces={setSuccess}
            />)}
            {(deleteSuccess && <SuccessAlert
                open={deleteSuccess}
                title={deleteSuccessTitle}
                message={deleteSuccessMessage}
            />)}
            {(error && <ErrorAlert
                open={error}
                title={errorObj.code}
                message={errorObj.message}
            />)}
            {(deleteError && <ErrorAlert
                open={deleteError}
                title={deleteErrorObj.code}
                message={deleteErrorObj.message}
            />)}
            <Box m={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Button
                    variant="outlined" startIcon={<AddCircleOutlinedIcon color="primary" />}
                    onClick={() => navigate(PAGE.LINK.PROJETCS.CREATE)}
                >
                    NEW
                </Button>
                <Typography fontWeight={'bold'} color={'info.dark'}>
                    {selectedCell}
                </Typography>
            </Box>
            <Divider />
            <DataGrid
                aria-label="Projects List"
                columns={columns}
                rows={projects}
                onCellClick={handleCellClick}
                selectionModel={selectedCell}
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
            <ProjectDeleteModal
                open={deleteOpen}
                setOpen={setDeleteOpen}
                deleteProject={deleteProject}
                setDeleteError={setDeleteError}
                setDeleteSuccess={setDeleteSuccess}
                setDeleteErrorObj={setDeleteErrorObj}
            />
        </Box>
    );
}

export default ProjectsList;