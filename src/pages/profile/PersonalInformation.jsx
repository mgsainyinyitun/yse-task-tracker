import { Grid, TextField, Typography, Button, InputAdornment } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

function PersonalInformation({ user }) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">Name</Typography>
                <TextField
                    size="small"
                    defaultValue={user.username}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircleOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Phone</Typography>
                <TextField
                    size="small"
                    defaultValue={user.phone}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PhoneInTalkOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">E-mail</Typography>
                <TextField
                    size="small"
                    defaultValue={user.email}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Address</Typography>
                <TextField
                    size="small"
                    defaultValue={user.address}
                    fullWidth
                    multiline
                    rows={5}
                    maxRows={6}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Position</Typography>
                <TextField
                    size="small"
                    defaultValue={user.position.name}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <WorkOutlineOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Department</Typography>
                <TextField
                    size="small"
                    defaultValue={user.department.name}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountBalanceOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <Button
                    variant="contained"
                    size={'large'}
                    startIcon={<SaveOutlinedIcon />}
                >
                    Save</Button>
            </Grid>
        </Grid>
    )

}

export default PersonalInformation;