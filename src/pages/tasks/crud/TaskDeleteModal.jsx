import { DeleteOutlineOutlined, ErrorOutline } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { Box } from "@mui/material";

function TaskDeleteModal({ open, setOpen, deleteTask }) {
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <DeleteOutlineOutlined fontSize="large" color="error" />
                {"Delete Task"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{ display: 'flex' }}>
                    <Typography variant="body1" textAlign={'center'}>Are you sure you want to delete
                        <b> "{deleteTask?deleteTask.title:''}" </b>task?
                        <Box m={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ErrorOutline  fontSize="small" color="error"/>
                            You cannot undo the action.
                        </Box>
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} variant={'outlined'}>Cancel</Button>
                <Button onClick={() => setOpen(false)} autoFocus variant={'contained'} sx={{ minWidth: 100 }} color={'error'}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>);
}
export default TaskDeleteModal;