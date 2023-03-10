import { Avatar, Button, Card, CardContent, CardHeader, Divider, Grid, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { mockTasks } from "../../../data/mockData";
import { styled } from '@mui/material/styles';
import { findTask } from "../../../utils/commonFunctions";
import { CalendarTodayOutlined, VerifiedUserOutlined } from "@mui/icons-material";
import { Container } from "@mui/system";

const CommonCard = styled(Card)(() => ({
    borderRadius: '10px',
    minHeight: '25%',
    width: '100%',
}));

function TaskDetail() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const { id } = useParams();
    const task = findTask(id, mockTasks);
    const nevigate = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                width:'100%',
                height: '100%',
                overflow: 'scroll',
                flexDirection: 'column',
                padding: '10px',
            }}
        >
            <Box
            >
                <IconButton onClick={() => nevigate(-1)}
                    sx={{
                        color: theme => theme.palette.primary.dark,
                        fontWeight: 'bold',
                    }}
                >
                    <ArrowBackIosOutlinedIcon />
                </IconButton>
            </Box>

                <Container disableGutters={true} >
                <Grid container spacing={2}>
                    <Grid item sm={12} >
                        <Card sx={{ borderRadius: '10px'}}>
                            <CardHeader
                                title={task.title}
                            />
                            <CardContent>
                                <Typography>
                                    {task.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>


                    <Grid item md={4} xs={12}>
                        <CommonCard>
                            <CardHeader
                                sx={{ color: 'primary.dark' }}
                                avatar={<CalendarTodayOutlined />}
                                title={'START DATE'}
                            />
                            <CardContent>
                                <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'flex-start', gap: 3 }}>
                                    {monthNames[task.startDate.getMonth()]}
                                    <Avatar>
                                        {task.startDate.getDay()}
                                    </Avatar>
                                </Typography>
                                <Typography>
                                    {task.startDate.getFullYear()}
                                </Typography>
                            </CardContent>
                        </CommonCard>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <CommonCard>
                            <CardHeader
                                sx={{ color: 'error.dark' }}
                                avatar={<CalendarTodayOutlined />}
                                title={'DUE DATE'}
                            />
                            <CardContent>
                                <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'flex-start', gap: 3 }}>
                                    {monthNames[task.dueDate.getMonth()]}
                                    <Avatar>
                                        {task.dueDate.getDay()}
                                    </Avatar>
                                </Typography>
                                <Typography>
                                    {task.dueDate.getFullYear()}
                                </Typography>
                            </CardContent>
                        </CommonCard></Grid>

                    <Grid item md={4} xs={12}>
                        <CommonCard
                        >
                            <CardHeader
                                sx={{ color: 'main.dark' }}
                                avatar={<CalendarTodayOutlined />}
                                title={'FINISHED DATE'}
                            />
                            <CardContent>
                                <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'flex-start', gap: 3 }}>
                                    {monthNames[task.finishedDate.getMonth()]}
                                    <Avatar>
                                        {task.finishedDate.getDay()}
                                    </Avatar>
                                </Typography>
                                <Typography>
                                    {task.finishedDate.getFullYear()}
                                </Typography>
                            </CardContent>
                        </CommonCard>
                    </Grid>

                    <Grid item md={3} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={6}>
                                <CommonCard>
                                    <CardHeader
                                        sx={{ color: 'main.dark' }}
                                        avatar={<PersonOutlinedIcon />}
                                        title={`Assigned By -`}
                                    />
                                    <CardContent sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                        <Avatar>{task.consigner.name[0]}</Avatar>

                                        <Typography variant="h6">
                                            {task.consigner.name}
                                        </Typography>
                                    </CardContent>
                                </CommonCard>
                            </Grid>
                            <Grid item md={12} xs={6}>
                                <CommonCard>
                                    <CardHeader
                                        sx={{ color: 'main.dark' }}
                                        avatar={<PersonOutlinedIcon />}
                                        title={`Assigned To -`}
                                    />
                                    <CardContent sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                        <Avatar>{task.consignee.name[0]}</Avatar>

                                        <Typography variant="h6">
                                            {task.consignee.name}
                                        </Typography>
                                    </CardContent>
                                </CommonCard>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item md={9} xs={12}>
                        <Card sx={{ height: '100%' }}>
                            <CardHeader
                                sx={{ color: 'main.dark' }}
                                avatar={<VerifiedUserOutlined />}
                                title={<Typography variant="h6">TASK STATUS</Typography>}
                            />
                            <CardContent>

                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Stack spacing={2}>
                                            <Box p={1}
                                                sx={{
                                                    border: '1px solid',
                                                    borderRadius: '10px',
                                                    borderColor: 'primary.main',
                                                }}
                                            >
                                                <Typography>
                                                    PRIORITY
                                                </Typography>
                                                <Typography variant="h4">
                                                    {task.priority}
                                                </Typography>
                                            </Box>

                                            <Box p={1}
                                                sx={{
                                                    border: '1px solid',
                                                    borderRadius: '10px',
                                                    borderColor: 'primary.main',
                                                }}
                                            >
                                                <Typography>
                                                    STATUS
                                                </Typography>
                                                <Typography variant="h4">
                                                    {task.status}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Box p={1}
                                            sx={{
                                                border: '1px solid',
                                                borderRadius: '10px',
                                                borderColor: 'primary.main',
                                                height: '100%',
                                                display:'flex',
                                                flexDirection:'column',
                                                justifyContent:"center"
                                            }}
                                        >

                                            <Typography variant="h6">
                                                DELIVERABLE
                                            </Typography>
                                            <Typography>
                                                {task.deliverable}
                                            </Typography>

                                            <Divider sx={{
                                                margin: '10px 0 10px 0'
                                            }} />

                                            <Typography variant="h6">
                                                    REMARKS
                                            </Typography>
                                            <Typography>
                                                {task.remarks}
                                            </Typography>


                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                </Container>
            </Box>
    )
}

export default TaskDetail;