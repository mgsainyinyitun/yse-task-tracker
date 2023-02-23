import { Avatar, Chip, Box, Button, IconButton, Typography } from "@mui/material";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import NotStartedOutlinedIcon from '@mui/icons-material/NotStartedOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Link } from "react-router-dom";
import { findTask } from "../utils/commonFunctions";
import { mockTasks,mockDepartment } from "../data/mockData";

export function renderName(params) {
    if (params.value == null) {
        return '';
    }
    return (
        <Chip
            avatar={<Avatar>{params.value[0]}</Avatar>}
            label={params.value}
        />)
}
export function renderPriority(params) {
    let backgroundColor = '';
    switch (params.value) {
        case 'Low': backgroundColor = 'green'; break;
        case 'High': backgroundColor = 'red'; break;
        case 'Medium': backgroundColor = 'orange'; break;
    }
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'felex',
            justifyContent: 'center',
            alignItems: 'center',
            background: `${backgroundColor}`,
            color: 'white',
            fontWeight: 'bold',
        }}>
            {params.value}
        </Box>

    )
}

export function renderStatus(params) {

    let content = null;
    switch (params.value) {
        case 'notyet':
            content =
                <>
                    <NotStartedOutlinedIcon sx={{ marginRight: '5px', color: 'error.main' }} />
                    {`Not Start`}
                </>; break;
        case 'inprogress':
            content =
                <>
                    <WorkHistoryOutlinedIcon sx={{ marginRight: '5px', color: 'primary.main' }} />
                    {`In Progress`}
                </>; break;
        case 'finished':
            content =
                <>
                    <CheckCircleOutlineOutlinedIcon sx={{ marginRight: '5px', color: 'success.main' }} />
                    {`Finished`}
                </>; break;
    }

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
        }}>
            {content}
        </Box>
    )
}

export function renderDetail(params) {
    return (
        <Button variant="contained">
            <Link to={`detail/${params.value}`}
                style={{
                    textDecoration: 'none',
                    textTransform: 'none',
                    color: 'inherit',
                }}>
                Detail
            </Link>
        </Button>);
}

export function renderEdit(params) {
    return (
        <IconButton sx={{ color: 'primary.dark' }}>
            <Link to={`edit/${params.value}`}
                style={{
                    textDecoration: 'none',
                    textTransform: 'none',
                    color: 'inherit',
                }}>
                <EditOutlined />
            </Link>
        </IconButton>)

}
export function renderDelete(params) {
    return (
        <IconButton sx={{ color: 'red' }} >
            <DeleteOutline />
        </IconButton>);
}

export function renderTotalTasks(params) {
    return <p>{params.value.length}</p>;
}

export function renderProgress(params) {
    let bgColor = 'green';
    if (params.value < 80 && params.value > 20) { // 20 < value < 80 
        bgColor = 'orange'
    } else if (params.value <= 20) {
        bgColor = 'red'
    }
    return (
        <Box
            sx={{
                border: '1px solid',
                borderColor: 'primary.dark',
                overflow: 'hidden',
                height: '50%',
                width: '80%',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    width: `${params.value}%`,
                    height: '100%',
                    background: `${bgColor}`,
                    position: 'relative',
                }}
            >
            </Box>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
            }}>
                <Typography variant="body1">{params.value} %</Typography>
            </Box>
        </Box>);
}


export function renderDepartment(params){
    if(params.value === 'all'){
        return <Chip label='All' size="small"/>
    }

    let department = mockDepartment.find(dep=>{
        return dep.id == params.value;
    })

    if(department){;
        return <Chip label={department.name} size='small'/>
    }
    return;
}