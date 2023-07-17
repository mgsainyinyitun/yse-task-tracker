import { Avatar, Box, Typography,Paper, useTheme } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

function ProfileHeader({user}) {
    const theme = useTheme();
    return (
        <Paper
            display={'flex'}
            elevation={0}
            sx={{
                borderRadius:'10px',
                justifyContent: 'center',
                flexDirection: 'column',
                padding:'10px',
                background:theme.palette.custom.info,
            }}
        >
            <Avatar
                sx={{
                    width: 70,
                    height: 70,
                    marginTop: '-50px',
                }}
            >
                <PersonIcon
                    color={'primary'}
                    fontSize={'large'}
                />
            </Avatar>
            <Box pl={3} pb={3} pt={1}>
                <Typography variant="h5">
                    {user.username}
                </Typography>
                <Typography variant="body1">
                    {user.position.name}
                </Typography>
                <Typography variant="body2">
                    {user.department.name}
                </Typography>
            </Box>
        </Paper>
    )
}

export default ProfileHeader;