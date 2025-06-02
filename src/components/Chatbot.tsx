import { X, Bot } from 'lucide-react';

const Chatbot = ({ onClose }) => {
  return (
    <div className="fixed z-50 bottom-24 right-6 w-[350px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-brand-green flex flex-col animate-fade-in-up">
      <div className="flex items-center justify-between px-4 py-3 border-b border-brand-green bg-brand-green rounded-t-2xl">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-white" />
          <span className="text-white font-bold text-lg">Devoura Chatbot</span>
        </div>
        <button onClick={onClose} className="text-white hover:text-brand-gold focus:outline-none">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto" style={{ minHeight: 220, maxHeight: 320 }}>
        <div className="text-gray-700 text-sm mb-2">Hi! 👋 How can I help your NGO today?</div>
        {/* Future: Chat messages will go here */}
      </div>
      <form className="flex items-center gap-2 border-t border-gray-200 p-3">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green text-sm"
          placeholder="Type your message..."
          disabled
        />
        <button type="submit" className="bg-brand-green text-white px-4 py-2 rounded-lg font-semibold opacity-60 cursor-not-allowed" disabled>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot; 