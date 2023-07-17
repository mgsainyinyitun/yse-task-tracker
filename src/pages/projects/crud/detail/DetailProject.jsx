import { Grid, IconButton, Typography, Box, Card, useTheme } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ProjectLeftInfo from "./ProjectLeftInfo";
import ProjectRightInfo from "./ProjectRightInfo";
import { useEffect, useState } from "react";
import OverlayLoading from "../../../../components/OverlayLoading";
import { findProjectById } from "../../../../backend/controller/projectController";

function DetailProject() {
    const { id } = useParams();
    const nevigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    useEffect(() => {
        setLoading(true);
        findProjectById(id)
            .then(res => {
                setProject(res.data);
                setLoading(false);
            });
    }, []);

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
            {(project &&
                <>
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
                        <Card 
                            elevation={0}
                            sx={{
                                background:theme.palette.custom.info,
                                padding:1,
                                borderRadius:'10px'
                            }}
                        >
                            <Typography variant="h4" color={'primary.main'}>
                                {project.title || ""}
                            </Typography>
                        </Card>

                        <Grid container spacing={1}>
                            <Grid item md={6} sm={12} xs={12}>
                                <ProjectLeftInfo project={project} />
                            </Grid>
                            <Grid item md={6} sm={12} xs={12}>
                                <ProjectRightInfo project={project} />
                            </Grid>
                        </Grid>
                    </Box>
                </>
            )}
            <OverlayLoading open={loading} />
        </Box>
    )
}

export default DetailProject;