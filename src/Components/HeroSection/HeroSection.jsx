import React from 'react';

function HeroSection() {
    const scrollToFeatures = () => {
        document.getElementById('feature-container').scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="hero" id="hero">
            <div className="content">
                <h1>Aurora Care❤️‍🩹</h1>
                <h2>Freshen Your Mental Health</h2>
                <p>Detect and manage all your mental health troubles.</p>
                <button onClick={scrollToFeatures}>Get Started &#128293;</button>
            </div>
        </div>
    );
}

export default HeroSection;
