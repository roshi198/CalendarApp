import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from "react-native";
import {Calendar} from "./components/Calendar/Calendar";
import {SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import {s} from "./App.style";
import React, {useState, useEffect} from "react";
import {Button} from "react-native-paper";
import {Fetch} from "./components/Request/fetch";
import {Post} from "./components/Request/post";
import {Dictaphone} from "./components/Speech/speech_recognition";

export let secret = process.env.REACT_APP_FETCH_ADDRESS

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1, justifyContent: "flex-start", alignItems: "center"}}>
                    <Calendar/>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
