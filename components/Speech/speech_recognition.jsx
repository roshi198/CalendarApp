import react, {useEffect, useState} from 'react';
import {ExpoSpeechRecognitionModule, useSpeechRecognitionEvent} from "expo-speech-recognition";
import {RequestPost, request_id, ResponsePost} from "../Request/post";
import {Fetch} from "../Request/fetch";
import {postFetch} from "../Request/fetch_post";

let transcript_message = "";

export function startListening() {
    const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }
    }
    
    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      continuous: false,
    });

    console.log(`Microphone on.`);
}

export function stopListening() {

    const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }
    }
    ExpoSpeechRecognitionModule.stop()
    console.log(`Microphone off.`);
}

function TranscribeAudioFile() {
    const [transcription, setTranscription] = useState("");

    const handleTranscribe = () => {
    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      requiresOnDeviceRecognition: Platform.OS === "ios",
      audioSource: {
        uri: "file:///path/to/audio.wav",
        audioChannels: 1,
        audioEncoding: AudioEncodingAndroid.ENCODING_PCM_16BIT,
        sampleRate: 16000,
        chunkDelayMillis: undefined,
      },
    });
    }

    useSpeechRecognitionEvent("result", (ev) => {
    setTranscription(ev.results[0]?.transcript || "");
  });

  return (
    transcription
  )
  
}

export function GetTranscript() {

    transcript_message = TranscribeAudioFile();
    return (
        transcript_message
    )
}

export function SendTranscript({updateRequestMessage, setRequestId, setResponseId, confirm, context}) {

    let transcript = TranscribeAudioFile();

    const [recognizing, setRecognizing] = useState(false);

    useSpeechRecognitionEvent("start", () => setRecognizing(true));
    useSpeechRecognitionEvent("end", () => setRecognizing(false));

    useEffect(() => {
        // fires when listening stops (auto-stop happens with continuous: false after a pause)
        if (!recognizing && transcript !== '') {
            RequestPost(transcript, setRequestId, confirm, context).catch(console.error);
            ResponsePost(transcript, setResponseId, confirm, context).catch(console.error);

            updateRequestMessage(transcript)

        }
    }, [recognizing]);
}

export function GetResponse() {
    Fetch()
}