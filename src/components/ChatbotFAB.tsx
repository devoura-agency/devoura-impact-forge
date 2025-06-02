import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Chatbot from './Chatbot';

const ChatbotFAB = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open Chatbot"
        className="fixed z-50 bottom-6 right-6 bg-brand-green hover:bg-brand-green-light text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-gold"
        onClick={() => setOpen(true)}
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}
      >
        <MessageCircle className="w-7 h-7" />
      </button>
      {open && <Chatbot onClose={() => setOpen(false)} />}
    </>
  );
};

export default ChatbotFAB; 