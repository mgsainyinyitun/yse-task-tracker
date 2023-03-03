import { Box, Button, Card, CardContent, Divider, LinearProgress, linearProgressClasses, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Stack } from "@mui/system";
import { mockDepartment, mockTasks } from "../../../../data/mockData";
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import { findDepartment } from "../../../../utils/commonFunctions";

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
                            CREATED BY: {project.creator.name}
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
                            project.scope === 'all' ?
                                `${project.scope.toUpperCase()}` :
                                findDepartment(project.scope, mockDepartment).name
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
                    mockTasks.slice(0, 3).map(task => {
                        return (
                            <Paper sx={{ marginBottom: 1, marginTop: 1 }}>
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <InsertLinkOutlinedIcon />
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