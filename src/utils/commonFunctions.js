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
    return result;
}

// const array2 = [{ uid: 2 }, { uid: 3 }];

// const filteredArray = array1.filter((obj1) => {
//   return !array2.some((obj2) => obj2.uid === obj1.uid);
// });