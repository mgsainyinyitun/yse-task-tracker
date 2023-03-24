import { Box } from "@mui/system";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { PAGE } from "../../../pageConstants";

function Success() {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <CheckCircleOutlinedIcon
                sx={{ marginTop: 3 }}
                color="success"
                fontSize="large"
            />
            <Typography
                marginTop={3}
                marginBottom={3}
                variant="h5"
            >
                success
            </Typography>

            <Link 
                to={PAGE.LINK.PROJETCS.INDEX}
                style={{
                    textDecoration:'none',
                    color:'inherit',
                }}
            >
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIosOutlinedIcon />}
                >
                    Projects List
                </Button>
            </Link>
        </Box>
    )
}
export default Success;