import {Text, TouchableOpacity, View, ScrollView, Animated, Modal, TextInput, Switch} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import {s} from "./Calendar.style";
import {updateCalendar} from "../../App";
import {newDate, getDayOne, getLastDay, getEndDate, getMonth, getYear} from "../../utils/date-time";
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import React, {useEffect, useState, useSyncExternalStore, useRef} from "react";
import {CalendarYear} from "./CalendarYear";
import {startListening, stopListening, GetTranscript, SendTranscript, GetResponse} from "../Speech/speech_recognition";
import {FetchAllExtraction, FetchExtraction, FetchResponse, getFetchRequest, subscribeFetchRequest} from "../Request/fetch";
import { AddEvent } from './AddEvent';

let date = new Date();
let currentMonth = true;
let currentYear = true;
let fixedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
let firstDate = getDayOne();
let month = getMonth();
let year = getYear();
let lastDate = getLastDay();
let endDate = getEndDate();
let listening = false;
let message = "";
let extData = {}

let response_list = ""

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const monthDays = [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
];
const monthLeapDays = [
    31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
];

const Sun = null;
const Mon = null;
const Tues = null;
const Wed = null;
const Thurs = null;
const Fri = null;
const Sat = null;

const currentMonthDays = monthDays[date.getMonth()];

let clickedDay = null;
let selectedDayElement = null;
let ext_responses
let dates = [];
let ext_dates = {};

 let initialCalendarWeeks = {id: null, Sun: null, Mon: null, Tues: null, Wed: null, Thurs: null, Fri: null, Sat: null}

let initialCalendarMonths = {id: null, Weeks: null}

let newCalendarWeeks = []

let newCalendarMonths = []

let ai_response
let need_confirm
let need_context
let event_context
let dayRes
let monthRes
let yearRes

export function Calendar() {
    const requestFetch = useSyncExternalStore(subscribeFetchRequest, getFetchRequest);
    const [eventInfo, setEventInfo] = React.useState(0);
    const [dayInfo, setDayInfo] = React.useState(0);
    const [monthInfo, setMonthInfo] = React.useState(0);
    const [yearInfo, setYearInfo] = React.useState(0);
    const [context, setContext] = React.useState("None");
    const [confirmInfo, setConfirmInfo] = React.useState(false);
    const [requestId, setRequestId] = React.useState(0);
    const [update, setUpdate] = React.useState(0);
    const [responseId, setResponseId] = React.useState(0);
    const [idResponse, setIdResponse] = React.useState(["", null, null]);
    const [RequestMessage, updateRequestMessage] = React.useState([]);
    const [ResponseMessage, updateResponseMessage] = React.useState([""]);

    const scrollRef = useRef(null)

    const [scrollPosition, setScrollPosition] = React.useState(0);

    const [modalVisible, setModalVisible] = React.useState(false);

    const [title, onChangeTitle] = React.useState('');

    const [startDate, onChangeStartDate] = React.useState('');
    
    const [startTime, onChangeStartTime] = React.useState('');

    const [finishDate, onChangeFinishDate] = React.useState('');

    const [finishTime, onChangeFinishTime] = React.useState('');

    const [isEnabled, setIsEnabled] = React.useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleScroll = () => {
        const position = scrollRef.contentOffset.y;
        setScrollPosition(position);
    };

    for (let m = 1; m <= 12; ++m){
        for (let w = 1; w <= 6; ++w){
            initialCalendarWeeks.id = w
            newCalendarWeeks.push(initialCalendarWeeks)
        }
        initialCalendarMonths.id = m
        initialCalendarMonths.Weeks = newCalendarWeeks[m - 1]
        newCalendarMonths.push(initialCalendarMonths)
    }

    const hasBeenRendered = useRef(false)

    const dontRender = useRef(false)

    useEffect(() => {
        if (scrollRef.current){
            scrollRef.current.scrollTo({x: 0, y: 370 * date.getMonth(), animated: true})
        }
    }, []);

    useEffect(() => {
        setModalVisible(modalVisible);
    }, []);

    useEffect(() => {
        updateCalendarWeeks(CalendarYearList[0]);
    }, []);

    useEffect(() => {
        if (hasBeenRendered.current){
            updateResponseInfo(ResponseMessage[""])
        }

        hasBeenRendered.current = true;
    }, [requestId, responseId]);

    useEffect(() => {
        if (!dontRender.current){
            updateCalendarEvents(CalendarEvents[""])
        }
        dontRender.currnet = true;
    }, []);

    const [CalendarWeeks, setCalendarWeeks] = React.useState([
        {id: 1, Sun: 0, Mon: 0, Tues: 0, Wed: 0, Thurs: 0, Fri: 0, Sat: 0},
        {id: 2, Sun: 0, Mon: 0, Tues: 0, Wed: 0, Thurs: 0, Fri: 0, Sat: 0},
        {id: 3, Sun: 0, Mon: 0, Tues: 0, Wed: 0, Thurs: 0, Fri: 0, Sat: 0},
        {id: 4, Sun: 0, Mon: 0, Tues: 0, Wed: 0, Thurs: 0, Fri: 0, Sat: 0},
        {id: 5, Sun: 0, Mon: 0, Tues: 0, Wed: 0, Thurs: 0, Fri: 0, Sat: 0},
        {id: 6, Sun: 0, Mon: 0, Tues: 0, Wed: 0, Thurs: 0, Fri: 0, Sat: 0}
    ]);

    const [CalendarMonths, setCalendarMonths] = React.useState([
        {id: 1, month: "January", year: null, Weeks: CalendarWeeks},
        {id: 2, month: "February", year: null, Weeks: CalendarWeeks},
        {id: 3, month: "March", year: null, Weeks: CalendarWeeks},
        {id: 4, month: "April", year: null, Weeks: CalendarWeeks},
        {id: 5, month: "May", year: null, Weeks: CalendarWeeks},
        {id: 6, month: "June", year: null, Weeks: CalendarWeeks},
        {id: 7, month: "July", year: null, Weeks: CalendarWeeks},
        {id: 8, month: "August", year: null, Weeks: CalendarWeeks},
        {id: 9, month: "September", year: null, Weeks: CalendarWeeks},
        {id: 10, month: "October", year: null, Weeks: CalendarWeeks},
        {id: 11, month: "November", year: null, Weeks: CalendarWeeks},
        {id: 12, month: "December", year: null, Weeks: CalendarWeeks},
    ]);

    const [CalendarYearList, setCalendarYear] = React.useState([
        {id: 0, Months: CalendarMonths, year: null}
    ]);

    const [CalendarEvents, setCalendarEvents] = React.useState([]);

    const [openDay, getOpenDay] = React.useState();

    function renderCalendarMonths(y, m) { 
        date.setMonth(m)
        date.setFullYear(y)
        date.setDate(1)

        firstDate = date.getDay()
        lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        lastDate = lastDate.getDay()
        endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
        endDate = endDate.getDate()

        if (date.getMonth() === fixedDate.getMonth()) {
            currentMonth = true;
        } else {
            currentMonth = false;
        }

        if (date.getFullYear() === fixedDate.getFullYear()) {
            currentYear = true;
        } else {
            currentYear = false;
        }

        let monthsList = []
        

        return CalendarYearList.map((m) => (
                <CalendarYear key={m.id} week={m} monthsList={monthsList} month={date.getMonth() + 1} year={date.getFullYear()} onPress={getOpenDay} currentDate={[currentMonth, currentYear, fixedDate.getDate()]} eventDate={CalendarEvents}/>
            )
        );
    }

    function updateCalendarEvents(e) {
        (async () => {
        try {
            const extraction = await fetch(process.env.EXPO_PUBLIC_FETCH_ADDRESS+"res_json");
            const ext_json = await extraction.json();
            ext_responses = ext_json.responses
            let month
            let year
            let day
            let context_info

            for (let i = 0; i < ext_responses.length; ++i){

                month = Number(ext_responses[i].month)
                year = Number(ext_responses[i].year)
                day = Number(ext_responses[i].day)
                context_info = Number(ext_responses[i].context)

                if (month === 0 || year === 0){
                    month = fixedDate.getMonth() + 1
                    year = fixedDate.getFullYear()
                }

                    console.log(context_info)
                    console.log(confirm)
                
                        if (context_info === 1){
                            let event_mod = 0
                            dates.push([month, year, day, event_mod])
                            console.log("Event added.")
                        }
                        else if (context_info === 2){
                            for (let i = 0; i < dates.length; ++i){
                                if (dates[i][2] === day && dates[i][1] === year && dates[i][0] === month){
                                    dates.splice(i, 1)
                                    console.log("Event removed.")
                            }
                            }
                        }
                        else {
                            let event_mod = 1
                            for (let i = 0; i < dates.length; ++i){
                                if (dates[i][2] === day && dates[i][1] === year && dates[i][0] === month){
                                    dates.splice(i, 1, [month, year, day, event_mod])
                                    console.log("Event modified.")
                            }
                            }
                        }
                }
            
            setCalendarEvents(dates)

        } catch (error) {
            console.error(error);
        }

    })();
    }

    function updateResponseInfo(r) {

        (async () => {
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_FETCH_ADDRESS+"req_json");
            const res_json = await response.json();
            const res_match = res_json.voice_requests.find(v => v.id === requestId);
            if (res_match) setIdResponse(res_match.ai_response)

            console.log(res_match.ai_response)
                
            ai_response = res_match.ai_response
            need_context = Boolean(res_match.need_context)
            need_confirm = Boolean(res_match.need_confirm)
            event_context = Number(res_match.event_context)
            dayRes = res_match.day
            monthRes = res_match.month
            yearRes = res_match.year

            console.log("Event context: " + event_context)

            response_list += "{User Message: " + RequestMessage + "} {AI Message: " + ai_response + "}\n"

            setDayInfo(Number(dayRes))
            setMonthInfo(Number(monthRes))
            setYearInfo(Number(yearRes))

            if (need_confirm){
                setConfirmInfo(true)
                setContext(response_list)
                setEventInfo(3)
                console.log("confirm:" + need_confirm)
            }
            else if (need_context || (need_context && need_confirm)){
                setConfirmInfo(false)
                setContext(response_list)
                setEventInfo(3)
            }
            else{
                setConfirmInfo(false)
                setContext("None")
                setEventInfo(Number(event_context))
            }
            
            updateResponseMessage(ai_response)
            setUpdate(update + 1)

        } catch (error) {
            console.error(error);
        }

        try {
            const extraction = await fetch(process.env.EXPO_PUBLIC_FETCH_ADDRESS+"res_json");
            const ext_json = await extraction.json();
            ext_responses = ext_json.responses
            let month
            let year
            let day
            let context_info

            console.log(need_confirm)
            console.log(need_context)
            console.log(event_context)
            console.log(dayInfo)
            console.log(monthInfo)
            console.log(yearInfo)

            if (month === 0 || year === 0){
                setMonthInfo(fixedDate.getMonth() + 1)
                setYearInfo(fixedDate.getFullYear())
            }

            if (!need_confirm && !need_context && event_context === 1){
                let event_mod = 0
                dates.push([monthInfo, yearInfo, dayInfo, event_mod])
                console.log("Event added.")
            }
            else if (!need_confirm && !need_context && event_context === 2){
                for (let i = 0; i < dates.length; ++i){
                    if (dates[i][2] === dayInfo && dates[i][1] === yearInfo && dates[i][0] === monthInfo){
                        console.log(dates[i])
                        dates.splice(i, 1)
                        console.log("Event removed.")
                        
                }
                }
            }
            else if (!need_confirm && !need_context && event_context === 3) {
                let event_mod = 1
                for (let i = 0; i < dates.length; ++i){
                    if (dates[i][2] === dayInfo && dates[i][1] === yearInfo && dates[i][0] === monthInfo){
                        dates.splice(i, 1, [month, year, day, event_mod])
                        console.log("Event modified.")
                }
                }
            }
                
            setCalendarEvents(dates)

        } catch (error) {
            console.error(error);
        }

    })();
    }

    function updateCalendarWeeks(w) {
        let updatedCalendarMonthsList = [...CalendarMonths];
        let updatedCalendarYearList = [...CalendarYearList];

        console.log("Hi")

        for (let m = 0; m < 12; ++m){
            const updatedCalendarWeeks = {
                ...w,
                Sun: 8,
                Mon: 9,
                Tues: 10,
                Wed: 11,
                Thurs: 12,
                Fri: 13,
                Sat: 14,
            };
            let initialWeekOne = [];
            let initialWeekFive = [];
            let initialWeekSix = [];
            let dayCounter = 0;
            let addWeekFive = true;
            let addWeekSix = true;
            
            let firstDate = new Date(date.getFullYear(), m)
            firstDate = firstDate.getDay()
            let lastDate = new Date(date.getFullYear(), m + 1, 0)
            lastDate = lastDate.getDay();
            let endDate = new Date(date.getFullYear(), m + 1, 0)
            endDate = endDate.getDate();
            
            for (let i = 0; i <= 6; i++) {
                if (firstDate !== i) {
                    initialWeekOne.push(null)
                } else {
                    dayCounter++
                    initialWeekOne.push(dayCounter);
                    break;
                }
            }
            for (let i = firstDate; i <= 6; ++i) {
                dayCounter++
                initialWeekOne.push(dayCounter);
            }

            let updatedWeekOne = {
                ...w,
                Sun: initialWeekOne[0],
                Mon: initialWeekOne[1],
                Tues: initialWeekOne[2],
                Wed: initialWeekOne[3],
                Thurs: initialWeekOne[4],
                Fri: initialWeekOne[5],
                Sat: initialWeekOne[6],
            };
            initialWeekOne = []
            let updatedWeekTwo = {
                ...w,
                Sun: dayCounter++,
                Mon: dayCounter++,
                Tues: dayCounter++,
                Wed: dayCounter++,
                Thurs: dayCounter++,
                Fri: dayCounter++,
                Sat: dayCounter++,
            };
            let updatedWeekThree = {
                ...w,
                Sun: dayCounter++,
                Mon: dayCounter++,
                Tues: dayCounter++,
                Wed: dayCounter++,
                Thurs: dayCounter++,
                Fri: dayCounter++,
                Sat: dayCounter++,
            };

            let updatedWeekFour = {
                ...w,
                Sun: dayCounter++,
                Mon: dayCounter++,
                Tues: dayCounter++,
                Wed: dayCounter++,
                Thurs: dayCounter++,
                Fri: dayCounter++,
                Sat: dayCounter++,
            };
            for (let i = 0; i <= 6; i++) {
                if (lastDate === 0 && endDate === 28){
                    initialWeekFive.push(dayCounter)
                    addWeekSix = false;
                    break
                }

                if (lastDate === 0 && endDate === 29){
                    initialWeekFive.push(dayCounter)
                    addWeekSix = false;
                    break
                }

                else if (lastDate !== i || lastDate === 0) {
                    initialWeekFive.push(dayCounter)
                    ++dayCounter;

                } else if (lastDate === i && dayCounter > endDate) {
                    addWeekFive = false;
                    break

                } else if (lastDate === i && dayCounter === endDate) {
                    initialWeekFive.push(dayCounter);
                    initialWeekFive.push(null);
                    addWeekSix = false;
                    break
                    
                } else {
                    initialWeekFive.push(dayCounter)
                    ++dayCounter;
                }
            }
            if (addWeekFive === false) {
                initialWeekFive = []
            }
            let updatedWeekFive = {
                ...w,
                Sun: initialWeekFive[0],
                Mon: initialWeekFive[1],
                Tues: initialWeekFive[2],
                Wed: initialWeekFive[3],
                Thurs: initialWeekFive[4],
                Fri: initialWeekFive[5],
                Sat: initialWeekFive[6],
            };
            initialWeekFive = []

            if (dayCounter <= endDate && addWeekSix !== false) {
                for (let i = 0; i <= 6; ++i) {
                    if (lastDate !== i) {
                        initialWeekSix.push(dayCounter)
                        ++dayCounter;
                    } else if (lastDate === i) {
                        initialWeekSix.push(dayCounter);
                        initialWeekSix.push(null);
                        break
                    }
                }
            } else {
                initialWeekSix = {}
            }

            let updatedWeekSix = {
                ...w,
                Sun: initialWeekSix[0],
                Mon: initialWeekSix[1],
                Tues: initialWeekSix[2],
                Wed: initialWeekSix[3],
                Thurs: initialWeekSix[4],
                Fri: initialWeekSix[5],
                Sat: initialWeekSix[6],
            }
            initialWeekSix = []
            let updatedCalendarWeeksList = [...CalendarWeeks];

            let indexToUpdate = updatedCalendarWeeksList.findIndex(
                (t) => t.id === updatedWeekOne.id,
            );
            updatedCalendarWeeksList[0] = updatedWeekOne;
            updatedCalendarWeeksList[1] = updatedWeekTwo;
            updatedCalendarWeeksList[2] = updatedWeekThree;
            updatedCalendarWeeksList[3] = updatedWeekFour;
            updatedCalendarWeeksList[4] = updatedWeekFive;
            updatedCalendarWeeksList[5] = updatedWeekSix;

            updatedCalendarMonthsList[m].Weeks = updatedCalendarWeeksList;
            updatedCalendarYearList[0].Months = updatedCalendarMonthsList

            dayCounter = 0;
            updatedWeekOne = []
            updatedWeekTwo = []
            updatedWeekThree = []
            updatedWeekFour = []
            updatedWeekFive = []
            updatedWeekSix = []
            updatedCalendarWeeksList = []
        }
        setCalendarYear(updatedCalendarYearList);
    }

    return (<View style={s.container}>
        <View style={s.avatar}>
            <View style={s.boxFlex}>
                <View style={{padding: 0, alignSelf: 'center'}}>
                    <TouchableOpacity onPress={() => {
                        renderCalendarMonths(date.getFullYear() - 1, date.getMonth());
                        updateCalendarWeeks()
                    }}>
                        <AntDesign name="left-circle" size={30} color="green"/>
                    </TouchableOpacity>
                </View>
                <Text style={s.yearText}>{date.getFullYear()}</Text>
                <View style={{padding: 1, alignSelf: 'center'}}>
                    <TouchableOpacity onPress={() => {
                        renderCalendarMonths(date.getFullYear() + 1, date.getMonth());
                        updateCalendarWeeks();
                    }}>
                        <AntDesign name="right-circle" size={30} color="green"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={s.header}>
                <View style={s.boxFlex}>
                    <View style={{padding: 15, alignSelf: 'center'}}>
                        <TouchableOpacity onPress={() => {
                            renderCalendarMonths(date.getFullYear(), date.getMonth() - 1);
                            updateCalendarWeeks()
                            scrollRef.current.scrollTo({x: 0, y: 370 * date.getMonth(), animated: true})
                        }}>
                            <AntDesign name="left-circle" size={30} color="green"/>
                        </TouchableOpacity>
                    </View>
                    <Text style={s.headerText}>{months[date.getMonth()]}</Text>
                    <View style={{padding: 15, alignSelf: 'center'}}>
                        <TouchableOpacity onPress={() => {
                            renderCalendarMonths(date.getFullYear(), date.getMonth() + 1);
                            updateCalendarWeeks()
                            scrollRef.current.scrollTo({x: 0, y: 370 * date.getMonth(), animated: true})
                        }}>
                            <AntDesign name="right-circle" size={30} color="green"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{padding: 15, alignSelf: 'center'}}>
                <TouchableOpacity onPress={() => {
                    renderCalendarMonths(fixedDate.getFullYear(), fixedDate.getMonth());
                    updateCalendarWeeks()
                    scrollRef.current.scrollTo({x: 0, y: 370 * date.getMonth(), animated: true})
                }}>
                    <Text style={s.subheaderText}>Jump to Today</Text>
                </TouchableOpacity>
            </View>
            <Text style={s.dayName}>S M T W T F S</Text>
                <View style={{maxHeight:"100%"}}>
                    <ScrollView 
                        ref={scrollRef} 
                        style={s.scrollViewWindow}
                        onMomentumScrollEnd={ event => { 
                            let position = event.nativeEvent.contentOffset.y
                            console.log(position)
                            if (position < 3899) {
                                renderCalendarMonths(date.getFullYear(), (position / 370));
                            }
                            else{
                                renderCalendarMonths(date.getFullYear(), 11);
                            }
                            updateCalendarWeeks()
                        }}
                        contentContainerStyle={s.scrollableContent}
                        decelerationRate="fast" 
                        snapToInterval={370} 
                        snapToAlignment="start"
                    >
                        <View style={{flexDirection: "column"}}>
                            {renderCalendarMonths(date.getFullYear(), date.getMonth())}
                        </View>
                        <View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{alignItems: 'center', paddingTop: 20, paddingLeft: 80, justifyContent: "center", flexDirection: "row", gap: 30}}>
                    <TouchableOpacity onPress={async () => {
                        if (listening === false) {
                            listening = true;
                            console.log(listening);
                            startListening()

                        } else {
                            listening = false;
                            console.log(listening);
                            stopListening()
                        }
                    }}>
                        <SimpleLineIcons name="microphone" size={60} color="green"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async () => {
                        setModalVisible(true)
                    }}>
                        <AntDesign name="plus-circle" size={50} color="green" />
                    </TouchableOpacity>
                <View style={{alignItems: 'center', paddingTop: 0}}>
                    <SendTranscript updateRequestMessage={updateRequestMessage} setRequestId={setRequestId} setResponseId={setResponseId} confirm={confirmInfo} context={context}/>
                    <View style={{flex: 1, padding: 24}}>
                    </View>
                </View>
            </View>
            <View style={{alignItems: "center", gap: 10}}>
                <Text style={{textAlign: 'center'}}>
                        <GetTranscript/>
                        {"\n" + ResponseMessage}
                </Text>
            </View>
        </View>
        <Modal
            animationType="slide"
            allowSwipeDismissal={true}
            presentationStyle="formSheet"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
          }}
        >
            <View style={s.modalCenter}>
                <View style={s.eventBox}>
                    <View style={{flexDirection: "row", paddingTop: 20, justifyContent: "space-between"}}>
                        <TouchableOpacity onPress={async () => {
                            setModalVisible(false)
                        }}>
                            <Text style={s.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 20, fontWeight: "bold", alignSelf: "center", color: "gray"}}>New Event</Text>
                        <TouchableOpacity onPress={async () => {
                            setModalVisible(false)
                        }}>
                            <Text style={s.addText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingTop: 20}}>
                        <TextInput
                            style={s.rowBorder}
                            onChangeText={onChangeTitle}
                            placeholderTextColor="grey"
                            value={title}
                            placeholder="Title"
                            keyboardType="default"
                        />
                        <View style={s.rowBorder}>
                            <Text style={{fontSize: 15, alignSelf: "flex-start", color: "gray"}}>Automate Event with AI</Text>
                            <Switch
                                style={{alignSelf: "center"}}
                                trackColor={{false: '#767577', true: 'green'}}
                                thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        <View style={s.rowBorder}>
                            <Text style={{fontSize: 15, alignSelf: "flex-start", color: "gray"}}>All-day</Text>
                            <Switch
                                style={{alignSelf: "center"}}
                                trackColor={{false: '#767577', true: 'green'}}
                                thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        <View style={s.rowBorder}>
                            <Text style={{fontSize: 15, alignSelf: "flex-start", color: "gray"}}>Starts</Text>
                            <TextInput
                                style={s.rowSelectBorder}
                                onChangeText={onChangeStartDate}
                                autoComplete="birthdate-full"
                                placeholderTextColor="grey"
                                value={startDate}
                                placeholder="Date"
                                keyboardType="number-pad"
                            />
                            <TextInput
                                style={s.rowSelectBorder}
                                onChangeText={onChangeStartTime}
                                placeholderTextColor="grey"
                                value={startTime}
                                placeholder="Time"
                                keyboardType="number-pad"
                            />
                        </View>
                        <View style={s.rowBorder}>
                            <Text style={{fontSize: 15, alignSelf: "flex-start", color: "gray"}}>Ends</Text>
                            <TextInput
                                style={s.rowSelectBorder}
                                onChangeText={onChangeFinishDate}
                                placeholderTextColor="grey"
                                value={finishDate}
                                placeholder="Date"
                                keyboardType="number-pad"
                            />
                            <TextInput
                                style={s.rowSelectBorder}
                                onChangeText={onChangeFinishTime}
                                placeholderTextColor="grey"
                                value={finishTime}
                                placeholder="Time"
                                keyboardType="number-pad"
                            />
                        </View>
                    </View>
                </View>
            </View>

        </Modal>
    </View> )
}