
export function findTask(id,tasks){
    return tasks.find(item=>{
        return item.id === parseInt(id);
    })
}


export function findProject(id,projects){
    return projects.find(item=>{
        return item.id === parseInt(id);
    });
}

export function findDepartment(id,departments){
    return departments.find(item=>{
        return item.id === parseInt(id);
    })
}