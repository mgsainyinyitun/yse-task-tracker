import { Avatar, Card, CardContent, CardHeader, Divider, Container, Grid, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { styled, useTheme } from '@mui/material/styles';
import { CalendarTodayOutlined, VerifiedUserOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import { findTaskById } from "../../../backend/controller/taskController";

function TaskDetail() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const { id } = useParams();
    const nevigate = useNavigate();
    const [task, setTask] = useState(null);
    const theme = useTheme();
    useEffect(() => {
        findTaskById(id)
            .then((res) => {
                setTask(res.data);
            })
    }, []);

    const CommonCard = styled(Card)(() => ({
        borderRadius: '10px',
        border: `1px solid ${theme.palette.custom.info}`,
        minHeight: '25%',
        height: '100%',
        width: '100%',
    }));

    function renderDate(isoDateString) {
        if (isoDateString) {
            let date = new Date(isoDateString);
            return (
                <>
                    <Typography variant="h4">
                        {date.getFullYear()}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: 3,
                        }}
                    >
                        <Stack spacing={1} direction={'row'}>
                            <span>
                                {monthNames[date.getMonth() + 1]}
                            </span>
                            <span>
                                <Avatar sx={{ width: 25, height: 25 }}>
                                    {date.getDay()}
                                </Avatar>
                            </span>
                        </Stack>
                    </Typography>
                </>)
        } else {
            return (
                <Box sx={{
                    width: "100%",
                    height: "100%"
                }}>
                    <Typography variant="h5">
                        NOT DEFINED
                    </Typography>
                </Box>)
        }
    }
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
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
            {(task &&
                <>
                    <Container disableGutters={true} >
                        <Grid container spacing={2}>
                            <Grid item sm={12} xs={12} >
                                <Card sx={{ 
                                    borderRadius: '10px', 
                                    background: theme.palette.custom.info,
                                    width:'100%',
                             }} elevation={0}>
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
                                <CommonCard elevation={0}>
                                    <CardHeader
                                        sx={{ color: 'primary.dark' }}
                                        avatar={<CalendarTodayOutlined />}
                                        title={'START DATE'}
                                    />
                                    <CardContent>
                                        {renderDate(task.startDate)}
                                    </CardContent>
                                </CommonCard>
                            </Grid>

                            <Grid item md={4} xs={12}>
                                <CommonCard elevation={0}>
                                    <CardHeader
                                        sx={{ color: 'error.dark' }}
                                        avatar={<CalendarTodayOutlined />}
                                        title={'DUE DATE'}
                                    />
                                    <CardContent>
                                        {renderDate(task.dueDate)}
                                    </CardContent>
                                </CommonCard></Grid>

                            <Grid item md={4} xs={12}>
                                <CommonCard elevation={0}
                                >
                                    <CardHeader
                                        sx={{ color: 'main.dark' }}
                                        avatar={<CalendarTodayOutlined />}
                                        title={'FINISHED DATE'}
                                    />
                                    <CardContent>
                                        {renderDate(task.finishedDate)}
                                    </CardContent>
                                </CommonCard>
                            </Grid>

                            <Grid item md={3} xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item md={12} xs={6}>
                                        <CommonCard elevation={0}>
                                            <CardHeader
                                                sx={{ color: 'main.dark' }}
                                                avatar={<PersonOutlinedIcon />}
                                                title={`Assigned By -`}
                                            />
                                            <CardContent sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                                <Avatar>{task.consigner.username[0]}</Avatar>

                                                <Typography variant="h6">
                                                    {task.consigner.username}
                                                </Typography>
                                            </CardContent>
                                        </CommonCard>
                                    </Grid>
                                    <Grid item md={12} xs={6}>
                                        <CommonCard elevation={0}>
                                            <CardHeader
                                                sx={{ color: 'main.dark' }}
                                                avatar={<PersonOutlinedIcon />}
                                                title={`Assigned To -`}
                                            />
                                            <CardContent sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                                <Avatar>{task.consignee.username[0]}</Avatar>

                                                <Typography variant="h6">
                                                    {task.consignee.username}
                                                </Typography>
                                            </CardContent>
                                        </CommonCard>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item md={9} xs={12}>
                                <Card sx={{ height: '100%', borderRadius: '10px', border: `1px solid ${theme.palette.custom.info}`, }} elevation={0}>
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
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: "center"
                                                    }}
                                                >

                                                    <Typography variant="h6">
                                                        DELIVERABLE
                                                    </Typography>
                                                    <Typography>
                                                        {task.deliverable || ''}
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
                </>
            )}

        </Box>
    )
}

export default TaskDetail;