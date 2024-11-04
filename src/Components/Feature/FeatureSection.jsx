import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FeatureSection = () => {
    const [inputVisible, setInputVisible] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState(null);
    const [feature, setFeature] = useState('');
    const [featureName, setFeatureName] = useState('');
    const inputSectionRef = useRef(null);
    const navigate = useNavigate();

    const handleFeatureClick = (selectedFeature, featureDisplayName) => {
        const internalRoutes = {
            'group-therapy': '/group-therapy',
            'location-tracking': '/location-tracking',
            'multilingual': '/multilingual',
            'passwordless-authentication': '/passwordless-authentication',
            'voice-enabled': '/voice-enabled',
            'art-therapy': '/art-therapy'
        };

        if (internalRoutes[selectedFeature]) {
            navigate(internalRoutes[selectedFeature]);
        } else {
            setFeature(selectedFeature);
            setFeatureName(featureDisplayName);
            setInputVisible(true);
            inputSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const apiUrl =
                feature === 'detect-anxiety'
                    ? 'http://127.0.0.1:8000/predict_depression'
                    : feature === 'detect-suicide'
                    ? 'http://127.0.0.1:8000/predict_suicide'
                    : feature === 'detect-schizophrenia'
                    ? 'http://127.0.0.1:8000/predict_schizophrenia'
                    : "";

            if (apiUrl) {
                const res = await axios.post(apiUrl, {
                    statement: userInput
                });
                setResponse(res.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <div className="feature-container" id="feature-container">
            <div class="wave -one"></div>
          <div class="wave -two"></div>
          <div class="wave -three"></div>
                <div className="feature-container-heading">
                    <h1>Features</h1>
                    <p>Click on the buttons to access the feature &#10084;</p>
                </div>
                <div className="feature-cards row">
                    <button
                        className="feature col-md-3"
                        onClick={() => handleFeatureClick('detect-anxiety', 'Detect Depression / Anxiety')}
                    >
                        <p className="feature-icon">&#129504;</p>
                        <div className="feature-text">
                            <h2>Detect <br />Depression / Anxiety</h2>
                            <p>Input your text to analyze potential signs of depression or anxiety using our specialized detection model.</p>
                        </div>
                    </button>
                    <button
                        className="feature col-md-3"
                        onClick={() => handleFeatureClick('detect-suicide', 'Detect Suicide Intention')}
                    >
                        <p className="feature-icon">&#129504;</p>
                        <div className="feature-text">
                            <h2>Detect <br /> Suicide Intention</h2>
                            <p>Provide an input to assess for any indications of suicidal intent, offering early insights into mental health risks.</p>
                        </div>
                    </button>
                    <button
                        className="feature col-md-3"
                        onClick={() => handleFeatureClick('detect-schizophrenia', 'Detect Schizophrenia')}
                    >
                        <p className="feature-icon">&#129504;</p>
                        <div className="feature-text">
                            <h2>Detect Schizophrenia</h2>
                            <p>Upload a WhatsApp chat to evaluate content for markers of schizophrenia, anxiety, and depression, empowering informed mental health insights.</p>
                        </div>
                    </button>
                    <button
                        className="feature col-md-3"
                        onClick={() => handleFeatureClick('group-therapy', 'Group Therapy')}
                    >
                        <p className="feature-icon">&#129303;</p>
                        <div className="feature-text">
                            <h2>Group Therapy</h2>
                            <p>Access virtual support groups where individuals with similar experiences can connect, especially valuable for individuals with restricted group therapy access.</p>
                        </div>
                    </button>
                    <button
                        className="feature col-md-3"
                        onClick={() => handleFeatureClick('location-tracking', 'Real-Time Location Tracking')}
                    >
                        <p className="feature-icon">&#128205;</p>
                        <div className="feature-text">
                            <h2>Real-Time Location Tracking</h2>
                            <p>Enables caretakers and healthcare providers to monitor the location of patients, enhancing safety and support for behavioral management.</p>
                        </div>
                    </button>
                    <button
                        className="feature col-md-3"
                        onClick={() => handleFeatureClick('multilingual', 'Available in Regional Indian Languages')}
                    >
                        <p className="feature-icon">&#129309;</p>
                        <div className="feature-text">
                            <h2>Regional Language Support</h2>
                            <p>Our application is accessible in multiple regional languages, bridging language gaps and ensuring inclusivity across diverse communities.</p>
                        </div>
                    </button>
                    <button
                        className="feature col-md-3"
                        onClick={() => handleFeatureClick('passwordless-authentication', 'Passwordless Authentication')}
                    >
                        <p className="feature-icon">&#128273;</p>
                        <div className="feature-text">
                            <h2>Passwordless Authentication</h2>
                            <p>Supports password-free access to streamline login for individuals who may have memory impairments, providing a seamless and secure experience.</p>
                        </div>
                    </button>
                    <button
                        className="feature col-md-3"
                        onClick={() => handleFeatureClick('voice-enabled', 'Voice Enabled')}
                    >
                        <p className="feature-icon">&#128483;</p>
                        <div className="feature-text">
                            <h2>Voice Enabled</h2>
                            <p>Experience hands-free navigation with our voice assistant, tailored to support users with visual, motor, or technical challenges.</p>
                        </div>
                    </button>
                    <button
                        className="feature col-md-3"
                        onClick={() => handleFeatureClick('art-therapy', 'Art Therapy')}
                    >
                        <p className="feature-icon">&#127912;</p>
                        <div className="feature-text">
                            <h2>Art Therapy</h2>
                            <p>Engage in creative self-expression with our art therapy feature, designed to offer a calming and therapeutic experience.</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* Input Section with Feature Heading */}
            <div ref={inputSectionRef} className='feature-container'>
                {inputVisible && (
                    <div className="input-section feature-container">
                        <h2>{featureName}</h2>
                        <form onSubmit={handleSubmit} className="input-form">
                            <textarea
                                value={userInput}
                                onChange={handleInputChange}
                                placeholder="Enter your statement here..."
                                rows="4"
                                cols="50"
                                className="input-textarea"
                            />
                            <button type="submit" className="submit-button">Submit</button>
                        </form>
                        {response && (
                            <div className="response-container">
                                <h3 className="response-header">Response:</h3>
                                <p className="response-message">{response.message}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default FeatureSection;
