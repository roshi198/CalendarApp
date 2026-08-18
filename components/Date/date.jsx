import {Text, View} from "react-native";
import {
    getDate,
    getMonth,
    getYear,
    getDay,
    getDayOne,
    getLastDay
} from "../../utils/date-time";

export function Year() {
    return (
        <Text>{getYear()}</Text>
    );
}

export function Month() {
    return (
        <Text>{getMonth()}</Text>
    );
}

export function Day() {
    return (
        <Text>{getDay()}</Text>
    );
}

export function CurrentDay() {
    return (
        <Text>{getDate()}</Text>
    );
}

export function FirstDate() {
    return (
        <Number>{getDayOne()}</Number>
    );
}

export function LastDate() {

    return (
        <Text>{getLastDay()}</Text>
    );
}
