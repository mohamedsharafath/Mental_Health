import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PaintApp from './Components/Art/PaintApp';

import FeatureSection from './Components/Feature/FeatureSection';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
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

  </React.StrictMode>
);

reportWebVitals();
