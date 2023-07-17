import { Avatar, Box, Button, Card, CardContent, Chip, Divider, LinearProgress, linearProgressClasses, Paper, Typography } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { findTasks } from "../../../../backend/controller/taskController";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

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
    const theme = useTheme();

    useEffect(() => {
        findTasks(project.tasks)
            .then(res => {
                setTasks(res);
            })
    }, []);

    return (
        <Box
            mt={2}
            sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Card
                elevation={0}
                sx={{
                    borderRadius: '10px',
                    padding: '1rem',
                    background: theme.palette.custom.info
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: 1,
                    }}
                >
                    <Box sx={{ width: 200 }}>
                        <CircularProgressbar
                            value={parseInt(project.progress)}
                            text={`${parseInt(project.progress)}%`}
                            strokeWidth={10}
                            styles={buildStyles({
                                textColor: 'white',
                                pathColor: 'green'
                            })}
                        /></Box>
                </Box>

                <Stack direction={'row'} spacing={3} alignItems={'center'}>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 2,
                            border: '1px solid green',
                            borderRadius: "10px"

                        }}
                    >
                        <Typography variant="h5">
                            CREATED BY:
                        </Typography>
                        <Chip
                            sx={{ padding: 1, marginTop: 1 }}
                            label={
                                <Typography variant="h4">
                                    {project.creator.username}
                                </Typography>
                            }
                        />

                    </Box>
                </Stack>
                <Divider sx={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                }} />

                <Stack direction={'column'} spacing={3} >
                    <Chip
                        label={<Typography variant="h5">
                            DEPARTMENT
                        </Typography>}
                    />
                    <Typography variant="h5" textAlign={'center'}>
                        {
                            project.departments === 'All' ?
                                `All Departments` :
                                project.departments ? project.departments.name : 'Null'
                        }
                    </Typography>
                </Stack>
            </Card>
            <Card
                elevation={0}
                sx={{
                    borderRadius: '10px',
                    marginTop: 2,
                    padding: '1rem',
                    border: `1px solid ${theme.palette.custom.info}`,
                    flexGrow: 1,
                    marginBottom: 2,
                }}
            >
                <Typography variant="h4" sx={{ color: 'primary.main' }}>
                    Recent Tasks
                </Typography>
                <Divider sx={{ marginTop: '10px', marginBottom: '10px', color: 'primary.main' }} />
                {
                    tasks.slice(0, 3).map((task, index) => {
                        return (
                            <Paper
                                sx={{
                                    marginBottom: 1,
                                    marginTop: 1,
                                    background: theme.palette.custom.info,
                                    borderRadius: '10px'
                                }} elevation={0} key={index}>
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >

                                    <Avatar>{index + 1}</Avatar>
                                    <Box>
                                        <Typography variant="h6">{task.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">{task.description}</Typography>
                                    </Box>
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