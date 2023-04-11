// console.log("Date: "+ dateFormat.getDate()+
//            "/"+(dateFormat.getMonth()+1)+
//            "/"+dateFormat.getFullYear()+
//            " "+dateFormat.getHours()+
//            ":"+dateFormat.getMinutes()+
//            ":"+dateFormat.getSeconds());

export function timestampToDateString(timestamp){
    let dateForm = new Date(timestamp);
    let date = dateForm.getDate()+"/"+(dateForm.getMonth()+1)+"/"+dateForm.getFullYear();
    return date;
}