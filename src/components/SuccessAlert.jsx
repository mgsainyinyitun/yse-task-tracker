import { Alert, AlertTitle, Snackbar } from "@mui/material";

function SuccessAlert({ title, message, open, setSucces }) {
    return (
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={6000}
            onClose={() => setSucces ? setSucces(false) : console.log('success')}
        >
            <Alert severity="success" sx={{ width: '100%' }} onClose={() => setSucces ? setSucces(false) : console.log('success')}>
                <AlertTitle>
                    {title}
                </AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    )
}
export default SuccessAlert;