import React from 'react';
import './App.css';
import HeroSection from './Components/HeroSection/HeroSection';
import FeatureSection from './Components/Feature/FeatureSection';
import KiranHelpline from './Components/KiranHelpline/KiranHelpline';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <HeroSection />
      <FeatureSection />
      <KiranHelpline />
    </div>
  );
}

export default App;
