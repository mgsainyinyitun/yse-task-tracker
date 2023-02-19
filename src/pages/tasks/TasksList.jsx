
import { Box} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { mockTasks } from '../../data/mockData';
import {renderDelete,renderEdit,renderName,renderPriority,renderStatus,renderDetail} from "./common";
import TaskDeleteModal from "./crud/TaskDeleteModal";


const mocktasksfinal = mockTasks.map(task => {
    return { ...task,consignee:task.consignee.name,consigner:task.consigner.name, edit: task.id, delete: task.id, detail: task.id }
});



function TasksList() {
    const [pageSize, setPageSize] = useState(10);
    const [open,setOpen] = useState(false);
    const [deleteTask,setDeleteTask] = useState(null);
    const columns = [
        { field: 'id', headerName: 'No.', width: 70 },
        { field: 'title', headerName: 'Title', minWidth: 50, flex: 1 },
        {
            field: 'consigner', headerName: 'Assign By', flex: 0.5,
            renderCell: params => renderName(params),
        },
        {
            field: 'consignee', headerName: 'Assign To', flex: 0.5,
            renderCell: params => renderName(params),
        },
        {
            field: 'priority', headerName: 'Priority',
            renderCell: params => renderPriority(params),
        },
        {
            field: 'status', headerName: 'Status',flex:0.6,
            renderCell: params => renderStatus(params),
        },
        {
            field: 'startDate', headerName: 'Start In', flex: 0.5,
            type: 'date',
        },
        {
            field: 'dueDate', headerName: 'Due In', flex: 0.5,
            type: 'date',
        },
        {
            field: 'finishedDate', headerName: 'Finished In', flex: 0.5,
            editable: true,
            type: 'date',
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
            renderCell: params => renderDelete(params,setOpen,setDeleteTask),
        },
    ];
    return <Box
        sx={{
            display: 'flex',
            width: '100%',
            height: '83vh',
            overflow: 'scroll',
            flexDirection: 'column',
        }}
    >
        <DataGrid
            aria-label="Tasks List"
            columns={columns}
            rows={mocktasksfinal}
            components={{
                Toolbar: GridToolbar,
            }}
            rowsPerPageOptions={[10, 15, 20]}
            pageSize={pageSize}
            onPageSizeChange = {newPageSize => setPageSize(newPageSize)}
            sx={{
                border:'none',
                boxShadow:1
            }}
        />
        <TaskDeleteModal open={open} setOpen={setOpen} deleteTask={deleteTask}/>
    </Box>
}

export default TasksList;