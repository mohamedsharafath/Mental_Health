import React from 'react';
import { useState } from 'react';
import axios from 'axios';
const FeatureSection = () => {
    const [inputVisible, setInputVisible] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState(null);
    const [feature, setFeature] = useState(''); // Track which feature is active

    const handleFeatureClick = (selectedFeature) => {
        setFeature(selectedFeature); // Set the current feature
        setInputVisible(true); // Show the input section for the selected feature
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        try {
            const apiUrl =
                feature === 'detect-anxiety'
                    ? 'http://127.0.0.1:8000/predict_depression'  // API for anxiety detection
                    : feature === 'detect-suicide'
                    ? 'http://127.0.0.1:8000/predict_suicide'  // API for suicide detection
                    :  feature === 'detect-schizophrenia'
                    ? 'http://127.0.0.1:8000/predict_schizophrenia'
                    : "";

            if (apiUrl) {
                const res = await axios.post(apiUrl, {
                    statement: userInput
                });
                setResponse(res.data); // Set response from the API
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
        <div className="feature-container" id="feature-container">
            <div className="feature-container-heading">
                <h1>Features</h1>
                <p>Click on the buttons to access the feature &#10084;</p>
            </div>
            <div class="wave -one"></div>
          <div class="wave -two"></div>
          <div class="wave -three"></div>

            <div className="feature-cards row">

                    <button className="feature col-md-3" onClick={() => handleFeatureClick('detect-anxiety')}>
                        <p className="feature-icon">&#129504;</p>
                        <div className="feature-text">
                            <h2>Detect <br />Depression / Anxiety</h2>
                            <p>Enter your input to understand whether there are traces of Anxiety.</p>
                        </div>
                    </button>

                    <button className="feature col-md-3" onClick={() => handleFeatureClick('detect-suicide')}>
                        <p className="feature-icon">&#129504;</p>
                        <div className="feature-text">
                            <h2>Detect <br /> Suicide Intention</h2>
                            <p>Enter your input to understand whether there are traces of Suicide Intention.</p>
                        </div>
                    </button>

                    <button className="col-md-3 feature" onClick={() => handleFeatureClick('detect-schizophrenia')}>
                        <p className="feature-icon">&#129504;</p>
                        <div className="feature-text">
                            <h2>Detect Schizophrenia, Anxiety and Depression</h2>
                            <p>Upload a WhatsApp chat...</p>
                        </div>
                    </button> 

                <button className="feature col-md-3" onClick={() => handleFeatureClick('group-therapy')}>
                <p class="feature-icon">
                      
                      &#129303;
                                  </p>
                    <div className="feature-text">
                        <h2>Group Therapy</h2>
                        <p>Get access to video rooms where you can converse with people going through the same disorders and talk your feelings out. Also recommended for schizophrenic patients who are not allowed to have access to group therapies due to their violent nature.</p>
                    </div>
                </button>

                <button className="feature col-md-3" onClick={() => handleFeatureClick('location-tracking')}>
                <p class="feature-icon">
                  &#128205;
              </p>
                    <div className="feature-text">
                        <h2>Real-Time Location Tracking</h2>
                        <p>Useful for caretakers of schizophrenic patients who need to keep tabs on their location. Also useful for doctors to control the addictive and destructive behaviour of the patients.</p>
                    </div>
                </button>

                <button className="feature col-md-3" onClick={() => handleFeatureClick('multilingual')}>
                <p class="feature-icon">
                &#129309;
              </p>
                    <div className="feature-text">
                        <h2>Available in Regional Indian Languages</h2>
                        <p>Making language a bridge, not a barrier, Mint is available in different Indian regional languages.</p>
                    </div>
                </button>

                <button className="feature col-md-3" onClick={() => handleFeatureClick('passwordless-authentication')}>
                <p class="feature-icon">
                    
                    &#128273;
                                </p>
                    <div className="feature-text">
                        <h2>Passwordless Authentication</h2>
                        <p>Considering the fact that patients with mental disorders also suffer from forgetfulness, they no longer need to remember their password for Mint as SAWO's passwordless authentication backs and speeds up the authentication process.</p>
                    </div>
                </button>

                <button className="feature col-md-3" onClick={() => handleFeatureClick('voice-enabled')}>
                <p class="feature-icon">
                    
                    &#128483;
                                </p>
                    <div className="feature-text">
                        <h2>Voice Enabled</h2>
                        <p>With the power of Alan AI, Mint's voice assistant - Minty brings out the possibility of this application to be used efficiently with persons suffering from various motor as well as visual impairments and is also a support system to the technically challenged individuals.</p>
                    </div>
                </button>

                <button className="feature col-md-3" onClick={() => handleFeatureClick('art-therapy')}>
                <p class="feature-icon">
                    
                    &#127912;
                                </p>
                    <div className="feature-text">
                        <h2>Art Therapy</h2>
                        <p>Art has proved to offer a calming sensation to people with mental disorders; with Mint's art-board, you can unleash your creativity in every direction.</p>
                    </div>
                </button>
            </div>
            

        </div>
        <div>
        {inputVisible && (
                <div className="input-section">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={userInput}
                            onChange={handleInputChange}
                            placeholder="Enter your statement here..."
                            rows="4"
                            cols="50"
                        />
                        <button type="submit">Submit</button>
                    </form>

                    {/* Display API Response */}
                    {response && (
                        <div className="response">
                            <h3>Response:</h3>
                            <p>{response.message}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
        </>
    );
};

export default FeatureSection;
