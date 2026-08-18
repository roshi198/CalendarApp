import {s} from "./Calendar.style";
import {Pressable, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export function CalendarDay({day, month, year, currentDate, eventDate, onPressHandle}) {

    let box;

    let returnCurrDay = false;
    if (day !== currentDate[2] || currentDate[0] === false || currentDate[1] === false) {

        box = s.box1
        
        for (let i = 0; i < eventDate.length; i++){
            if (month == eventDate[i][0] && year == eventDate[i][1] && day == eventDate[i][2]){
                if (eventDate[i][3] === 0){
                    box = s.box3

                }
                else if (eventDate[i][3] === 1){
                    box = s.box4
                }
            }
        }

    } else if (day === currentDate[2] && true === currentDate[1] && currentDate[0] === true) {
        box = s.box2
    }

    return (
        <TouchableOpacity>
            <View style={box}>
                <Text style={s.numbers}>
                    {day}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
