import React from 'react';
// import { List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Avatar } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Autocomplete, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField } from '@mui/material';
import { useState } from 'react';
import { filterUsersByUids, findUserByUsername } from '../../../../utils/commonFunctions';



const MemberField = ({ updatedMembers, users, setUpdatedMembers, setChange }) => {
    const [open, setOpen] = useState(false);
    const [newMember, setNewMember] = useState(null);

    function handleClose() {
        setOpen(false);
    }
    let filterUsers = filterUsersByUids(users, updatedMembers);

    function onNewMemberAdd() {
        let newMemberObj = findUserByUsername(newMember, users);
        setUpdatedMembers([...updatedMembers, newMemberObj])
        setOpen(false);
        setChange(true);

        console.log(updatedMembers)
    }

    function onMemberDelete(member){
        const deleteRMember = updatedMembers.filter(meb => meb.uid !== member.uid);
        setUpdatedMembers([...deleteRMember]);
        setChange(true);
    }

    return (
        <>
            <List>
                <Button startIcon={<AddCircleIcon />}
                    variant='contained'
                    onClick={() => setOpen(true)}
                    disabled={filterUsers.length === 0 ? true : false}
                >
                    Add New Member
                </Button>
                <Divider sx={{
                    marginTop: 2,
                    marginBottom: 2,
                }} />
                <Box
                    sx={{
                        border: '1px solid grey',
                        height: '200px',
                        overflow: 'scroll',
                        borderRadius: 1,
                    }}
                >
                    {
                        updatedMembers ? updatedMembers.map((member, index) => {
                            return (
                                <ListItem key={member.uid}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ width: 30, height: 30 }}>{member.username.charAt(0)}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={member.username} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={() => onMemberDelete(member)}>
                                            <DeleteIcon color='error' />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>);
                        }) : null
                    }
                </Box>
            </List>
            {/** Dialog for add new user */}
            <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth>
                <DialogTitle>Add New Member</DialogTitle>
                <DialogContent>
                    <Box mt={3}>
                        <Autocomplete
                            fullWidth
                            options={filterUsers.map(user => {
                                return user.username;
                            })}
                            onChange={(e, v) => {
                                setNewMember(v);
                            }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Members"
                                    color="primary"
                                />}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' onClick={onNewMemberAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MemberField;
