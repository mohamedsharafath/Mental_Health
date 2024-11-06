// SelfCareRoutine.js
import React, { useState } from 'react';
import './SelfCare.css'
const SelfCareRoutine = () => {
    const [activities, setActivities] = useState([
        { name: 'Journaling', selected: false, icon: '📓' },
        { name: 'Breathing Exercises', selected: false, icon: '🌬️' },
        { name: 'Art Therapy', selected: false, icon: '🎨' },
        { name: 'Meditation', selected: false, icon: '🧘' },
        { name: 'Outdoor Walk', selected: false, icon: '🚶' },
    ]);
    const [routine, setRoutine] = useState([]);

    const toggleActivity = (activity) => {
        setActivities(
            activities.map((act) =>
                act.name === activity.name ? { ...act, selected: !act.selected } : act
            )
        );
    };

    const handleSaveRoutine = () => {
        const selectedActivities = activities.filter((activity) => activity.selected);
        setRoutine(selectedActivities);
    };

    return (
        <div className="self-care-container">
            <h2>Build Your Self-Care Routine</h2>
            <p>Select activities to include in your daily routine:</p>

            <div className="activity-options">
                {activities.map((activity) => (
                    <div
                        key={activity.name}
                        className={`activity-option ${activity.selected ? 'selected' : ''}`}
                        onClick={() => toggleActivity(activity)}
                    >
                        <span className="activity-icon">{activity.icon}</span>
                        <span className="activity-name">{activity.name}</span>
                    </div>
                ))}
            </div>

            <button className="save-routine-btn" onClick={handleSaveRoutine}>Save Routine</button>

            {routine.length > 0 && (
                <div className="routine-summary">
                    <h3>Your Self-Care Routine:</h3>
                    <ul>
                        {routine.map((activity, index) => (
                            <li key={index}>
                                {activity.icon} {activity.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SelfCareRoutine;
