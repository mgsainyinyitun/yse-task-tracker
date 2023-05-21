import { Alert, Box, Card, Snackbar, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { renderDelete, renderName, renderPriority, renderStatus, renderDetail, renderTaskEdit, renderTaskTitle } from "./common";
import TaskDeleteModal from "./crud/TaskDeleteModal";
import { readTasks } from "../../backend/controller/taskController";
import { renderDate, renderNumber } from "../commonScripts";
import { useSelector } from "react-redux";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";
import { readProjects } from "../../backend/controller/projectController";
import { findTaskContainedProject } from "../../utils/commonFunctions";


const deleteSuccessTitle = "Delete Successful"
const deleteSuccessMessage = "Successfully deleted Task from Project";

function prepareTasks(projects, tasks) {
    let pTasks = [];
    pTasks = tasks.map((task, index) => {
        let pjt = findTaskContainedProject(task.id, projects);
        return {
            ...task,
            title: { task: task.title, project: pjt.title },
            consignee: task.consignee ? task.consignee.username : null,
            consigner: task.consigner ? task.consigner.username : null,
            edit: task.id,
            delete: task.id,
            detail: task.id,
            no: index + 1
        }
    })
    return pTasks;
}

function TasksList() {
    const [pageSize, setPageSize] = useState(10);
    const [open, setOpen] = useState(false);
    const [deleteTask, setDeleteTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [deletSuccess, setDeleteSuccess] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [errors, setErrors] = useState(null);
    const reduxTasks = useSelector(state => state.tasks.data);
    const columns = [
        {
            field: 'no', headerName: 'No.', width: 50,
            renderCell: params => renderNumber(params),
        },
        {
            field: 'title', headerName: 'Title', minWidth: 150, flex: 1,
            renderCell: params => renderTaskTitle(params),
        },
        {
            field: 'consigner', headerName: 'Assign By', flex: 0.5, minWidth: 120,
            renderCell: params => renderName(params),
        },
        {
            field: 'consignee', headerName: 'Assign To', flex: 0.5, minWidth: 120,
            renderCell: params => renderName(params),
        },
        {
            field: 'priority', headerName: 'Priority',
            renderCell: params => renderPriority(params),
        },
        {
            field: 'status', headerName: 'Status', flex: 0.6, minWidth: 110,
            renderCell: params => renderStatus(params),
        },
        {
            field: 'startDate', headerName: 'Start In', flex: 0.5, minWidth: 90,
            type: 'date',
            renderCell: params => renderDate(params),
        },
        {
            field: 'dueDate', headerName: 'Due In', flex: 0.5, minWidth: 90,
            renderCell: params => renderDate(params),
            type: 'date',
        },
        {
            field: 'finishedDate', headerName: 'Finished In', flex: 0.5, minWidth: 90,
            renderCell: params => renderDate(params),
            editable: true,
            type: 'date',
        },
        {
            field: 'detail', headerName: 'Detail', flex: 0.5, minWidth: 80,
            renderCell: params => renderDetail(params),
        },
        {
            field: 'edit', headerName: 'Edit', flex: 0.3,
            renderCell: params => renderTaskEdit(params),
        },
        {
            field: 'delete', headerName: 'Delete', flex: 0.3,
            renderCell: params => renderDelete(params, setOpen, setDeleteTask),
        },
    ];

    useEffect(() => {

        readProjects()
            .then(pjtRes => {
                readTasks()
                    .then(taskRes => {
                        setTasks(
                            prepareTasks(pjtRes.data, taskRes.data)
                        );
                    });
            })
    }, [reduxTasks]);

    return <Box
        sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
        }}
    >
        {(deletSuccess && <SuccessAlert
            open={deletSuccess}
            title={deleteSuccessTitle}
            message={deleteSuccessMessage}
        />)}

        {(deleteError && <ErrorAlert
            open={deleteError}
            title={errors.code}
            message={errors.message}
        />)}

        {/* <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => console.log('close')}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{
                // border: '1px solid red',
                minWidth: 500,
            }}
        >
            <Card sx={{width:'100%',padding:1,}}>
                <Typography>
                    abcdef
                </Typography>
            </Card>
        </Snackbar> */}

        <DataGrid
            aria-label="Tasks List"
            columns={columns}
            rows={tasks}
            components={{
                Toolbar: GridToolbar,
            }}

            rowsPerPageOptions={[10, 15, 20]}
            pageSize={pageSize}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            sx={{
                border: 'none',
                boxShadow: 1,
                overflowY: 'scroll',
            }}
        />
        <TaskDeleteModal
            open={open}
            setOpen={setOpen}
            deleteTask={deleteTask}
            setDeleteError={setDeleteError}
            setDeleteSuccess={setDeleteSuccess}
            setErrors={setErrors}

        />
    </Box>
}

export default TasksList;