import { Box, Typography, Grid, Paper } from "@mui/material";
import PasswordChangeCard from "./PasswordChangeCard";
import PersonalInformation from "./PersonalInformation";

function ProfileContents() {
    return (
        <Box>

            <Typography
                mt={3}
                mb={3}
                variant="h4">
                PERSONAL INFORMATION
            </Typography>

            <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                    <Paper
                        elevation={3}
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '10px',
                            borderRadius: '10px',
                        }}>
                        <PersonalInformation />
                    </Paper>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Paper
                        elevation={3}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '10px',
                            borderRadius: '10px',
                        }}>
                        <PasswordChangeCard />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProfileContents;