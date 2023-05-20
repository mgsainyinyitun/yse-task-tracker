import { ROLES } from "../constant";
import { CONSTANTS } from "../pages/constants";

export function findProject(id, projects) {
    return projects.find(item => {
        return (item.id) === (id);
    });
}
export function findTask(id, tasks) {
    return tasks.find(item => {
        return (item.id) === (id);
    });
}

export function findTaskContainedProject(taskId,projects){
    let found = projects.find(project=>{
        return project.tasks.includes(taskId);
    });
    if(found)return found;
    return null;
}

export function findDepartment(id, departments) {
    return departments.find(item => {
        return item.id === parseInt(id);
    })
}

export function findUserByUsername(username, users) {
    return users.find(user => {
        return user.username === username;
    })
}

export function findObjectByName(name, objects) {
    return objects.find(obj => {
        return obj.name === name;
    })
}

export function filterUsersByUids(users, subUsers) {
    let finalUsers = users.filter(user => {
        return !subUsers.some(sUser => sUser.uid === user.uid);
    })
    return finalUsers;
}

export function counteStatus(tasks) {
    let result = {
        notstart: 0,
        inprogress: 0,
        finished: 0,
    }
    tasks.forEach(task => {
        switch (task.status) {
            case CONSTANTS.STATUS.NOTSTART: result.notstart++; break;
            case CONSTANTS.STATUS.INPROGRESS: result.inprogress++; break;
            case CONSTANTS.STATUS.FINISHED: result.finished++; break;
        }
    });
    console.log(result);
    return result;
}

export function checkIsAdmin(user) {
    if (user.role.includes(ROLES.ADMIN)) {
        return true;
    }
    return false;
}
