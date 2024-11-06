import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PaintApp from './Components/Art/PaintApp';
import GuidedJournal from './Components/Journaling/GuidedJournal';
import MoodTracker from './Components/MoodTracker/MoodTracker';
import SelfCareRoutine from './Components/SelfCare/SelfCare';
import CBTExercises from './Components/CBT/CBTherapy';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Router>
            <Routes>
                <Route path="/" element={<App />} />
                {/* <Route path="/group-therapy" element={<GroupTherapy />} /> */}
                <Route path="/location-tracking" element={<CBTExercises />} />
              <Route path="/multilingual" element={<SelfCareRoutine />} />
              <Route path="/voice-enabled" element={<MoodTracker />} />
              <Route path="/passwordless-authentication" element={<GuidedJournal />} />
                <Route path="/art-therapy" element={<PaintApp />} />
            </Routes>
        </Router>

  </React.StrictMode>
);

reportWebVitals();
