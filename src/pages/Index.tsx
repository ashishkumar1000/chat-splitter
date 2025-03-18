
import React from 'react';
import ChatInterface from '../components/ChatInterface';

const Index: React.FC = () => {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-background to-secondary">
      <div className="container h-full py-6 px-4 md:px-6 lg:px-8">
        <div className="h-full bg-white/70 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden border border-border/50">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Index;
