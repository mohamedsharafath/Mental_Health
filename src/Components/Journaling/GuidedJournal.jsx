// GuidedJournal.js
import React, { useState } from 'react';
import './GuidedJournal.css'

const GuidedJournal = () => {
    const [journalEntry, setJournalEntry] = useState('');
    const [journalEntries, setJournalEntries] = useState([]);

    const handleInputChange = (event) => {
        setJournalEntry(event.target.value);
    };

    const handleSaveEntry = () => {
        if (journalEntry.trim()) {
            setJournalEntries([...journalEntries, { entry: journalEntry, date: new Date() }]);
            setJournalEntry('');
        }
    };

    return (
        <div className="journal-container">
            <h2>Guided Journaling</h2>
            <p>Take a moment to reflect. How are you feeling today?</p>
            <textarea
                value={journalEntry}
                onChange={handleInputChange}
                placeholder="Start writing here..."
                rows="4"
                cols="50"
            />
            <button onClick={handleSaveEntry}>Save Entry</button>
            <div className="journal-entries">
                <h3>Past Entries:</h3>
                {journalEntries.map((entry, index) => (
                    <div key={index} className="journal-entry">
                        <p>{entry.date.toLocaleDateString()} - {entry.entry}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GuidedJournal;
