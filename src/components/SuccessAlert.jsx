import { Alert, AlertTitle, Snackbar } from "@mui/material";

function SuccessAlert({title,message,open}){
    return(
        <Snackbar
            open={open}
            anchorOrigin={{vertical:'top',horizontal:'center'}}
            autoHideDuration={6000}
        >
             <Alert severity="success" sx={{ width: '100%' }}>
                <AlertTitle>
                    {title}
                </AlertTitle>
                {message}
                </Alert>
        </Snackbar>
    )
}
export default SuccessAlert;