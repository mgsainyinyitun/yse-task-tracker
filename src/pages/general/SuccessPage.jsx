import { Box } from "@mui/system";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";


function SuccessPage({link,name}) {
    return (
        <Box
            mt={10}
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
                Success
            </Typography>
            <Link 
                to={link}
                style={{
                    textDecoration:'none',
                    color:'inherit',
                }}
            >
                <br/>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIosOutlinedIcon />}
                >
                    {name}
                </Button>
            </Link>
        </Box>
    )
}
export default SuccessPage;