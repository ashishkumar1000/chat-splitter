
import React from 'react';
import { Trash2 } from 'lucide-react';

interface ChatHeaderProps {
  onClearChat: () => void;
  hasMedia: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClearChat, hasMedia }) => {
  return (
    <div className="border-b border-border p-4 bg-background/80 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center space-x-3">
        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse-soft"></div>
        <h1 className="font-medium">{hasMedia ? 'Chat & Media View' : 'AI Chat'}</h1>
      </div>
      <button
        onClick={onClearChat}
        className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-md"
        title="Clear chat"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default ChatHeader;
