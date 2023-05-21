import { Avatar, AvatarGroup, Box, Card, CardHeader, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography, styled, useTheme } from "@mui/material";
import { readProjects } from "../../backend/controller/projectController";
import { useEffect, useState } from "react";
import { isoDateStringToFormattedDateString } from "../../utils/dateFunction";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";

function renderDate(startDate, dueDate) {
    if (dueDate) {
        return `From ${isoDateStringToFormattedDateString(startDate)} to ${isoDateStringToFormattedDateString(dueDate)} `;
    } else {
        return isoDateStringToFormattedDateString(startDate);
    }
}

function HomeProjectsList() {
    const theme = useTheme();
    const [projects, setProjects] = useState([]);
    const storePjt = useSelector(state => state.projects.data)
    useEffect(() => {
        readProjects()
            .then(res => {
                if (res.status === 0) {
                    setProjects(res.data);
                }
            })
    }, [storePjt]);
    return (
        <Box
            pt={1} pb={1} pr={1}
            pl={{ xs: 1, sm: 1, md: 0 }}
            sx={{
                width: '100%',
                height: '100%'
            }}
        >
            <Card elevation={0} sx={{ background: theme.palette.custom.secondary, borderRadius: '10px', }}>
                <CardHeader title={
                    <Typography variant="h5" color={'white'} fontWeight={'bold'}>
                        PROJECTS LIST
                    </Typography>} />
            </Card>

            <Box mt={3} mb={1} ml={2}>
                <Typography variant="body1" color={'grey'}>
                    {projects.length} Total Number of Projects.
                </Typography>
            </Box>

            <List sx={{ width: '100%', }}>
                <Grid container spacing={1}>
                    {
                        projects.map(project => {
                            return (
                                <Grid item md={6} sm={6} xs={12} key={project.id}>
                                    <Card elevation={0}
                                        sx={{
                                            marginBottom: 1,
                                            background: theme.palette.custom.primary,
                                            borderRadius: '10px',
                                            height: '100%'
                                        }}>
                                        <ListItem key={project.id}>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6" color={'white'}
                                                        sx={{minHeight:60}}
                                                    >
                                                        {project.title}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography color={'blue'} sx={{minHeight:60}}>
                                                        {renderDate(project.startDate, project.endDate)}
                                                    </Typography>
                                                } />
                                        </ListItem>
                                        <ListItem sx={{ display: 'flex', justifyContent: 'center',marginBottom:4 }}>
                                            <Box
                                                sx={{
                                                    width: 100,
                                                    height: 100,
                                                }}
                                            >
                                                <CircularProgressbar
                                                    value={parseInt(project.progress)}
                                                    text={`${parseInt(project.progress)}%`}
                                                    strokeWidth={10}
                                                    styles={buildStyles({
                                                        textColor: 'white',
                                                        pathColor: 'green'
                                                    })}
                                                />
                                            </Box>
                                        </ListItem>
                                        <Divider />

                                        <ListItem sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent:'space-between'
                                        }}>
                                            
                                            <AvatarGroup max={4}
                                                sx={{
                                                    '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 },
                                                }}  >
                                            
                                                {
                                                    project.members.map(member=>{
                                                        return  <Avatar sx={{ width: 24, height: 24 }}>{member.username[0].toUpperCase()}</Avatar>
                                                    })
                                                }
                                            </AvatarGroup>
                                            <Typography variant="body2" color={grey[300]} display={'flex'} alignItems={'center'}>
                                                 <Avatar sx={{ width: 24, height: 24,marginRight:1, }}> {project.tasks.length} </Avatar> Total Tasks
                                            </Typography>
                                        </ListItem>
                                    </Card>
                                </Grid>
                            );
                        })
                    }

                </Grid>
            </List>


        </Box >)
}
export default HomeProjectsList;