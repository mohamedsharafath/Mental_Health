import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './Components/Navbar/Navbar';
import HeroSection from './Components/HeroSection/HeroSection';
import FeatureSection from './Components/Feature/FeatureSection';
import KiranHelpline from './Components/KiranHelpline/KiranHelpline';
import SuicidePrediction from './Suicide_Detection/Suicide_Prediction';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
            <Navbar />
            <HeroSection />
            <FeatureSection />
            <KiranHelpline />

  </React.StrictMode>
);

reportWebVitals();
