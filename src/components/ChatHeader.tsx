
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';

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
      <Button
        onClick={onClearChat}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors"
        title="Clear chat"
      >
        <Trash2 size={16} />
        <span>Clear Chat</span>
      </Button>
    </div>
  );
};

export default ChatHeader;
