import {s} from "./Calendar.style";
import {Text, TouchableOpacity, View} from "react-native";
import {CalendarWeek} from "./CalendarWeek";

export function CalendarMonth({week, month, year, onPress, currentDate, eventDate}) {

    function getWeeks(x) {
        x = x["Weeks"]
        return x
    }

    getWeeks(week);

    return (
        <View style={{justifyContent: "space-between", gap: 10}}>
            <CalendarWeek week={getWeeks(week)[0]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarWeek week={getWeeks(week)[1]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarWeek week={getWeeks(week)[2]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarWeek week={getWeeks(week)[3]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarWeek week={getWeeks(week)[4]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarWeek week={getWeeks(week)[5]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
        </View>
    );
}
