export function isYseMail(email) {
    var idx = email.indexOf('@ysenpo.org');
    if (idx > -1) {
        return true;
    }
    return false;
}