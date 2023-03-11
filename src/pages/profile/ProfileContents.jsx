import { Box, Typography, Grid, Paper, Card } from "@mui/material";
import PasswordChangeCard from "./PasswordChangeCard";
import PersonalInformation from "./PersonalInformation";

function ProfileContents({user}) {
    return (
        <Box>
            <Card
                sx={{
                    borderRadius:'10px',
                    margin:'7px 0 7px 0',
                    padding:'0.5rem',
                }}
            >
            <Typography
                mt={3}
                mb={3}
                variant="h4">
                PERSONAL INFORMATION
            </Typography>
            </Card>

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
                        <PersonalInformation user={user}/>
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