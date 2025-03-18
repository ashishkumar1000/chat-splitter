
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface SendMessageFormProps {
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({
  onSendMessage,
  isTyping
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize the textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-end border-t border-border bg-background/80 backdrop-blur-sm p-4"
    >
      <div className="relative flex-1 mr-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          disabled={isTyping}
          className="w-full resize-none border rounded-xl p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-foreground placeholder:text-muted-foreground disabled:opacity-50 transition-all"
        />
      </div>
      <button
        type="submit"
        disabled={!message.trim() || isTyping}
        className="p-3 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <Send size={18} />
      </button>
    </form>
  );
};

export default SendMessageForm;
