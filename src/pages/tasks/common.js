import { Avatar, Chip, Box, Button, IconButton, Typography } from "@mui/material";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import NotStartedOutlinedIcon from '@mui/icons-material/NotStartedOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Link } from "react-router-dom";
import { findTask } from "../../utils/commonFunctions";
import { CONSTANTS } from "../constants";
import { store } from "../../redux/store";
import { checkTaskDeleteable, checkTaskEditable } from "../../utils/permission";



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

export function renderTaskTitle(params) {
    if (params.value === null) {
        return '';
    }
    return (
        <Box>
            <Typography variant="h6">
                {params.value.task}
            </Typography>
            <Typography variant="body2" fontSize={12} color={'error'}>
                {params.value.project}
            </Typography>
        </Box>);
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
        case CONSTANTS.STATUS.NOTSTART:
            content =
                <>
                    <NotStartedOutlinedIcon sx={{ marginRight: '5px', color: 'error.main' }} />
                    {`Not Start`}
                </>; break;
        case CONSTANTS.STATUS.INPROGRESS:
            content =
                <>
                    <WorkHistoryOutlinedIcon sx={{ marginRight: '5px', color: 'primary.main' }} />
                    {`In Progress`}
                </>; break;
        case CONSTANTS.STATUS.FINISHED:
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

export function renderTaskEdit(params) {
    return (
        <IconButton sx={{ color: 'primary.dark' }} disabled={checkTaskEditable(params.value)}>
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


export function renderDelete(params, setOpen, setDeleteTask) {
    const reduxTasks = store.getState().tasks.data;
    const onClickOpenDeleteModal = () => {
        setDeleteTask(findTask(params.value, reduxTasks));
        setOpen(true);
    }
    return (
        <IconButton sx={{ color: 'red' }} onClick={onClickOpenDeleteModal} disabled={checkTaskDeleteable(params.value)}>
            <DeleteOutline />
        </IconButton>);
}