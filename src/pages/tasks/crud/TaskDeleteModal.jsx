import { DeleteOutlineOutlined, ErrorOutline } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { removeTask } from "../../../backend/controller/taskController";
import { readProjects } from "../../../backend/controller/projectController";
import { useEffect } from "react";
import { useState } from "react";


function TaskDeleteModal({ open, setOpen, deleteTask, setDeleteError, setDeleteSuccess, setErrors }) {
    function onTaskDelete() {
        removeTask(deleteTask.id)
            .then(res => {
                if (res.status === 0) {
                    setDeleteSuccess(true);
                    setDeleteError(false);
                }
            })
            .catch(err => {
                setDeleteSuccess(false);
                setDeleteError(true);
                setErrors(err);
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
                        <b> "{deleteTask ? deleteTask.title : ''}" </b>task?
                        <Box m={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ErrorOutline fontSize="small" color="error" />
                            You cannot undo the action.
                        </Box>
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} variant={'outlined'}>Cancel</Button>
                <Button onClick={onTaskDelete} autoFocus variant={'contained'} sx={{ minWidth: 100 }} color={'error'}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>);
}
export default TaskDeleteModal;