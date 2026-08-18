import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {request_id} from "./post";
import {useSyncExternalStore} from 'react';
import {subscribeRequestId, getRequestId} from './post';

let ext_responses

export let request_fetch = 0;
let listeners = [];

export const setRequestFetch = (val) => {
    request_fetch = val;
    listeners.forEach(l => l(val));
};

export const getFetchRequest = () => request_fetch;

export const subscribeFetchRequest = (listener) => {
    listeners.push(listener);
    return () => {
        listeners = listeners.filter(l => l !== listener);
    };
};

export const FetchResponse = () => {
    const requestId = useSyncExternalStore(subscribeRequestId, getRequestId);
    const [idResponse, setIdResponse] = useState(["", False, False]);

    useEffect(() => {
        if (requestId === 0) return;
        (async () => {
            try {
                const response = await fetch(process.env.REACT_APP_FETCH_ADDRESS + "req_json");
                const res_json = await response.json();
                const res_match = res_json.voice_requests.find(v => v.id === requestId);
                if (res_match) setIdResponse(res_match.ai_response, res_match.need_context, res_match.need_confirm)
                setRequestFetch(res_json)
            } catch (error) {
                console.error(error);
            }

        })();
    }, [requestId]);


    return (
        idResponse
    );

}

export const FetchExtraction = () => {
    const requestId = useSyncExternalStore(subscribeRequestId, getRequestId);
    const [idExtraction, setIdExtraction] = useState([0, 0, 0, 0, 0]);

    useEffect(() => {
        if (requestId === 0) return;
        (async () => {
            try {
                const extraction = await fetch(process.env.REACT_APP_FETCH_ADDRESS+"res_json");
                const ext_json = await extraction.json();
                const ext_match = ext_json.responses.find(v => v.id === requestId);
                if (ext_match) setIdExtraction([
                    (!ext_match.day ? "" : ext_match.day),
                    (!ext_match.month ? "" : ext_match.month),
                    (!ext_match.year ? "" : ext_match.year),
                    (!ext_match.hours ? "" : ext_match.hours),
                    (!ext_match.minutes ? "" : ext_match.minutes)]
                );
            } catch (error) {
                console.error(error);
            }

        })();
    }, [requestId]);


    return (
        idExtraction
    );

}

export function FetchAllExtraction() {
    (async () => {
        try {
            const extraction = await fetch(process.env.REACT_APP_FETCH_ADDRESS+"res_json");
            const ext_json = await extraction.json();
            ext_responses = ext_json.responses

        } catch (error) {
            console.error(error);
        }

    })();


    return (
        ext_responses
    );

}