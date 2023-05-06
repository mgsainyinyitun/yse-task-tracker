import { Avatar, Box, Button, Card, CardHeader, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField, Typography, styled } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { readTasks, readUserTasks } from "../../backend/controller/taskController";
import { CheckCircleOutlineOutlined, EditAttributesRounded, NotStartedOutlined, WorkHistoryOutlined } from "@mui/icons-material";
import { CONSTANTS } from "../constants";
import { isoDateStringToFormattedDateString } from "../../utils/dateFunction";
import ModeIcon from '@mui/icons-material/Mode';
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";

const StatusCard = styled(Card)(() => ({
    height: 150,
    width: '100%',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));


function HomeTasksList() {
    const theme = useTheme();
    const user = useSelector(state => state.users.user);
    const reduxTasks = useSelector(state => state.tasks.data);

    function renderFinishedDate(finishedDate) {
        if (finishedDate) {
            return isoDateStringToFormattedDateString(finishedDate);
        } else {
            return <Typography variant="body2" color={'error'}>Not Defined</Typography>
        }
    }
    function renderStatue(status) {
        switch (status) {
            case CONSTANTS.STATUS.NOTSTART:
                return <NotStartedOutlined sx={{ color: 'error.main' }} />
            case CONSTANTS.STATUS.INPROGRESS:
                return <WorkHistoryOutlined sx={{ color: 'primary.main' }} />
            case CONSTANTS.STATUS.FINISHED:
                return <CheckCircleOutlineOutlined sx={{ color: 'success.main' }} />
        }
    }

    function renderDate(startDate, dueDate) {
        if (dueDate) {
            return `From ${isoDateStringToFormattedDateString(startDate)} to ${isoDateStringToFormattedDateString(dueDate)} `;
        } else {
            return isoDateStringToFormattedDateString(startDate);
        }
    }

    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        readUserTasks(user.uid)
            .then(res=>{

            })

        readTasks()
            .then(res => {
                if(res.status===0){
                    setTasks(res.data);
                }
            })
    }, [reduxTasks])

    return (
        <Box pt={1} pl={1} pr={{ xs: 1, sm: 1, md: 0 }}
        >
            <Card elevation={0} sx={{ borderRadius: '10px' }}>
                <CardHeader title={
                    <>
                        <Typography variant="h5" color={'primary.dark'} fontWeight={'bold'}>
                            YOUR TASKS LIST
                        </Typography>
                        <Typography variant="body1" color={'grey'}>
                            Welcome,{user.username}
                        </Typography>
                    </>}
                />
            </Card>


            <Grid container spacing={1} pt={1}>
                <Grid item xs={4}>
                    <StatusCard elevation={0}
                        sx={{
                            background: theme.palette.error.light,
                        }}>
                        <Typography variant="h6" color={'white'} fontWeight={'bold'} textAlign={'center'}>
                            NOT START
                        </Typography>
                        <Typography variant="h3" color={'white'} fontWeight={'bold'}>
                            3
                        </Typography>
                    </StatusCard>
                </Grid>
                <Grid item xs={4}>
                    <StatusCard elevation={0}
                        sx={{ background: theme.palette.info.light }}>
                        <Typography variant="h6" color={'white'} fontWeight={'bold'} textAlign={'center'}>
                            IN PROGRESS
                        </Typography>
                        <Typography variant="h3" color={'white'} fontWeight={'bold'}>
                            1
                        </Typography>
                    </StatusCard>
                </Grid>
                <Grid item xs={4}>
                    <StatusCard elevation={0}
                        sx={{ background: theme.palette.success.light }}>
                        <Typography variant="h6" color={'white'} fontWeight={'bold'} textAlign={'center'}>
                            FINISHED
                        </Typography>
                        <Typography variant="h3" color={'white'} fontWeight={'bold'}>
                            0
                        </Typography>
                    </StatusCard>
                </Grid>
            </Grid>

            <Box mt={3} mb={1} ml={2}>
                <Typography variant="body1" color={'grey'}>
                    {tasks?tasks.length:''} Total Number of Tasks.
                </Typography>
            </Box>

            <List sx={{ width: '100%' }}>
                {
                    tasks.map(task => {
                        return (
                            <Card
                                elevation={0}
                                sx={{
                                    marginBottom: 1,
                                    background: theme.palette.custom.info,
                                    borderRadius: '10px'
                                }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <IconButton>
                                                {renderStatue(task.status)}
                                            </IconButton>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={task.title}
                                        secondary={renderDate(task.startDate, task.dueDate)} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <ListItemText
                                            primary={'Assigned By'}
                                            secondary={task.consigner.username}
                                        />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <ListItemText
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-end',
                                                    marginRight: 1,
                                                }}
                                                primary={'Finished Date'}
                                                secondary={renderFinishedDate(task.finishedDate)}
                                            />
                                            <Avatar>
                                                <IconButton>
                                                    <ModeIcon color="primary" />
                                                </IconButton>
                                            </Avatar>
                                        </Box>
                                    </Box>
                                </ListItem>
                                <Divider />
                                <ListItem sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                    <Button variant="contained">Detail</Button>
                                </ListItem>
                            </Card>)
                    })
                }
            </List>
        </Box>)
}
export default HomeTasksList;