import React,{useState} from 'react';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { Box} from "@mui/material";
import { mockUser } from '../../data/mockData';

const UsersList = () => {
    const [pageSize, setPageSize] = useState(10);

    const columns = [
        { field: 'id', headerName: 'No.', width: 70 },
        { field: 'name', headerName: 'Name', flex: 0.7 },
        {
            field: 'role', headerName: 'Role', flex: 0.5,
            // renderCell: params => renderName(params),
        },
        {
            field: 'email', headerName: 'Email', flex: 0.6,
            // renderCell: params => renderName(params),
        },
        {
            field: 'address', headerName: 'Address',flex:0.6,
        },
        {
            field: 'phone', headerName: 'Phone',flex:0.5,
        },
        {
            field: 'position', headerName: 'Position',flex:0.5,
        },
        {
            field: 'department', headerName: 'Department', flex: 0.5,
        },
        {
            field: 'createdAt', headerName: 'Created At', flex: 0.5,
            type: 'date',
        },
        {
            field: 'updatedAt', headerName: 'Updated At', flex: 0.5,
            type: 'date',
        },
    ];

  return (
    <Box
        sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
        }}
    >
        <DataGrid
            aria-label="Tasks List"
            columns={columns}
            rows={mockUser}
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
         </Box>
  )
}

export default UsersList
