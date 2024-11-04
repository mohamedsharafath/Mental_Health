import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './SpeechToT.css';
function SpeechToText() {
    const [transcript, setTranscript] = useState('');
    const { listening, resetTranscript } = useSpeechRecognition();

    // Start speech recognition
    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true });
    };

    // Stop speech recognition
    const stopListening = () => {
        SpeechRecognition.stopListening();
        setTranscript(transcript);  // Save transcript when stopping
    };

    // Reset transcript
    const handleReset = () => {
        resetTranscript();
        setTranscript('');  // Clear transcript state
    };

    // Add new text as SpeechRecognition updates
    React.useEffect(() => {
        setTranscript(SpeechRecognition.browserSupportsSpeechRecognition ? transcript : "Browser doesn't support speech recognition");
    }, [transcript]);

    return (
        <div className="speech-to-text">
            <h2>Speech to Text</h2>
            <p>Listening: {listening ? "Yes" : "No"}</p>
            <p>Transcript: {transcript}</p>
            <div className="controls">
                <button onClick={startListening}>Start</button>
                <button onClick={stopListening}>Stop</button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
}

export default SpeechToText;
