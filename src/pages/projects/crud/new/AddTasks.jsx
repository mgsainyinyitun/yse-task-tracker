import { Box, Grid } from "@mui/material";
import SubTasksList from "./SubTasksList";
import TaskForm from "./TaskForm";

function AddTasks({register,setType,errors,skip,setSkip,taskStartDate,setTaskStartDate,dueDate,setDueDate,tasks}) {
    return (
        <Grid
            container
            spacing={1}
        >
            <Grid
                item
                md={7}
                sm={7}
                xs={12}

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
            </Grid>
            <Grid
                item
                md={5}
                sm={5}
                xs={12}
            >
                <SubTasksList tasks={tasks}/>
            </Grid>
            
        </Grid>
    )
}
export default AddTasks;


