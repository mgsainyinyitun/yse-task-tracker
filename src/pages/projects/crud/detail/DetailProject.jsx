import { Avatar, Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams, useNavigate } from "react-router-dom"
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ProjectLeftInfo from "./ProjectLeftInfo";
import { findProject } from "../../../../utils/commonFunctions";
import { mockProject } from "../../../../data/mockData";
import ProjectRightInfo from "./ProjectRightInfo";


function DetailProject() {
    const { id } = useParams();
    const nevigate = useNavigate();
    const project = findProject(id, mockProject);

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

            {/** Start Here */}

            <Box
                m={1}
                sx={{
                    flex: 1,
                }}
            >
                <Typography variant="h4" color={'primary.main'}>
                    {project.title}
                </Typography>

                <Grid container>
                    <Grid item md={6} sm={12}>
                       <ProjectLeftInfo project={project}/>
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <ProjectRightInfo project={project}/>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default DetailProject;