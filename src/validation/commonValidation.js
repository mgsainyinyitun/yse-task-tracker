export function isYseMail(email) {
    var idx = email.indexOf('@ysenpo.org');
    if (idx > -1) {
        return true;
    }
    return false;
}

export function checkEmpty(data) {
    if (data === "") {
        return "Field cannot be Empty!";
    } return true;
}