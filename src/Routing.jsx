import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
// import GroupTherapy from './pages/GroupTherapy';
// import LocationTracking from './pages/LocationTracking';
// import Multilingual from './pages/Multilingual';
// import PasswordlessAuthentication from './pages/PasswordlessAuthentication';
// import VoiceEnabled from './pages/VoiceEnabled';
// import ArtTherapy from './pages/ArtTherapy';
import PaintApp from './Components/Art/PaintApp';

function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                {/* <Route path="/group-therapy" element={<GroupTherapy />} />
                <Route path="/location-tracking" element={<LocationTracking />} />
                <Route path="/multilingual" element={<Multilingual />} />
                <Route path="/passwordless-authentication" element={<PasswordlessAuthentication />} />
                <Route path="/voice-enabled" element={<VoiceEnabled />} /> */}
                <Route path="/art-therapy" element={<PaintApp />} />
            </Routes>
        </Router>
    );
}

export default Routing;
