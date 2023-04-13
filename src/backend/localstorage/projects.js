export function addProjectsDataToLocal(project) {
    const existingPjts = JSON.parse(localStorage.getItem('projects')) || [];
    if (!existingPjts.includes(project)) {
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