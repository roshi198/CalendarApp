import {s} from "./Calendar.style";
import {TouchableOpacity, View} from "react-native";
import {CalendarDay} from "./CalendarDay";

export function CalendarWeek({week, month, year, onPress, currentDate, eventDate}) {

    return <View style={{justifyContent: "center", flexDirection: "row", gap: 0}}>
            <CalendarDay day={week.Sun} month={month} year={year} onPressHandle={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarDay day={week.Mon} month={month} year={year} onPressHandle={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarDay day={week.Tues} month={month} year={year} onPressHandle={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarDay day={week.Wed} month={month} year={year} onPressHandle={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarDay day={week.Thurs} month={month} year={year} onPressHandle={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarDay day={week.Fri} month={month} year={year} onPressHandle={onPress} currentDate={currentDate} eventDate={eventDate}/>
            <CalendarDay day={week.Sat} month={month} year={year} onPressHandle={onPress} currentDate={currentDate} eventDate={eventDate}/>
    </View>
}
