export function addProjectsDataToLocal(project) {
    const existingPjts = JSON.parse(localStorage.getItem('projects')) || [];
    let found = existingPjts.find(item => item.id === project.id);
    if (!found) {
        // Append the new item to the array
        const updatedPjts = [...existingPjts, project];
        // Save the updated array back to localStorage
        window.localStorage.setItem('projects', JSON.stringify(updatedPjts));
    }
}

export function getProjectsDatafromLocal() {
    const pjts = JSON.parse(window.localStorage.getItem('projects'))
    return pjts;
}

export function addProjectTaskToLocal(projectId, taskId) {
    const existingPjts = JSON.parse(localStorage.getItem('projects')) || [];
    let found = existingPjts.find(item => item.id === projectId);
    let updatedPjt = null;
    let updatedPjts = [];
    if (found) {
        if (found.tasks.indexOf(taskId) === -1) {
            updatedPjt = { ...found, tasks: [...found.tasks, taskId] }
        }
    }
    if(updatedPjt){
        updatedPjts = existingPjts.filter(project => project.id !== projectId);
        updatedPjts.push(updatedPjt);
    } else{
        updatedPjts = {...existingPjts};
    }
    window.localStorage.setItem('projects', JSON.stringify(updatedPjts));
}

export function removeProjectTaskFromLocal(projectId, taskId) {
    const existingPjts = JSON.parse(localStorage.getItem('projects')) || [];
    let found = existingPjts.find(item => item.id === projectId);
    let updatedPjt = null;
    let updatedPjts = [];
    if (found) {
        if (found.tasks.indexOf(taskId)>0) {
            let updatedTask = found.tasks.filter(arr => arr !== taskId);
            updatedPjt = { ...found, tasks: [...updatedTask]}
        }
    }
    if(updatedPjt){
        updatedPjts = existingPjts.filter(project => project.id !== projectId);
        updatedPjts.push(updatedPjt);
    } else{
        updatedPjts = {...existingPjts};
    }
    window.localStorage.setItem('projects', JSON.stringify(updatedPjts));
}