
import React from 'react';
import { Message } from '../hooks/useChat';

interface ContentDisplayProps {
  media: Message;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ media }) => {
  const renderMedia = () => {
    switch (media.type) {
      case 'image':
        return (
          <div className="w-full h-full flex items-center justify-center p-4">
            <img 
              src={media.content} 
              alt="AI generated image" 
              className="max-w-full max-h-[calc(100vh-200px)] object-contain rounded-lg shadow-md animate-fade-in" 
            />
          </div>
        );
        
      case 'video':
        return (
          <div className="w-full h-full flex items-center justify-center p-4">
            <video 
              src={media.content} 
              controls 
              autoPlay 
              className="max-w-full max-h-[calc(100vh-200px)] rounded-lg shadow-md animate-fade-in" 
            />
          </div>
        );
        
      case 'ui':
        // Here we render a sample UI element - in a real app, you'd render actual components
        return (
          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 animate-fade-in">
              <h3 className="text-lg font-medium mb-4">Calendar Widget</h3>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 31 }, (_, i) => (
                  <div 
                    key={i} 
                    className={`h-12 flex items-center justify-center rounded-md ${
                      i === 14 ? 'bg-primary text-white' : 'hover:bg-secondary'
                    } cursor-pointer transition-colors`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Select media to view</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full w-full overflow-auto bg-white/40 backdrop-blur-sm rounded-l-2xl border-l border-border">
      {renderMedia()}
    </div>
  );
};

export default ContentDisplay;
