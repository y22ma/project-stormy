
import React from 'react';
import type { Theme } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUnits: 'celsius' | 'fahrenheit';
  onToggleUnits: () => void;
  currentTheme: Theme;
  onSetTheme: (theme: Theme) => void;
}

const themes: { id: Theme; name: string; color: string }[] = [
    { id: 'light', name: 'Light', color: 'bg-sky-200' },
    { id: 'dark', name: 'Dark', color: 'bg-slate-800' },
    { id: 'storm', name: 'Storm', color: 'bg-indigo-900' },
    { id: 'sunset', name: 'Sunset', color: 'bg-orange-500' },
    { id: 'forest', name: 'Forest', color: 'bg-emerald-600' },
    { id: 'ocean', name: 'Ocean', color: 'bg-cyan-500' },
    { id: 'sakura', name: 'Sakura', color: 'bg-pink-300' },
    { id: 'synthwave', name: 'Synthwave', color: 'bg-purple-600' },
    { id: 'mono', name: 'Monochrome', color: 'bg-gray-400' },
];

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentUnits, onToggleUnits, currentTheme, onSetTheme }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm m-4 text-slate-800 dark:text-white" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        
        <div className="flex items-center justify-between">
          <span className="font-semibold">Temperature Units</span>
          <div className="relative inline-block w-28">
            <button
              onClick={onToggleUnits}
              className="relative w-full bg-slate-200 dark:bg-slate-700 rounded-full h-8 transition-colors duration-300"
            >
              <span className={`absolute top-1 left-1 w-12 h-6 flex items-center justify-center rounded-full bg-cyan-500 dark:bg-cyan-400 text-white dark:text-slate-900 font-bold text-sm shadow-md transform transition-transform duration-300 ${currentUnits === 'fahrenheit' ? 'translate-x-14' : ''}`}>
                {currentUnits === 'celsius' ? '°C' : '°F'}
              </span>
              <div className="absolute inset-0 flex justify-around items-center">
                 <span className={`font-semibold text-sm ${currentUnits === 'celsius' ? 'text-white' : 'text-slate-500'}`}>°C</span>
                 <span className={`font-semibold text-sm ${currentUnits === 'fahrenheit' ? 'text-slate-900' : 'text-slate-500'}`}>°F</span>
              </div>
            </button>
          </div>
        </div>

        <div className="mt-6">
            <h3 className="font-semibold mb-3">Theme</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {themes.map(theme => (
                    <button
                    key={theme.id}
                    onClick={() => onSetTheme(theme.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        currentTheme === theme.id
                        ? 'bg-cyan-500 dark:bg-cyan-400 text-white dark:text-slate-900 font-bold ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 ring-cyan-500'
                        : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                    >
                    <span className={`w-5 h-5 rounded-full ${theme.color} border border-slate-300 dark:border-slate-500`}></span>
                    <span>{theme.name}</span>
                    </button>
                ))}
            </div>
        </div>
        
        <button onClick={onClose} className="mt-8 w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-bold py-2 px-4 rounded-lg transition-colors">
          Done
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;