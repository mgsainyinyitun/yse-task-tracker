import { Card, CardContent, Container, Paper } from "@mui/material";
import { Box } from "@mui/system";
import TopBar from "../general/TopBar";
import SideMenuBar from "../general/SideMenuBar";
import { useTheme } from "@mui/material";
import { THEME } from "../../themes";
import FooterBar from "../general/FooterBar";
function Dashboard() {
    const theme = useTheme();
    const background = theme.palette.mode === THEME.DARK.palette.mode ?
        theme.palette.grey[900] : theme.palette.grey[300];
    return (
        <div className="app">
            <SideMenuBar />
            <Box
                width={'100%'}
                p={1}
                sx={{
                    background: `${background}`,
                    overflow: 'scroll',
                }}
            >
                <TopBar />
                <div className="action-area">
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        overflow: 'scroll',
                        borderRadius: '10px',
                        background: `${theme.palette.background.paper}`,
                        padding:'1rem',
                    }}>
                        <Paper
                            elevation={2}
                            sx={{
                                width: '300px',
                                height: '300px',
                                borderRadius:'10px',
                                padding:'5px'
                            }}
                        >
                            Youth Societh For Eduction
                        </Paper>
                    </Box>
                </div>
                <FooterBar />
            </Box>
        </div>
    )
}

export default Dashboard;