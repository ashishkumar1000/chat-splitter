
import React from 'react';
import { Message } from '../hooks/useChat';
import { cn } from '../lib/utils';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
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
