
export function findTask(id,tasks){
    return tasks.find(item=>{
        return item.id == id;
    })
}
