import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { THEME } from "../../themes";
import Calendar from "../calendar/Calendar";
import Home from "../home/Home";
import { PAGE } from "../pageConstants";
import Profile from "../profile/Profile";
import DetailProject from "../projects/crud/detail/DetailProject";
import NewProject from "../projects/crud/new/NewProject";
import ProjectsList from "../projects/ProjectsList";
import TaskDetail from "../tasks/crud/TaskDetail";
import TaskEdit from "../tasks/crud/TaskEdit";
import TasksList from "../tasks/TasksList";
import EditProject from "../projects/crud/edit/EditProject";

const renderContents = (page) => {
    switch (page) {
        case PAGE.NAME.HOME:
            return <Home />
        /* TASKS       */
        case PAGE.NAME.TASKS.INDEX:
            return <TasksList />;
        case PAGE.NAME.TASKS.DETAIL:
            return <TaskDetail />;
        case PAGE.NAME.TASKS.EDIT:
            return <TaskEdit />;
        /* PROFILE     */
        case PAGE.NAME.PROFILE:
            return <Profile />;
        /* PROJETCS    */
        case PAGE.NAME.PROJETCS.INDEX:
            return <ProjectsList />;
        case PAGE.NAME.PROJETCS.DETAIL:
            return <DetailProject />;
        case PAGE.NAME.PROJETCS.EDIT:
            return <EditProject />;
        case PAGE.NAME.PROJETCS.CREATE:
            return <NewProject/>;
        /* CALENDAR    */
        case PAGE.NAME.CALENDAR:
            return <Calendar />;
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
        <Box 
            sx={{
                flexGrow: 1,
                background: `${theme.palette.background.paper}`,
                borderRadius: '10px',
                display:'flex',
            }}
        >
            {renderContents(page)}
        </Box>
    );
}

export default Contents;