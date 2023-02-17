import { Avatar, Box, Typography,Paper } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

function ProfileHeader() {
    return (
        <Paper
            display={'flex'}
            elevation={3}
            sx={{
                borderRadius:'10px',
                justifyContent: 'center',
                flexDirection: 'column',
                padding:'10px',
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
                    Sai Nyi Nyi Tun
                </Typography>
                <Typography variant="body1">
                    Web Desiger
                </Typography>
                <Typography variant="body2">
                    Social Media and Design Department
                </Typography>
            </Box>
        </Paper>
    )
}

export default ProfileHeader;