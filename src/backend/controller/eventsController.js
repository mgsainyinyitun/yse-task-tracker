import { store } from "../../redux/store";
import { readProjects } from "./projectController";
import { readTasks } from "./taskController";

export async function getProjectEvents() {
    let events = [];
    let projects = await readProjects()
        .then(res => {
            if (res.status === 0) {
                return res.data;
            } else {
                return [];
            }
        });
    projects.forEach(project => {
        let event = {
            id: project.id,
            title: project.title,
            date: project.startDate ? new Date(project.startDate) : null,
            end: project.endDate ? new Date(project.endDate).setDate(new Date(project.endDate).getDate()+1): null,
            allDay: true,
        }
        events.push(event);
    })
    return Promise.resolve(events);
}

export async function getTaskEvents() {
    let user = store.getState().users.user;
    let events = [];
    let tasks = await readTasks()
        .then(res => {
            if (res.status === 0) {
                return res.data;
            } else {
                return [];
            }
        });

    tasks.forEach(task => {
        if (task.consignee.uid === user.uid) {
            let event = {
                id: task.id,
                title: task.title,
                date: task.startDate ? new Date(task.startDate) : null,
                end: task.dueDate ? new Date(task.dueDate).setDate(new Date(task.dueDate).getDate()+1): null,
                allDay: true,
                backgroundColor: 'green'
            }
            events.push(event);
        }
    })
    return Promise.resolve(events);
}
// const nextDay = new Date(currentDate.setDate(currentDate.getDate() + 1));