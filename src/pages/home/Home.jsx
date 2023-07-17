import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import HomeTasksList from "./HomeTasksList";
import HomeProjectsList from "./HomeProjectsList";

function Home() {
    const user = useSelector(state => state.users.user)
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
            }}>
            <Grid container spacing={1}
                sx={{
                    height: '100%',
                    display: 'flex',
                }}>
                <Grid item md={6} sm={12} xs={12}
                    sx={{
                        height: '100%',
                        overflow: 'scroll'
                    }}
                >
                    <HomeTasksList />
                </Grid>

                <Grid item md={6} sm={12} xs={12}
                    sx={{
                        height: '100%',
                        overflow: 'scroll'
                    }}
                >
                    <HomeProjectsList />
                </Grid>
            </Grid></Box>
    )
}
export default Home;