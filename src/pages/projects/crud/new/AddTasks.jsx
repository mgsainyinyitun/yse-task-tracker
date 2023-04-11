import { Box } from "@mui/material";
import SubTasksList from "./SubTasksList";
import TaskForm from "./TaskForm";

function AddTasks({register,setType,errors,skip,setSkip,taskStartDate,setTaskStartDate,dueDate,setDueDate,tasks}) {
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
                <TaskForm
                    register={register}
                    setType={setType}
                    errors={errors}
                    skip={skip}
                    setSkip={setSkip}
                    taskStartDate={taskStartDate}
                    setTaskStartDate={setTaskStartDate}
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                />
            </Box>
            <Box
                sx={{
                    flex:0.4,
                }}
            >
                <SubTasksList tasks={tasks}/>
            </Box>
            
        </Box>
    )
}
export default AddTasks;


