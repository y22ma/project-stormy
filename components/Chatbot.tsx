
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { CurrentWeather, ForecastDay } from '../types';

// This is safe because the existence of API_KEY is checked in geminiService.ts
// which is imported by App.tsx before this component is ever rendered.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 2000;
const JITTER_FACTOR = 0.5;
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface ChatbotProps {
  onClose: () => void;
  currentWeather: CurrentWeather | null;
  forecast: ForecastDay[] | null;
}

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);

const Chatbot: React.FC<ChatbotProps> = ({ onClose, currentWeather, forecast }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // This effect runs when the component mounts and whenever the weather data changes,
    // ensuring the chatbot always has the most up-to-date context.
    let context = "You are Stormy, a friendly and helpful weather chatbot. Your personality is cheerful and cute. Answer questions about the weather based ONLY on the provided JSON data. If the user asks for weather info not present in the data (e.g., a different location or date), politely explain that you only have the information for the location and dates currently displayed in the app. If the user asks something completely unrelated to weather, gently and playfully guide them back to weather-related topics. Keep your answers concise and easy to understand.";

    if (currentWeather) {
      context += `\n\nHere is the current weather data for ${currentWeather.location}:\n${JSON.stringify(currentWeather)}`;
    }
    if (forecast) {
      context += `\n\nHere is the forecast data:\n${JSON.stringify(forecast)}`;
    } else if (currentWeather) {
       context += `\n\nThere is no forecast data available right now, only the current weather for ${currentWeather.location}.`
    } else {
       context += `\n\nNo weather data is currently loaded. Please perform a search in the app first.`
    }


    chatRef.current = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: context,
        temperature: 0.5,
      },
    });
    
    setMessages([{ text: "Hi there! I'm Stormy. How can I help you with the weather today?", sender: 'bot' }]);

  }, [currentWeather, forecast]); // Re-initialize chat when weather data changes.

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
        if (chatRef.current) {
            for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
                try {
                    const result = await chatRef.current.sendMessage({ message: currentInput });
                    const botMessage: Message = { text: result.text, sender: 'bot' };
                    setMessages(prev => [...prev, botMessage]);
                    return; // Success, exit function
                } catch (error) {
                    console.error(`Chatbot attempt ${attempt} failed:`, error);
                    const isRateLimitError = error instanceof Error && (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED') || error.message.includes('RATE_LIMIT_EXCEEDED'));
                    
                    if (isRateLimitError && attempt < MAX_RETRIES) {
                        const backoff = INITIAL_BACKOFF_MS * Math.pow(2, attempt - 1);
                        const jitter = backoff * JITTER_FACTOR * (Math.random() - 0.5);
                        const delay = backoff + jitter;
                        console.log(`Chatbot rate limit exceeded on attempt ${attempt}. Retrying in ${delay.toFixed(0)}ms...`);
                        await sleep(delay);
                    } else {
                        throw error; // Re-throw on last attempt or for other errors
                    }
                }
            }
        }
    } catch (error) {
        console.error("Chatbot error after retries:", error);
        let errorMessageText = "Oh no! My circuits are a bit foggy right now. Please try asking again in a moment.";
        if (error instanceof Error && (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED') || error.message.includes('RATE_LIMIT_EXCEEDED'))) {
            errorMessageText = "Whoops! I'm a bit overwhelmed with requests right now. Please wait a moment before asking again.";
        }
        const errorMessage: Message = { text: errorMessageText, sender: 'bot' };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-8 sm:right-8 w-full sm:w-[calc(100%-3rem)] sm:max-w-sm h-full sm:h-[70%] sm:max-h-[500px] z-40 animate-fade-in">
        <div className="flex flex-col h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-none sm:rounded-2xl shadow-2xl border-white/20">
            <div className="flex-shrink-0 flex items-center justify-between p-3 border-b border-black/10 dark:border-white/10">
                <h3 className="font-bold text-slate-800 dark:text-white">Chat with Stormy</h3>
                <button 
                    onClick={onClose}
                    className="font-semibold text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors text-sm px-2 py-1"
                    aria-label="Exit chat"
                >
                    Exit
                </button>
            </div>

            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' 
                            ? 'bg-cyan-500 text-white rounded-br-lg' 
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-bl-lg'}`
                        }>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 rounded-bl-lg">
                           <div className="flex items-center gap-1.5">
                               <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                               <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                               <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
                           </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex-shrink-0 p-3 border-t border-black/10 dark:border-white/10">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about the weather..."
                        className="w-full p-2 bg-slate-200/50 dark:bg-black/20 rounded-lg border-none focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all duration-300 placeholder-slate-500 dark:placeholder-slate-400 text-sm"
                        disabled={isLoading}
                        aria-label="Chat input"
                    />
                    <button 
                        type="submit" 
                        disabled={isLoading || !input.trim()} 
                        className="bg-cyan-500 text-white rounded-lg px-4 flex items-center justify-center transition-colors hover:bg-cyan-600 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
                        aria-label="Send message"
                    >
                        <SendIcon />
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Chatbot;
