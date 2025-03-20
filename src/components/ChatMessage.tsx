
import React from 'react';
import { Message } from '../hooks/useChat';
import { cn } from '../lib/utils';
import HotelListingView from './HotelListingView';

interface ChatMessageProps {
  message: Message;
  showMedia?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, showMedia = false }) => {
  const isUser = message.sender === 'user';

  // Format the message timestamp
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  // Render different message content based on type
  const renderContent = () => {
    if (message.type === 'text') {
      return (
        <div className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
          {message.content}
        </div>
      );
    }
    
    // Handle hotel listing view - only show in media section
    if (message.type === 'hotel-listing') {
      // Always show a placeholder for hotel listings in the chat view
      return (
        <div className="text-sm flex items-center space-x-2 text-primary">
          <span>🏨</span>
          <span>Sent hotel listings (view on the right)</span>
        </div>
      );
    }
    
    // If showMedia is true and the message is a media type, render the media
    if (showMedia) {
      if (message.type === 'image') {
        return (
          <div className="my-2">
            <img 
              src={message.content} 
              alt="AI generated image" 
              className="max-w-full rounded-lg shadow-md" 
            />
          </div>
        );
      }
      
      if (message.type === 'video') {
        return (
          <div className="my-2">
            <video 
              src={message.content} 
              controls 
              className="max-w-full rounded-lg shadow-md" 
            />
          </div>
        );
      }
      
      if (message.type === 'ui') {
        return (
          <div className="my-2">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-medium mb-2">Calendar Widget</h3>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 31 }, (_, i) => (
                  <div 
                    key={i} 
                    className={`h-8 flex items-center justify-center rounded-md text-sm ${
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
      }
    } else {
      // If showMedia is false, show placeholder for media types
      if (message.type === 'image') {
        return (
          <div className="text-sm flex items-center space-x-2 text-primary">
            <span>📷</span>
            <span>Sent an image (view on the right)</span>
          </div>
        );
      }
      
      if (message.type === 'video') {
        return (
          <div className="text-sm flex items-center space-x-2 text-primary">
            <span>🎥</span>
            <span>Sent a video (view on the right)</span>
          </div>
        );
      }
      
      if (message.type === 'ui') {
        return (
          <div className="text-sm flex items-center space-x-2 text-primary">
            <span>🖼️</span>
            <span>Sent a UI element (view on the right)</span>
          </div>
        );
      }
    }
    
    return <div>Unsupported message type</div>;
  };

  return (
    <div
      className={cn(
        "flex items-start mb-4 animate-slide-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-none"
            : "bg-secondary text-secondary-foreground rounded-tl-none"
        )}
      >
        {renderContent()}
        <div className={cn(
          "text-[10px] mt-1 opacity-70",
          isUser ? "text-right" : "text-left"
        )}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
