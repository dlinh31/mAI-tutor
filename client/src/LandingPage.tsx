import React from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import AIChatbotSection from './components/AIChatbotSection';
import SchedulerSection from './components/SchedulerSection';
import ChatRoomsSection from './components/ChatRoomsSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <HeroSection />
      <FeaturesSection />
      <AIChatbotSection />
      <SchedulerSection />
      <ChatRoomsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}

export default App;
