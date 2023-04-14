import { Avatar, Box, Button, Card, CardContent, Divider, LinearProgress, linearProgressClasses, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Stack } from "@mui/system";
import { mockTasks } from "../../../../data/mockData";
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import { useEffect, useState } from "react";
import { findTaskById, findTasks } from "../../../../backend/controller/taskController";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

function ProjectRightInfo({ project }) {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        findTasks(project.tasks)
            .then(res => {
                setTasks(res);
            })
    }, []);

    return (
        <Box
            mt={4}
            p={1}
            sx={{
                height: '100%',
                width: '100%',
            }}
        >
            <Card
                sx={{
                    borderRadius: '10px',
                    padding: '1rem',
                }}
            >
                <BorderLinearProgress
                    variant="determinate"
                    value={project.progress}
                    sx={{
                        marginBottom: '1rem',
                    }}
                />
                <Stack direction={'row'} spacing={3} alignItems={'center'}>
                    <Typography variant="h4">
                        {project.progress} %
                    </Typography>
                    <Box>
                        <Typography variant="h5" sx={{ color: 'primary.dark' }}>
                            CREATED BY: {project.creator.username}
                        </Typography>
                    </Box>
                </Stack>
                <Divider sx={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                }} />


                <Stack direction={'row'} spacing={3} >
                    <Typography variant="h5">
                        DEPARTMENT &nbsp; :
                    </Typography>
                    <Typography variant="h5">
                        {
                            project.departments === 'All' ?
                                `${project.departments.toUpperCase()}` :
                                project.departments ? project.departments.name : 'Null'
                        }
                    </Typography>
                </Stack>
            </Card>
            <Card
                sx={{
                    borderRadius: '10px',
                    marginTop: '2rem',
                    padding: '1rem',
                }}
            >
                <Typography variant="h4" sx={{ color: 'primary.main' }}>
                    Recent Tasks
                </Typography>
                <Divider sx={{ marginTop: '10px', marginBottom: '10px', color: 'primary.main' }} />
                {
                    tasks.slice(0, 3).map((task,index) => {
                        return (
                            <Paper sx={{ marginBottom: 1, marginTop: 1 }} key={index}>
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <Avatar>{index + 1}</Avatar>
                                    {task.title}
                                </CardContent>
                            </Paper>
                        );
                    })
                }
                <Box>
                    <Button variant="contained">
                        More
                    </Button>
                </Box>
            </Card>

        </Box>
    )
}

export default ProjectRightInfo;