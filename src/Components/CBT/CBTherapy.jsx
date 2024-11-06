import React from 'react';

const CBTExercises = () => {
    const exercises = [
        {
            prompt: "Identify a negative thought you had today. What evidence supports it? What evidence contradicts it?",
        },
        {
            prompt: "Take a deep breath and count to five. What feelings arise during this process?",
        },
        {
            prompt: "List three things you're grateful for today. How do these make you feel?",
        },
    ];

    return (
        <div className="cbt-section">
            <h2>Cognitive Behavioral Therapy Exercises</h2>
            <ul className="cbt-list">
                {exercises.map((exercise, index) => (
                    <li key={index} className="cbt-item">
                        <p>{exercise.prompt}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CBTExercises;
