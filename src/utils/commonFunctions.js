
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

export function findUserByUsername(username,users){
    return users.find(user=>{
        return user.username === username;
    })
}

export function findObjectByName(name,objects){
    return objects.find(obj=>{
        return obj.name===name;
    })
}
