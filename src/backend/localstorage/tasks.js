export function addTasksDataToLocal(task) {
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let found = existingTasks.find(item => item.id === task.id);
    if (!found) {
        const updatedTasks = [...existingTasks, task];
        window.localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
}

export function getTasksDatafromLocal() {
    const pjts = JSON.parse(window.localStorage.getItem('tasks'))
    return pjts;
}

export function updateTasksDataInLocal(task) {
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let found = existingTasks.find(item => item.id === task.id);
    if (found) {
        let updatedTasks = existingTasks.filter(item => item.id !== found.id);
        updatedTasks.push({ ...found, ...task });
        window.localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
}

export function deleteTaskInLocal(taskId) {
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let updatedTasks = existingTasks.filter(item => item.id !== taskId);
    window.localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}