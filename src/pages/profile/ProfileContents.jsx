import { Box, Typography, Grid, Paper, Card, useTheme } from "@mui/material";
import PasswordChangeCard from "./PasswordChangeCard";
import PersonalInformation from "./PersonalInformation";

function ProfileContents({user}) {
    const theme = useTheme();
    return (
        <Box>
            <Card
                elevation={0}
                sx={{
                    borderRadius:'10px',
                    margin:'7px 0 7px 0',
                    padding:'0.5rem',
                    background:theme.palette.custom.info,
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
                        elevation={0}
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '10px',
                            borderRadius: '10px',
                            border:t=>`1px solid ${t.palette.custom.info}`
                        }}>
                        <PersonalInformation user={user}/>
                    </Paper>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Paper
                        elevation={0}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '10px',
                            borderRadius: '10px',
                            border:t=>`1px solid ${t.palette.custom.info}`
                        }}>
                        <PasswordChangeCard />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProfileContents;