
import { useState, useCallback, useEffect, useRef } from 'react';

// Types for our messages
export type MessageType = 'text' | 'image' | 'video' | 'ui' | 'hotel-listing';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  type: MessageType;
  timestamp: Date;
}

export interface UseChat {
  messages: Message[];
  sendMessage: (content: string) => void;
  isTyping: boolean;
  hasMedia: boolean;
  mediaMessages: Message[];
  clearChat: () => void;
}

// Sample responses to simulate AI behavior
const sampleResponses = [
  {
    type: 'text',
    content: "I'm happy to help! Is there anything specific you'd like to know?"
  },
  {
    type: 'image',
    content: "https://bit.ly/41yXu8O"
  },
  {
    type: 'text',
    content: "That's an interesting question. Let me elaborate on that for you."
  },
  {
    type: 'video',
    content: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    type: 'ui',
    content: "calendar"
  },
  {
    type: 'text',
    content: "Here's a more detailed explanation of how this works."
  }
];

export function useChat(): UseChat {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [mediaMessages, setMediaMessages] = useState<Message[]>([]);
  const responseIndex = useRef(0);

  // Check if we have any media type messages
  const hasMedia = mediaMessages.length > 0;

  // Generate a new message ID
  const generateId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Send a message and trigger AI response
  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content,
      sender: 'user',
      type: 'text',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Check if the message is asking for hotel listings
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('hotel') || 
        lowerContent.includes('listing') || 
        lowerContent.includes('stay') || 
        lowerContent.includes('accommodation')) {
      
      // Simulate AI typing
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        
        const hotelListingMessage: Message = {
          id: generateId(),
          content: "hotel-listing-view",
          sender: 'ai',
          type: 'hotel-listing',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, hotelListingMessage]);
        setMediaMessages(prev => [...prev, hotelListingMessage]);
      }, 1000);
      
      return;
    }

    // Simulate AI typing for regular responses
    setIsTyping(true);

    // Get a sample response based on the current index
    const response = sampleResponses[responseIndex.current % sampleResponses.length];
    responseIndex.current += 1;

    // Simulate AI response after delay
    setTimeout(() => {
      setIsTyping(false);

      const aiMessage: Message = {
        id: generateId(),
        content: response.content,
        sender: 'ai',
        type: response.type as MessageType,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Update media messages if the message is a media type
      if (response.type !== 'text') {
        setMediaMessages(prev => [...prev, aiMessage]);
      }
    }, 1500);
  }, []);

  // Clear the chat
  const clearChat = useCallback(() => {
    setMessages([]);
    setMediaMessages([]);
  }, []);

  return {
    messages,
    sendMessage,
    isTyping,
    hasMedia,
    mediaMessages,
    clearChat
  };
}
