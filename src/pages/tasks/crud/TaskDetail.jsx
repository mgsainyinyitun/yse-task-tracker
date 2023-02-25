import { Avatar, Button, Card, CardContent, CardHeader, Divider, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import StartOutlinedIcon from '@mui/icons-material/StartOutlined';
import { mockTasks } from "../../../data/mockData";
import { styled } from '@mui/material/styles';
import { findTask } from "../../../utils/commonFunctions";
import { CalendarTodayOutlined } from "@mui/icons-material";

const DayCard = styled(Card)(({theme}) => ({
    flex: 0.2,
    maxHeight: '25%',
    borderRadius: '10px',
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
                width: '100%',
                height: '83vh',
                overflow: 'scroll',
                flexDirection: 'column',
                padding: '10px',
                border: '1px solid red',
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
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '83vh',
                    overflow: 'scroll',
                    padding: '10px',
                    gap: 1
                }}>

                <DayCard>
                    <CardHeader
                       
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
                </DayCard>

                <DayCard>
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
                </DayCard>

                <DayCard
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
                </DayCard>
            </Box>
        </Box>
    )
}

export default TaskDetail;