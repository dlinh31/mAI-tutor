import React from 'react';

const Feature: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center">App Features</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Feature 
            title="Task Management" 
            description="Organize your tasks with our intuitive drag-and-drop interface." 
          />
          <Feature 
            title="AI Chatbot" 
            description="Get instant assistance and smart recommendations from our AI." 
          />
          <Feature 
            title="Scheduler" 
            description="Easily schedule tasks and meetings with integrated calendar views." 
          />
          <Feature 
            title="Real-time Collaboration" 
            description="Collaborate with your team in chat rooms designed for efficient communication." 
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
