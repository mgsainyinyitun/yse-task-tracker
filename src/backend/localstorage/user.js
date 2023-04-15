export function setUserDataToLocal(user){
    window.localStorage.setItem('user',JSON.stringify(user));
}

export function getUserDataInLocal(){
    const user = JSON.parse(window.localStorage.getItem('user'))
    return user;
}

export function setUsersDataToLocal(users){
    window.localStorage.setItem('users',JSON.stringify(users));
}

export function getUsersDataInLocal(){
    const users = JSON.parse(window.localStorage.getItem('users'))
    return users;
}