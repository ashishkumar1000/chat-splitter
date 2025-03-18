
import React, { useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import ChatMessage from './ChatMessage';
import SendMessageForm from './SendMessageForm';
import ContentDisplay from './ContentDisplay';
import ChatHeader from './ChatHeader';
import { cn } from '../lib/utils';

const ChatInterface: React.FC = () => {
  const { messages, sendMessage, isTyping, hasMedia, currentMedia, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Return the welcome message with input field if the chat is empty
  const renderWelcomeMessage = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-semibold mb-2">Welcome to AI Chat</h2>
        <p className="text-muted-foreground mb-6 max-w-lg">
          Ask me anything! I can respond with text, images, videos, or interactive UI elements.
        </p>
        <div className="space-y-2 w-full max-w-md">
          {['What is machine learning?', 'Show me a picture of a sunset', 'Create a calendar widget'].map((sample) => (
            <button
              key={sample}
              onClick={() => sendMessage(sample)}
              className="w-full p-3 bg-secondary hover:bg-secondary/80 rounded-xl text-left transition-colors"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
      <SendMessageForm onSendMessage={sendMessage} isTyping={isTyping} />
    </div>
  );

  // Render the actual chat interface with messages
  const renderChat = () => (
    <>
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
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
    </>
  );

  return (
    <div className="flex h-full bg-secondary/30">
      {/* Chat section */}
      <div 
        className={cn(
          "flex flex-col h-full transition-all duration-500 ease-in-out",
          hasMedia ? "w-1/2" : "w-full"
        )}
      >
        <ChatHeader onClearChat={clearChat} hasMedia={hasMedia} />
        
        {messages.length === 0 ? renderWelcomeMessage() : renderChat()}
      </div>
      
      {/* Media display section */}
      {hasMedia && currentMedia && (
        <div className="w-1/2 h-full animate-slide-in-right">
          <ContentDisplay media={currentMedia} />
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
