import React from 'react';

function KiranHelpline() {
    const handleCopy = () => {
        navigator.clipboard.writeText("1800-500-0019");
        alert("Number copied to clipboard!");
    };

    const handleVisit = () => {
        window.open("https://pib.gov.in/PressReleasePage.aspx?PRID=1652240#:~:text=24x7%20Toll%2DFree%20Mental%20Health,0019)%20launched%20in%2013%20Languages", "_blank");
    };

    const handleMail = () => {
        window.location.href = "mailto:nimhrsehore@gmail.com";
    };

    return (
        <div className="kiran-container" id="kiran-container">
            <h1>&#128222; 1800-500-0019</h1>
            <h3>The Kiran Helpline by Govt. Of India</h3>
            <p>The Kiran Helpline is a free 24-hour helpline for mental health issues available in Indian regional languages.</p>
            <div className="kiran-buttons">
                <button 
                    className="kiran-btn" 
                    style={{ backgroundColor: "#FF9933", color: "#ffffff" }}
                    onClick={handleVisit}
                >
                    Visit to Website
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-arrow-out-up-right">
                            <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>
                            <path d="m21 3-9 9"/>
                            <path d="M15 3h6v6"/>
                        </svg>
                </button>
                <button 
                    className="kiran-btn" 
                    style={{ backgroundColor: "#FFFFFF" }}
                    onClick={handleCopy}
                >
                    Copy to Clipboard
                </button>
                <button 
                    className="kiran-btn" 
                    style={{ backgroundColor: "#138808", color: "#ffffff" }}
                    onClick={handleMail}
                >
                    Mail Support ✉️
                </button>
            </div>
        </div>
    );
}

export default KiranHelpline;
