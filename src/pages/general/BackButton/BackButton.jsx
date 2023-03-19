import { IconButton } from "@mui/material";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useNavigate } from "react-router-dom";

function BackButton() {
    const nevigate = useNavigate();
    return (
        <IconButton onClick={() => nevigate(-1)}
            sx={{
                color: theme => theme.palette.primary.dark,
                fontWeight: 'bold',
            }}
        >
            <ArrowBackIosOutlinedIcon fontSize={'small'} />
        </IconButton>
    );
}
export default BackButton;