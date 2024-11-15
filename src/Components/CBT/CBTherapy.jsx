import React, { useState, useEffect } from 'react';
import './CBTherapy.css';


const CBTExercises = () => {
    const allExercises = [
        { prompt: "Identify a negative thought you had today. What evidence supports it? What evidence contradicts it?" },
        { prompt: "Take a deep breath and count to five. What feelings arise during this process?" },
        { prompt: "List three things you're grateful for today. How do these make you feel?" },
        { prompt: "Describe a recent event that made you feel happy or proud. Why was it meaningful to you?" },
        { prompt: "Think about a recent stressful situation. How did you respond, and what could you do differently next time?" },
        { prompt: "Write about a recent conversation that went well. What made it positive, and how did it make you feel?" },
        { prompt: "Identify one positive quality you admire in yourself. Why is this quality important to you?" },
        { prompt: "List three things you’re looking forward to. How do these things make you feel?" },
        { prompt: "Describe a goal you've achieved recently. What steps did you take, and what did you learn from it?" },
        { prompt: "Recall a time when you helped someone. How did it make you feel, and what impact did it have on them?" },
        { prompt: "Think about a challenge you’ve faced recently. How did you overcome it, and what strengths did you use?" },
        { prompt: "Identify a habit you'd like to improve. What small steps can you take to start working on it?" },
        { prompt: "List three things you can do to take care of yourself today. How will these actions benefit you?" },
        { prompt: "Describe a moment when you felt calm and relaxed. What were you doing, and how can you recreate it?" },
        { prompt: "Write about a time when you forgave yourself or someone else. How did forgiveness affect you?" },
        { prompt: "Think of a mistake you made recently. What did you learn from it, and how can you grow from it?" },
        { prompt: "Describe a place where you feel safe and peaceful. What elements of this place contribute to that feeling?" },
        { prompt: "Write about a person who supports you. How does their support impact your life?" },
        { prompt: "Identify a personal value you hold. How does this value guide your actions and choices?" },
        { prompt: "Think about something you can control today. How will focusing on it help you feel more balanced?" },
        { prompt: "Recall a recent situation that made you feel anxious. What thoughts were going through your mind?" },
        { prompt: "Identify a positive thought that could help you cope with stress today. How does it make you feel?" },
        { prompt: "Think about a time you felt proud of yourself. What did you accomplish, and why is it meaningful to you?" },
        { prompt: "Write down three small things you can do today to take care of your mental health." },
        { prompt: "Describe a recent act of kindness you witnessed or performed. How did it impact you or others?" },
        { prompt: "Think about something that has been challenging lately. What are some strengths you can use to tackle it?" },
        { prompt: "Write about a time when you faced rejection or failure. What did you learn from the experience?" },
        { prompt: "Identify one area of your life you’d like to improve. What steps can you take to start working on it?" },
        { prompt: "Reflect on a recent interaction where you felt understood. What made you feel that way?" },
        { prompt: "Describe a healthy boundary you'd like to set. How will it benefit you?" },
        { prompt: "Write about a recent dream or aspiration. How does this goal align with your personal values?" },
        { prompt: "List three qualities you appreciate about yourself and why they matter to you." },
        { prompt: "Think about a time when you felt peace and contentment. What were the circumstances?" },
        { prompt: "Identify something you can let go of today. How would releasing this improve your life?" },
        { prompt: "Recall a person who has had a positive influence on you. What did you learn from them?" },
        { prompt: "Describe a memory that makes you laugh. Why is it meaningful, and how does it make you feel?" },
        { prompt: "Write about a fear you’ve overcome. How did you manage it, and what did you learn from the experience?" },
        { prompt: "Think about a time you felt very connected to someone. What contributed to that connection?" },
        { prompt: "Identify a recent decision you made. What factors influenced your choice, and are you happy with it?" },
        { prompt: "Describe a time when you practiced self-compassion. How did it affect your mood or outlook?" }
    ];

    const getRandomExercises = (exercisesArray, count) => {
        const shuffled = [...exercisesArray].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const [exercises, setExercises] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isEditing, setIsEditing] = useState({});

    useEffect(() => {
        setExercises(getRandomExercises(allExercises, 5));
    }, []);

    const handleAnswerChange = (index, answer) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [index]: answer,
        }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const toggleEdit = (index) => {
        setIsEditing(prev => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="cbt-container">
            <h2 className="cbt-header">Cognitive Behavioral Therapy Exercises</h2>
            <ul className="cbt-exercise-list">
                {exercises.map((exercise, index) => (
                    <li key={index} className="cbt-exercise-item">
                        <p className="cbt-prompt">{exercise.prompt}</p>
                        <textarea
                            className="cbt-textarea"
                            placeholder="Type your answer here..."
                            value={answers[index] || ''}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                            disabled={submitted}
                        />
                    </li>
                ))}
            </ul>
            {!submitted && (
                <button className="cbt-submit-button" onClick={handleSubmit}>
                    Submit Answers
                </button>
            )}
            {submitted && (
                <div className="cbt-answers-section">
                    <h3 className="cbt-answers-header">Your Submitted Answers</h3>
                    <ul className="cbt-answers-list">
                        {exercises.map((exercise, index) => (
                            <li key={index} className="cbt-answer-item">
                                <p className="cbt-answer-prompt">
                                    <strong>Question:</strong> {exercise.prompt}
                                </p>
                                <div className="cbt-answer-container">
                                    <textarea
                                        className="cbt-edit-textarea"
                                        value={answers[index] || ''}
                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                        disabled={!isEditing[index]}
                                    />
                                    <button className="cbt-edit-button" onClick={() => toggleEdit(index)}>
                                        <span role="img" aria-label="edit">🖊️</span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="cbt-thank-you">Answers saved! Click the pen icon to edit your answers.</p>
                </div>
            )}
        </div>
    );
};

export default CBTExercises;