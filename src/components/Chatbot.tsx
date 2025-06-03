
import { useState } from 'react';
import { X, Bot, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  onClose: () => void;
}

const Chatbot = ({ onClose }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! 👋 I'm here to help with your NGO website needs. How can Devoura assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const botResponses = {
    greeting: [
      "Hello! Welcome to Devoura. We specialize in creating impactful websites for NGOs. How can I help you today?",
      "Hi there! I'm here to assist you with your NGO website requirements. What would you like to know?"
    ],
    services: [
      "We offer comprehensive NGO website services including custom design, donation integration, volunteer management, and SEO optimization. Would you like to know more about any specific service?",
      "Our services include website design, development, maintenance, and digital marketing specifically tailored for NGOs. Which area interests you most?"
    ],
    pricing: [
      "We have flexible pricing plans starting from ₹15,000 for basic NGO websites. Our premium plans include advanced features like donation systems and volunteer portals. Would you like to schedule a consultation?",
      "Our pricing is designed to be NGO-friendly. We offer packages from basic websites to full-featured platforms. I can connect you with our team for a detailed quote."
    ],
    contact: [
      "You can reach us through our contact form on this page, or I can help you schedule a consultation. Our team of Salve Surya Raj, Amaravadi Sanjay, and Margam Vishu are ready to assist you!",
      "Feel free to use our contact form below, or would you like me to help you with a specific query about your NGO website?"
    ],
    templates: [
      "We have pre-designed templates for various NGO types including Education, Women Empowerment, Wildlife Conservation, Health, and Community Development. Would you like to explore our template gallery?",
      "Our template collection covers Education NGOs, Women's Rights, Environmental causes, Healthcare, and Social welfare. Which type of NGO are you working with?"
    ],
    default: [
      "That's a great question! For detailed information, I'd recommend speaking with our team. Would you like to schedule a consultation?",
      "I'd be happy to connect you with our experts who can provide more specific guidance. Shall I help you get in touch?"
    ]
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    }
    if (message.includes('service') || message.includes('what do you do') || message.includes('help')) {
      return botResponses.services[Math.floor(Math.random() * botResponses.services.length)];
    }
    if (message.includes('price') || message.includes('cost') || message.includes('pricing') || message.includes('budget')) {
      return botResponses.pricing[Math.floor(Math.random() * botResponses.pricing.length)];
    }
    if (message.includes('contact') || message.includes('reach') || message.includes('call') || message.includes('email')) {
      return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)];
    }
    if (message.includes('template') || message.includes('design') || message.includes('example')) {
      return botResponses.templates[Math.floor(Math.random() * botResponses.templates.length)];
    }
    
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div className="fixed z-50 bottom-24 right-6 w-[350px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-brand-green flex flex-col animate-fade-in-up">
      <div className="flex items-center justify-between px-4 py-3 border-b border-brand-green bg-brand-green rounded-t-2xl">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-white" />
          <span className="text-white font-bold text-lg">Devoura Assistant</span>
        </div>
        <button onClick={onClose} className="text-white hover:text-brand-gold focus:outline-none">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-3" style={{ minHeight: 300, maxHeight: 400 }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                message.isBot
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-brand-green text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-600">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSendMessage} className="flex items-center gap-2 border-t border-gray-200 p-3">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green text-sm"
          placeholder="Type your message..."
        />
        <button 
          type="submit" 
          disabled={!inputMessage.trim()}
          className="bg-brand-green text-white p-2 rounded-lg hover:bg-brand-green-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
