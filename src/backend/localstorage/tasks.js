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