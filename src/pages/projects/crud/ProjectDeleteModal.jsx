import { DeleteOutlineOutlined, ErrorOutline } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { removeProject } from "../../../backend/controller/projectController";

function ProjectDeleteModal({ open, setOpen, deleteProject,setDeleteError, setDeleteSuccess, setDeleteErrorObj }) {
    function onProjectDelete() {
        console.log('deleting project')
        removeProject(deleteProject)
            .then(res => {
              setDeleteSuccess(true);
              setDeleteError(false);
            })
            .catch(err => {
                setDeleteError(true);
                setDeleteErrorObj(false);
                setDeleteErrorObj(err.error);
            })
            setOpen(false);
    }
   
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <DeleteOutlineOutlined fontSize="large" color="error" />
                {"Delete Project"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{ display: 'flex' }}>
                    <Typography variant="body1" textAlign={'center'}>Are you sure you want to delete
                        <b> "{deleteProject ? deleteProject.title : ''}" </b>project?
                        <Box m={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ErrorOutline fontSize="small" color="error" />
                            You cannot undo the action.
                        </Box>
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} variant={'outlined'}>Cancel</Button>
                <Button onClick={onProjectDelete} autoFocus variant={'contained'} sx={{ minWidth: 100 }} color={'error'}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>);
}
export default ProjectDeleteModal;