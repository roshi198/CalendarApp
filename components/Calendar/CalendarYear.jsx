import {s} from "./Calendar.style";
import {TouchableOpacity, View} from "react-native";
import {CalendarMonth} from "./CalendarMonth";

export function CalendarYear({week, monthsList, month, year, onPress, currentDate, eventDate}) {

    function getMonths(x) {
        x = x["Months"]
        return x
    }

    return (
        <View style={{flexDirection: 'column', padding: 10, gap: 20}}>
            <CalendarMonth week={getMonths(week)[0]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarMonth week={getMonths(week)[1]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarMonth week={getMonths(week)[2]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarMonth week={getMonths(week)[3]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarMonth week={getMonths(week)[4]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarMonth week={getMonths(week)[5]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarMonth week={getMonths(week)[6]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarMonth week={getMonths(week)[7]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarMonth week={getMonths(week)[8]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarMonth week={getMonths(week)[9]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarMonth week={getMonths(week)[10]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarMonth week={getMonths(week)[11]} month={month} year={year} onPress={onPress} currentDate={currentDate} eventDate={eventDate}/>
        </View>
        );
}
