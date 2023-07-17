import { Alert, AlertTitle, Snackbar } from "@mui/material";

function ErrorAlert({ title, message, open, setError }) {

    return (
        <Snackbar
            open={open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={6000}
            onClose={() => setError ? setError(false) : console.log('error')}
        >
            <Alert severity="error" sx={{ width: '100%' }}
                onClose={() => setError ? setError(false) : console.log('error')}
            >
                <AlertTitle>
                    {title}
                </AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    )

}
export default ErrorAlert;