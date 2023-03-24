import { Box } from "@mui/material";
import SubTasksList from "./SubTasksList";
import TaskForm from "./TaskForm";

function AddTasks() {
    return (
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <Box
                sx={{
                    flex:0.6,
                }}
            >
                <TaskForm/>
            </Box>
            <Box
                sx={{
                    flex:0.4,
                }}
            >
                <SubTasksList/>
            </Box>
            
        </Box>
    )
}
export default AddTasks;


