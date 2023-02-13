import { useTheme } from "@emotion/react";
import { Box } from "@mui/system";
import { THEME } from "../../themes";
import FooterBar from "../general/FooterBar";
import { PAGE } from "../pageConstants";
import Profile from "../profile/Profile";
import Task from "../tasks/Task";

const renderContents = (page) => {
    switch (page) {
        case PAGE.NAME.HOME:
            return <h3>Default Home Page</h3>
        case PAGE.NAME.TASKS:
            return <Task />;
        case PAGE.NAME.PROFILE:
            return <Profile />;
        case PAGE.NAME.PROJETCS:
            return <h3>Projects Page</h3>;
        case PAGE.NAME.CALENDAR:
            return <h3>Calendar Page</h3>;
        case PAGE.NAME.USERS:
            return <h3>Users Page</h3>;
        case PAGE.NAME.DEPARTMENTS:
            return <h3>Department Page</h3>;
        case PAGE.NAME.POSITIONS:
            return <h3>Position Page</h3>;
        default:
            return <h3>404 Not Found</h3>
    }
}

function Contents({ page }) {
    const theme = useTheme();
    const background = theme.palette.mode === THEME.DARK.palette.mode ?
        theme.palette.grey[900] : theme.palette.grey[300];
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            overflow: 'scroll',
            borderRadius: '10px 10px 0 0',
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    background: `${background}`
                }}
            >
                <Box
                    mb={1}
                    p={1}
                    sx={{
                        flexGrow: 1,
                        background: `${theme.palette.background.paper}`,
                        borderRadius: '10px',
                    }}
                >
                    {renderContents(page)}
                </Box>
                <FooterBar />
            </Box>
        </Box>
    );
}

export default Contents;