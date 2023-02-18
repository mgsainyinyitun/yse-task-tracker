import { Avatar, Chip ,Box,Button,IconButton} from "@mui/material";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

export function renderName(params) {
    if (params.value == null){
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
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'felex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {params.value}
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
        <IconButton>
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
    return (<IconButton>
        <Link to={`delete/${params.value}`}
            style={{
                textDecoration: 'none',
                textTransform: 'none',
                color: 'red',
                fontWeight: 'bold',
            }}>
            <DeleteOutline />
        </Link>
    </IconButton>);
}