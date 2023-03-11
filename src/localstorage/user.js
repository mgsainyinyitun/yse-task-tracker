export function setUserDataToLocal(user){
    window.localStorage.setItem('user',JSON.stringify(user));
}

export function getUserDataInLocal(){
    const user = JSON.parse(window.localStorage.getItem('user'))
    return user;
}