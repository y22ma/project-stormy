
import React from 'react';

interface HeaderProps {
    onHomeClick: () => void;
    onOpenSettings: () => void;
    onOpenLanguage: () => void;
}

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const LanguageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 5h7"></path>
        <path d="M9 3v2c0 4.418 -2.239 8 -5 8"></path>
        <path d="M5 9c0 2.144 2.952 3.908 6.7 4"></path>
        <path d="M12 20l4 -9l4 9"></path>
        <path d="M19.1 18h-6.2"></path>
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ onHomeClick, onOpenSettings, onOpenLanguage }) => {
    return (
        <header className="absolute top-0 left-0 right-0 p-4 sm:p-6 z-20 flex items-center justify-between">
            <div>
                 <button 
                    onClick={onHomeClick}
                    className="p-2 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-sm text-slate-700 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors" aria-label="Home">
                    <HomeIcon />
                </button>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
                <button 
                    onClick={onOpenLanguage}
                    className="p-2 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-sm text-slate-700 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors" aria-label="Change language">
                    <LanguageIcon />
                </button>

                <button 
                    onClick={onOpenSettings}
                    className="p-2 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-sm text-slate-700 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors" aria-label="Settings">
                    <SettingsIcon />
                </button>
            </div>
        </header>
    );
};

export default Header;