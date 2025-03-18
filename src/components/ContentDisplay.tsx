
import React from 'react';
import { Message } from '../hooks/useChat';
import { cn } from '../lib/utils';

interface ContentDisplayProps {
  media: Message[];
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ media }) => {
  const renderMediaItem = (item: Message) => {
    switch (item.type) {
      case 'image':
        return (
          <div className="w-full flex items-center justify-center p-4">
            <img 
              src={item.content} 
              alt="AI generated image" 
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-md animate-fade-in" 
            />
          </div>
        );
        
      case 'video':
        return (
          <div className="w-full flex items-center justify-center p-4">
            <video 
              src={item.content} 
              controls 
              className="max-w-full max-h-[80vh] rounded-lg shadow-md animate-fade-in" 
            />
          </div>
        );
        
      case 'ui':
        // Here we render a sample UI element - in a real app, you'd render actual components
        return (
          <div className="w-full flex items-center justify-center p-4">
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
        return null;
    }
  };

  return (
    <div className="h-full w-full overflow-auto bg-white/40 backdrop-blur-sm rounded-l-2xl border-l border-border">
      {media.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No media to display</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-6 p-4">
          {media.map((item) => (
            <div key={item.id} className="animate-slide-up">
              <div className="text-xs text-muted-foreground mb-1">
                {new Intl.DateTimeFormat('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                }).format(item.timestamp)}
              </div>
              {renderMediaItem(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentDisplay;
