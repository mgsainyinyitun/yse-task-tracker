import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { THEME } from "../../themes";
import Calendar from "../calendar/Calendar";
import FooterBar from "../general/FooterBar";
import { PAGE } from "../pageConstants";
import Profile from "../profile/Profile";
import ProjectsList from "../projects/ProjectsList";
import TaskDetail from "../tasks/crud/TaskDetail";
import TaskEdit from "../tasks/crud/TaskEdit";
import TasksList from "../tasks/TasksList";

const renderContents = (page) => {
    switch (page) {
        case PAGE.NAME.HOME:
            return <h3>Default Home Page</h3>
        /* TASKS       */
        case PAGE.NAME.TASKS.INDEX:
            return <TasksList/>;
        case PAGE.NAME.TASKS.DETAIL:
            return <TaskDetail/>;
        case PAGE.NAME.TASKS.EDIT:
            return <TaskEdit/>;
        /* PROFILE     */
        case PAGE.NAME.PROFILE:
            return <Profile />;
        /* PROJETCS    */
        case PAGE.NAME.PROJETCS:
            return <ProjectsList/>;
        /* CALENDAR    */
        case PAGE.NAME.CALENDAR:
            return <Calendar/>;
        /* USERS       */
        case PAGE.NAME.USERS:
            return <h3>Users Page</h3>;
        /* DEPARTMENTS */
        case PAGE.NAME.DEPARTMENTS:
            return <h3>Department Page</h3>;
        /* POSITIONS   */
        case PAGE.NAME.POSITIONS:
            return <h3>Position Page</h3>;
        default:
            return <h3>404 Not Found</h3>
    }
}

function Contents({ page }) {
    
    const theme = useTheme();
    const background = theme.palette.mode === THEME.DARK.palette.mode ?
        theme.palette.grey[900] : theme.palette.custom.background;

    console.log(theme.palette.custom.background);
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
                    background: `${background}`,
                }}
            >
                <Box
                    mb={1}
                    p={1}
                    sx={{
                        flexGrow: 1,
                        background: `${theme.palette.background.paper}`,
                        borderRadius: '10px',
                        display:'flex',
                        boxShadow:1,
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