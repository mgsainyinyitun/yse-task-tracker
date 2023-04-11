import { Box, Button, Card, Container, Typography } from "@mui/material";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProjectToStore } from "../../../../backend/firebase/firestore/projectStoreFunctions";
import { getAllUsers } from "../../../../backend/firebase/firestore/userStoreFunction";
import FormStepper from "../../../../components/FormStepper";
import OverlayLoading from "../../../../components/OverlayLoading";
import { addTask } from "../../../../redux/reducers/taskSlice";
import { addAllUser } from "../../../../redux/reducers/userSlice";
import { findObjectByName, findUserByUsername } from "../../../../utils/commonFunctions";
import BackButton from "../../../general/BackButton/BackButton";
import AddMembers from "./AddMembers";
import AddTasks from "./AddTasks";
import ProjectDetails from "./ProjectDetails";
import SubmitProjectForm from "./SubmitProjectForm";
import Success from "./Success";

const steps = [
    'Project Detail',
    'Add Members',
    'Add Tasks',
    'Submit',
];

function NewProject() {
    const { register, handleSubmit, formState, getValues,reset } = useForm();
    const [activeState, setActiveState] = useState(0);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [skip, setSkip] = useState(false);

    const [type, setType] = useState('next');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [taskStartDate, setTaskStartDate] = useState(new Date());
    const [dueDate, setDueDate] = useState(null);
    const { errors } = formState;
    const [members, setMembers] = useState([]);
    const [tasks, addTasks] = useState([]);
    const [users,setUsers] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const Susers = useSelector(state => state.users.all);

    const renderStepForm = () => {
        switch (activeState) {
            case 0: return (
                <ProjectDetails
                    register={register}
                    getValues={getValues}
                    errors={errors}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />);
            case 1: return (
                <AddMembers
                    register={register}
                    getValues={getValues}
                    errors={errors}
                    setMembers={setMembers}
                />);
            case 2: return (
                <AddTasks
                    register={register}
                    setType={setType}
                    errors={errors}
                    skip={skip}
                    setSkip={setSkip}
                    taskStartDate={taskStartDate}
                    setTaskStartDate={setTaskStartDate}
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                    tasks={tasks}
                />);
            case 3: return (
                <SubmitProjectForm
                    register={register}
                    getValues={getValues}
                    errors={errors}
                    members={members}
                    startDate={startDate}
                    endDate={endDate}
                />);
            default: return <h3>Not Step</h3>
        }
    }

    function nextStep(previousStep) {
        if (previousStep > 3) return;
        setActiveState(previousStep + 1);
    }
    function previousStep(currentStep) {
        if (currentStep < 0) return;
        setActiveState(currentStep - 1);
    }
    function prepareMember(members) {
        let memb = members.map(m => {
            return {
                uid: m.uid,
                username: m.username,
            }
        });
        return memb;
    }
    function handleAddTask(data){
        console.log(data);
        const {taskTitle,taskDescription,remark,assignTo,priority} = data;
        /** Reset Form */
        reset({
            taskTitle:'',
            taskDescription:'',
            remark:'',
        });
        setTaskStartDate(new Date());
        setDueDate(null);
        /** Prepare task state */

        let consignee = findUserByUsername(assignTo,users);

        console.log(consignee);

        let task = {
            title:taskTitle,
            description:taskDescription,
            consigner:{
                uid: user.uid,
                username: user.username,
            },
            consignee:assignTo?{
                uid:consignee.uid,
                username:consignee.username,
            }:null,
            priority:priority,
            status:'notyet',
            startDate:new Date(taskStartDate),
            dueDate:dueDate?new Date(dueDate):null,
            remarks:remark,
            createdAt:serverTimestamp(),
            updatedAt:serverTimestamp(),
        }
        addTasks([...tasks,task])
        // dispatch(addTask(task)) ;
        console.log(tasks);
    }


    function submitProject(project) {
        setLoading(true);
        addProjectToStore(project).then(
            res => {
                console.log("Response",res);
                if (res.status === 0) {
                    setSuccess(true);
                    setLoading(false);
                    return res.docId;
                } else {
                    console.log(res);
                }
                setLoading(false);
            })
    }


    function handleProjectSubmit(data, type) {
        console.log(data);
        const { title, description } = data;
        if (type === 'add') {
            handleAddTask(data);
            return;
        }

        if (activeState === 3) {
            /** Prepare Project data */
            let project = {
                title,
                description,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
                progress: 0,
                creator: {
                    uid: user.uid,
                    username: user.username,
                },
                members: prepareMember(members),
                tasks: null,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            }
            /** submit project */
            // const projectId = submitProject(project);
            // console.log('project id',projectId);
        } else {
            nextStep(activeState)
        }
    }

    useEffect(() => {
        setLoading(true);
        if (Susers) {
            setUsers(Susers);
            setLoading(false);
        } else {
            getAllUsers().then(
                users => {
                    setUsers(users);
                    dispatch(addAllUser(users));
                    setLoading(false);
                }
            )
        }
    },[])

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                overflow: 'auto',
                flexDirection: 'column',
                padding: '10px',
                alignItems: 'flex-start',
            }}
        >
            <Box
                sx={{
                    alignSelf: 'flex-start',
                }}
            >
                <BackButton />
            </Box>

            <FormStepper
                steps={steps}
                current={activeState}
                complete={success}
            />
            <Container
                maxWidth={'lg'}
                sx={{
                    height: '100%',
                }}
            >
                <Card
                    sx={{
                        borderRadius: '10px',
                        padding: '1rem',
                        marginBottom: '10px',
                        marginTop: '30px',
                    }}
                >
                    <Typography
                        color={'primary'}
                        variant={'h6'}
                    >
                        {steps[activeState].toUpperCase()}
                    </Typography>
                </Card>
                <Card
                    sx={{
                        borderRadius: '10px',
                        padding: '1rem',
                        minHeight: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <form onSubmit={handleSubmit(data => handleProjectSubmit(data, type))}
                        style={{
                            flexGrow: 1,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {success ? <Success /> : renderStepForm()}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '15px',
                                }}
                            >
                                {(!(success) &&
                                    <Button
                                        variant="outlined"
                                        disabled={!activeState}
                                        onClick={() => previousStep(activeState)}
                                    >
                                        Back
                                    </Button>
                                )}
                                {(!(activeState === 3) && !(activeState === 2) &&
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={activeState === 3}
                                        onClick={() => setType('next')}
                                    >
                                        NEXT
                                    </Button>
                                )}
                                {((activeState === 2) &&
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={activeState === 3}
                                        onClick={() => {
                                            setSkip(true);
                                            setType('next');
                                        }}
                                    >
                                        SKIP
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </form>
                </Card>
            </Container>
            <OverlayLoading open={loading} />
        </Box>
    )
}

export default NewProject;