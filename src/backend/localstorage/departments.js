export function addDepartmentsDataToLocal(departments){
    window.localStorage.setItem('departments',JSON.stringify(departments));
}

export function getDepartmentsDatafromLocal(){
    const deps = JSON.parse(window.localStorage.getItem('departments'))
    return deps;
}