import React from 'react';

function KiranHelpline() {
    return (
        <div className="kiran-container" id="kiran-container">
            <h1>&#128222; 1800-500-0019</h1>
            <h3>The Kiran Helpline by Govt. Of India</h3>
            <p>The Kiran Helpline is a free 24-hour helpline for mental health issues available in Indian regional languages.</p>
            <div className="kiran-buttons">
                <button className="kiran-btn" style={{ backgroundColor: "#FF9933", color: "#ffffff" }}>Call Now</button>
                <button className="kiran-btn" style={{ backgroundColor: "#FFFFFF" }}>Request A Callback</button>
                <button className="kiran-btn" style={{ backgroundColor: "#138808", color: "#ffffff" }}>Chat Now</button>
            </div>
        </div>
    );
}

export default KiranHelpline;
