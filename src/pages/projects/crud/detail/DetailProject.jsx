import { Grid, IconButton, Typography,Box } from "@mui/material";
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
                        <Typography variant="h4" color={'primary.main'}>
                            {project.title || ""}
                        </Typography>

                        <Grid container>
                            <Grid item md={6} sm={12}>
                                <ProjectLeftInfo project={project} />
                            </Grid>
                            <Grid item md={6} sm={12}>
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