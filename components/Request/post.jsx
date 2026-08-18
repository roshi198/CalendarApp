import {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, FlatList, Text, View} from 'react-native';
import {Fetch} from "./fetch";

export let request_id = 0;
let listeners = [];

export const setRequestId = (val) => {
    request_id = val;
    listeners.forEach(l => l(val));
};

export const getRequestId = () => request_id;
export const subscribeRequestId = (listener) => {
    listeners.push(listener);
    return () => {
        listeners = listeners.filter(l => l !== listener);
    };
};

export const RequestPost = async (message, updateId, confirm, context) => {
    try {
        const response = await fetch(process.env.EXPO_PUBLIC_FETCH_ADDRESS+"room", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_prompt: message, 
                get_conversation: context,
                get_confirm: confirm
            })
        });

        const reqData = await response.json();
        updateId(reqData.id);

        if (response.ok) { // Check if the response status is OK (200-299)
            console.log(reqData); // Log the response data to the console
            Alert.alert("Post created at:", reqData.createdAt || "No timestamp"); // Show success alert with timestamp
        } else {
            console.error(reqData); // Log the error response to the console
            Alert.alert("Error", reqData.error || "Request failed"); // Show error alert
        }

    } catch (error) { // Catch any errors during the request
        console.error(error); // Log the error to the console
        Alert.alert("Error", "Something went wrong."); // Show generic error alert
    }
};

export const ResponsePost = async (message, updateId, context) => {
    try {
        const response = await fetch(process.env.EXPO_PUBLIC_FETCH_ADDRESS+"response", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_prompt: message, 
                get_conversation: context,
            })

        });

        const resData = await response.json();
        updateId(resData.id)
        {/*setRequestId(resData.id);*/}

        if (response.ok) { // Check if the response status is OK (200-299)
            console.log(resData); // Log the response data to the console
            Alert.alert("Post created at:", resData.createdAt || "No timestamp"); // Show success alert with timestamp
        } else {
            console.error(resData); // Log the error response to the console
            Alert.alert("Error", resData.error || "Request failed"); // Show error alert
        }

    } catch (error) { // Catch any errors during the request
        console.error(error); // Log the error to the console
        Alert.alert("Error", "Something went wrong."); // Show generic error alert
    }
};
