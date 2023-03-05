import { isYseMail } from "./commonValidation";

/** username => cannot empty */
export function validateUsername(username) {
    if (username === "") {
        return ({
            status: 1,
            message: 'Username cannot be Empty!',
        });
    }
    return { status: 0 }
}

/** email => should be yse email && cannot be empty */
export function validateEmail(email) {
    if (email === "") {
        return ({
            status: 1,
            message: 'E-mail cannot be Empty!',
        });
    } else if (!isYseMail(email)) {
        return ({
            status: 1,
            message: 'E-mail should be YSE email!',
        });
    }
    return { status: 0 }
}

/** phone => cannot empty */
export function validatePhone(phone) {
    if (phone === "") {
        return ({
            status: 1,
            message: 'Phone number cannot be Empty!',
        });
    }
    return { status: 0 }
}

/** department => cannot empty */
export function validateDepartment(department) {
    if (department === "") {
        return ({
            status: 1,
            message: 'Department cannot be Empty!',
        });
    }
    return { status: 0 }
}
/** position => cannot empty */
export function validatePosition(position) {
    if (position === "") {
        return ({
            status: 1,
            message: 'Position cannot be Empty!',
        });
    }
    return { status: 0 }
}

/** password & confirm password 
 *          =>   should be same
 *          =>   cannot empty */

export function validatePasswordEmpty(password) {
    if (password === "") {
        return ({
            status: 1,
            message: 'Password cannot be Empty!',
        });
    }
    return { status: 0 };
}

export function validateSamePassword(password, cpassword) {
    if (!(password === cpassword)) {
        return ({
            status: 1,
            message: 'Password and Confirm password must be same!',
        });
    }
    return { status: 0 };
}