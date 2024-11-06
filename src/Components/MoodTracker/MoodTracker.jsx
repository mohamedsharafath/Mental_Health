// MoodTracker.js
import React, { useState } from 'react';
import './MoodTracker.css'

const MoodTracker = () => {
    const [mood, setMood] = useState('');
    const [moodHistory, setMoodHistory] = useState([]);

    const moods = [
        { label: '😊 Happy', emoji: '😊', color: '#FFD700' },
        { label: '😐 Neutral', emoji: '😐', color: '#B0C4DE' },
        { label: '😔 Sad', emoji: '😔', color: '#87CEEB' },
        { label: '😠 Angry', emoji: '😠', color: '#FF6347' },
        { label: '😟 Anxious', emoji: '😟', color: '#FFB6C1' }
    ];

    const handleMoodClick = (selectedMood) => {
        setMood(selectedMood);
        setMoodHistory([...moodHistory, { mood: selectedMood, date: new Date() }]);
    };

    return (
        <div className="mood-tracker-container">
            <h2>Mood Tracker</h2>
            <p>How are you feeling today?</p>
            <div className="mood-options">
                {moods.map((moodOption) => (
                    <div
                        key={moodOption.label}
                        className="mood-option"
                        style={{ backgroundColor: moodOption.color }}
                        onClick={() => handleMoodClick(moodOption)}
                    >
                        <span className="mood-emoji">{moodOption.emoji}</span>
                        <span className="mood-label">{moodOption.label}</span>
                    </div>
                ))}
            </div>

            {mood && (
                <div className="mood-summary">
                    <h3>Today's Mood:</h3>
                    <p style={{ backgroundColor: mood.color }}>{mood.emoji} {mood.label}</p>
                </div>
            )}

            <div className="mood-history">
                <h3>Past Moods:</h3>
                {moodHistory.map((entry, index) => (
                    <div key={index} className="mood-history-item" style={{ backgroundColor: entry.mood.color }}>
                        <span>{entry.mood.emoji}</span>
                        <span>{entry.mood.label}</span>
                        <span>{entry.date.toLocaleDateString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoodTracker;
