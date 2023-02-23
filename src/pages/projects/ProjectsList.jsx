import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {mockProject} from '../../data/mockData';
import {renderName, renderTotalTasks, renderProgress,renderDepartment,renderDetail,renderEdit,renderDelete} from '../commonScripts';

const mockProjectFinal = mockProject.map(project => {
    return { ...project,creator:project.creator.name,edit: project.id, delete: project.id, detail: project.id }
});

function ProjectsList(){
    const columns = [
        { field: 'id', headerName: 'No.', width: 70 },
        { field: 'title', headerName: 'Title',minWidth: 50, flex: 1 },
        { field: 'creator',headerName: 'Creator',flex:0.5,
          renderCell: params => renderName(params),
        },
        { field: 'tasks',headerName:'No. of Tasks',
          renderCell: params => renderTotalTasks(params),    
        },
        {
            field: 'startDate', headerName: 'Start Date', flex: 0.5,
            type: 'date',
        },
        {
            field: 'endDate', headerName: 'End Date', flex: 0.5,
            type: 'date',
        },
        { field: 'progress',headerName:'Progress',flex:0.5,
            renderCell:params => renderProgress(params),
        },
        { field: 'scope',headerName:'Departments',flex:1,
            renderCell:params => renderDepartment(params),
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
    ];

    return (
        <Box
            sx={{
                display:'flex',
                width:'100%',
                height:'83vh',
                overflow:'scroll',
                flexDirection:'column',
            }}
        >
            <DataGrid
                aria-label="Projects List"
                columns={columns}
                rows={mockProjectFinal}
                components={{
                    Toolbar:GridToolbar
                }}
                rowsPerPageOptions = {[10,15,20]}
                sx={{
                    border:'none',
                    boxShadow:1,
                }}
            />
        </Box>
    );
}

export default ProjectsList;