import React from 'react';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: string;
  onSelectLanguage: (lang: string) => void;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
  { code: 'pt', name: 'Português' },
  { code: 'it', name: 'Italiano' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'zh', name: '简体中文' },
];

const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen, onClose, currentLanguage, onSelectLanguage }) => {
  if (!isOpen) return null;

  const handleSelect = (langCode: string) => {
    onSelectLanguage(langCode);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm m-4 text-slate-800 dark:text-white" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Select Language</h2>
        
        <div className="space-y-2">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                currentLanguage === lang.code
                  ? 'bg-cyan-500 dark:bg-cyan-400 text-white dark:text-slate-900 font-bold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
        
        <button onClick={onClose} className="mt-6 w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-bold py-2 px-4 rounded-lg transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LanguageModal;