
import React from 'react';
import { Trash2, MessageCircle, Grid } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

interface ChatHeaderProps {
  onClearChat: () => void;
  hasMedia: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClearChat, hasMedia }) => {
  return (
    <div className="border-b border-border/60 p-4 bg-background/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="bg-primary/10 p-1.5 rounded-full">
          {hasMedia ? (
            <Grid size={18} className="text-primary" />
          ) : (
            <MessageCircle size={18} className="text-primary" />
          )}
        </div>
        <h1 className={cn(
          "font-semibold text-foreground/90",
          hasMedia && "bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent"
        )}>
          {hasMedia ? 'Chat & Media View' : 'AI Chat'}
        </h1>
        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse-soft ml-2"></div>
      </div>
      <Button
        onClick={onClearChat}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors"
        title="Clear chat"
      >
        <Trash2 size={16} />
        <span className="font-medium">Clear</span>
      </Button>
    </div>
  );
};

export default ChatHeader;
