export function newDate() {
    return new Date();
}


export function getYear() {
    const d = newDate()

    return d.getFullYear();

}

export function getMonth() {
    
    const d = newDate()

    return d.getMonth()

}

export function getDay() {
    const d = newDate()

    return d.getDay();

}

export function getDate() {
    const d = newDate()

    return d.getDate();
}

export function getDayOne() {
    const d = newDate()
    const firstDay = new Date(d.getFullYear(), d.getMonth());
    return firstDay.getDay();
}

export function getLastDay() {
    const d = newDate()
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    return lastDay.getDay();
}

export function getEndDate() {
    const d = newDate()
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    return lastDay.getDate();
}