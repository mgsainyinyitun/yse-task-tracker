import { store } from "../redux/store";


export function checkTaskEditable(id) {
    let tasks = store.getState().tasks.data;
    let user = store.getState().users.user;
    let task = tasks.find(task => task.id === id);
    if (user.uid === task.consignee.uid || user.uid === task.consigner.uid) {
        return false;
    }
    return true;
}

export function checkTaskDeleteable(id) {
    let tasks = store.getState().tasks.data;
    let user = store.getState().users.user;
    let task = tasks.find(task => task.id === id);
    if (user.uid === task.consignee.uid || user.uid === task.consigner.uid) {
        return false;
    }
    return true;
}


export function checkProjectEditable(id) {
    let projects = store.getState().projects.data;
    let user = store.getState().users.user;
    let project = projects.find(project => project.id === id);
    if (user.uid === project.creator.uid) {
        return false;
    }
    return true;
}

export function checkProjectDeleteable(id) {
    let projects = store.getState().projects.data;
    let user = store.getState().users.user;
    let project = projects.find(project => project.id === id);
    if (user.uid === project.creator.uid) {
        return false;
    }
    return true;
}