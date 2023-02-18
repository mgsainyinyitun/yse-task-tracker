import { Avatar, Button, Card, CardContent, CardHeader, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import StartOutlinedIcon from '@mui/icons-material/StartOutlined';
import { mockTasks } from "../../../data/mockData";
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    borderRadius: '10px',
    color: theme.palette.text.secondary,
    minWidth: 30,
}));


function TaskDetail() {
    const { id } = useParams();
    const task = mockTasks.find(item => {
        return item.id == id;
    });
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
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIosOutlinedIcon />}
                    size={'small'}
                    onClick={() => nevigate(-1)}
                >Back</Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '83vh',
                    overflow: 'scroll',
                    flexDirection: 'column',
                    padding: '10px',
                }}>

                <Card sx={{ minWidth: 100, borderRadius: '10px', }}>
                    <CardHeader
                        avatar={<Avatar>{task.title[0]}</Avatar>}
                        title={<Typography variant="h5">{task.title}</Typography>}
                        sx={{
                            borderBottom: '1px solid grey'
                        }}
                    />
                    <CardContent>

                        <Typography>Description:</Typography>

                        <TextField
                            sx={{
                                marginBottom: '10px',
                            }}
                            fullWidth
                            value={task.description}
                            multiline
                            rows={5}
                        />

                        <Stack direction={'row'} spacing={2}>
                            <Item>
                                <Typography variant="h6">
                                    CONSIGNER:
                                </Typography>
                                <Divider />
                                <Typography variant="h6">
                                    {task.consigner.name}
                                </Typography>
                            </Item>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}

                            >
                                <StartOutlinedIcon />
                            </Box>


                            <Item>
                                <Typography variant="h6">
                                    CONSIGNEE:
                                </Typography>
                                <Divider />
                                <Typography variant="h6">
                                    {task.consignee.name}
                                </Typography>
                            </Item>
                        </Stack>

                    </CardContent>
                </Card>
            </Box>

        </Box>
    )
}

export default TaskDetail;