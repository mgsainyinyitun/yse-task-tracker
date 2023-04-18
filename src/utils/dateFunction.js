import { Timestamp } from "firebase/firestore";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export function timestampToDateString(timestamp) {
    let dateForm = new Date(timestamp);
    let date = dateForm.getDate() + "/" + (dateForm.getMonth() + 1) + "/" + dateForm.getFullYear();
    return date;
}

export function formatDate({ seconds, nanoseconds }) {
    const date = new Date(0); // start with Unix epoch time (Jan 1, 1970)
    date.setSeconds(seconds);
    date.setMilliseconds(nanoseconds / 1000000); // convert nanoseconds to milliseconds
    const day = date.getDate();
    const month = date.getMonth() + 1; // add 1 to account for 0-indexed months
    const year = date.getFullYear();

    // pad day and month with leading zeros if needed
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');

    return `${formattedDay}/${formattedMonth}/${year}`; // DD/MM/YYYY
}

export function formatDateMothName({ seconds, nanoseconds }) {
    const date = new Date(0);
    date.setSeconds(seconds);
    date.setMilliseconds(nanoseconds / 1000000);
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const formattedDay = day.toString().padStart(2, '0');

    return `${month} ${formattedDay} ${year}`; // Month DD YYYY
}

export function timestampToIsoString(timestamp) {
    const date = new Timestamp(
        timestamp.seconds,
        timestamp.nanoseconds
    ).toDate();
    const isoString = date.toISOString();
    return isoString;
}

export function isoDateStringToDateString(isoDateString) {
    const date = new Date(isoDateString);
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });
    return formattedDate;
}

export function isoDateStringToFormattedDateString(isoDateString) {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${monthNames[monthIndex]} ${day}, ${year}`;
}