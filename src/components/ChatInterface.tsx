
import React, { useRef, useEffect, useState } from 'react';
import { useChat } from '../hooks/useChat';
import ChatMessage from './ChatMessage';
import SendMessageForm from './SendMessageForm';
import ContentDisplay from './ContentDisplay';
import ChatHeader from './ChatHeader';
import { cn } from '../lib/utils';
import { Switch } from './ui/switch';

const ChatInterface: React.FC = () => {
  const { messages, sendMessage, isTyping, hasMedia, mediaMessages, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [splitViewEnabled, setSplitViewEnabled] = useState(true);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Function to toggle split view
  const toggleSplitView = () => {
    setSplitViewEnabled(!splitViewEnabled);
  };

  // Determine if we should show media in the main chat
  const showMediaInChat = !splitViewEnabled && hasMedia;

  return (
    <div className="flex h-full bg-secondary/30">
      {/* Chat section */}
      <div 
        className={cn(
          "flex flex-col h-full transition-all duration-500 ease-in-out",
          splitViewEnabled && hasMedia ? "w-1/2" : "w-full"
        )}
      >
        <ChatHeader onClearChat={clearChat} hasMedia={hasMedia} />
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {/* Split view toggle */}
            {hasMedia && (
              <div className="flex items-center justify-end mb-4 space-x-2 px-2">
                <span className="text-sm text-muted-foreground">Split View</span>
                <Switch 
                  checked={splitViewEnabled}
                  onCheckedChange={toggleSplitView}
                />
              </div>
            )}
            
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-semibold mb-2">Welcome to AI Chat</h2>
                <p className="text-muted-foreground mb-6 max-w-lg">
                  Ask me anything! I can respond with text, images, videos, or interactive UI elements.
                </p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage 
                    key={message.id} 
                    message={message} 
                    showMedia={showMediaInChat}
                  />
                ))}
              </>
            )}
            
            {isTyping && (
              <div className="flex items-start mb-4">
                <div className="bg-secondary text-secondary-foreground rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <SendMessageForm onSendMessage={sendMessage} isTyping={isTyping} />
        </div>
      </div>
      
      {/* Media display section - only shown when split view is enabled */}
      {splitViewEnabled && hasMedia && (
        <div className="w-1/2 h-full animate-slide-in-right">
          <ContentDisplay media={mediaMessages} />
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
