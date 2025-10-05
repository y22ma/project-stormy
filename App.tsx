
import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { CurrentWeather, ForecastDay, Theme } from './types';
import { fetchWeatherData } from './services/geminiService';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import Header from './components/Header';
import Mascot from './components/Mascot';
import WeatherBackground from './components/WeatherBackground';
import SettingsModal from './components/SettingsModal';
import LanguageModal from './components/LanguageModal';
import { translations, TranslationKey } from './utils/translations';
import HourlyForecastModal from './components/HourlyForecastModal';
import Chatbot from './components/Chatbot';

// Skeleton components for a better loading experience
const SkeletonBox: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-slate-300/50 dark:bg-slate-700/50 rounded-md animate-pulse ${className}`} />
);

const WeatherCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-4 w-full max-w-md">
      <SkeletonBox className="h-9 w-48 mb-2" />
      <SkeletonBox className="h-6 w-32 mb-4" />
      <SkeletonBox className="h-24 w-40 my-2" />
      <div className="flex justify-center gap-5 text-lg w-full">
        <SkeletonBox className="h-7 w-20" />
        <SkeletonBox className="h-7 w-20" />
      </div>
       <div className="flex justify-center gap-8 text-center mt-6 w-full">
        <div className="flex flex-col items-center gap-1">
          <SkeletonBox className="h-5 w-16" />
          <SkeletonBox className="h-7 w-20" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <SkeletonBox className="h-5 w-16" />
          <SkeletonBox className="h-7 w-20" />
        </div>
      </div>
    </div>
  );
};

const ForecastCardSkeleton: React.FC = () => {
    return (
        <div className="flex-1 flex flex-col items-center gap-2 p-4 bg-black/5 dark:bg-black/10 backdrop-blur-sm rounded-2xl border border-black/10 dark:border-white/10 min-w-[100px]">
            <SkeletonBox className="h-6 w-12 mb-1" />
            <SkeletonBox className="w-14 h-14 my-1 rounded-full" />
            <div className="flex gap-2 text-md">
              <SkeletonBox className="h-6 w-10" />
              <SkeletonBox className="h-6 w-10" />
            </div>
        </div>
    );
};

const ForecastSkeleton: React.FC = () => {
  return (
    <div className="w-full mt-8">
      <div className="flex flex-row gap-3 sm:gap-4 overflow-x-auto pb-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <ForecastCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

type Units = 'celsius' | 'fahrenheit';

const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10"></path>
        <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2"></path>
    </svg>
);


const App: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [selectedDay, setSelectedDay] = useState<ForecastDay | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // New state for features
  const [theme, setTheme] = useState<Theme>('dark');
  const [units, setUnits] = useState<Units>('celsius');
  const [language, setLanguage] = useState<string>('en');
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isLanguageModalOpen, setLanguageModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [backgroundOverride, setBackgroundOverride] = useState<string | null>(null);
  const [lastSearchParams, setLastSearchParams] = useState<{ location: string; startDate: string; endDate: string; weather: string; } | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Themes are categorized as 'light' or 'dark' for tailwind styling
    const isDarkMode = ['dark', 'storm', 'sunset', 'synthwave'].includes(theme);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  const handleHome = useCallback(() => {
    setCurrentWeather(null);
    setForecast(null);
    setError(null);
    setLastSearchParams(null); // Also reset search params on home
  }, []);

  const fetchAndSetWeather = useCallback(async (searchParams: { location: string; startDate: string; endDate: string; weather: string }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData({ ...searchParams, language, units });
      if (data && data.currentWeather && data.forecast) {
        setCurrentWeather(data.currentWeather);
        setForecast(data.forecast);
      } else {
        setError('Could not find weather data for that location. Please try another.');
        setCurrentWeather(null); // Clear data if not found
        setForecast(null);
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message === 'RATE_LIMIT_EXCEEDED') {
        setError('We seem to be very popular right now! Please wait a moment and try your search again.');
      } else {
        setError('An error occurred while fetching weather data. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [language, units]);


  const handleSearch = useCallback(async (searchParams: { location: string; startDate: string; endDate: string; weather: string }) => {
    if (!searchParams.location || !searchParams.startDate) return;

    setLastSearchParams(searchParams);
    // For a new user-initiated search, clear old results for a better UI response.
    setCurrentWeather(null);
    setForecast(null);
    fetchAndSetWeather(searchParams);
  }, [fetchAndSetWeather]);
  
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (lastSearchParams) {
      fetchAndSetWeather(lastSearchParams);
    }
  // This effect re-fetches data when units or language change.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units, language]);
  

  const condition = currentWeather?.condition ?? null;
  
  const t = (key: TranslationKey) => {
    return translations[key][language] || translations[key]['en'];
  };

  return (
    <div className="relative min-h-screen w-full text-slate-800 dark:text-white">
      <WeatherBackground
        baseCondition={condition}
        hoverCondition={backgroundOverride}
        theme={theme}
      />
      
      <div className="relative z-10 flex flex-col min-h-screen p-4 sm:p-6">
        <Header 
          onHomeClick={handleHome}
          onOpenSettings={() => setSettingsModalOpen(true)}
          onOpenLanguage={() => setLanguageModalOpen(true)}
        />

        <main className="flex-grow flex flex-col items-center justify-center text-center pt-20 sm:pt-24">
          <div className="w-full max-w-md">
            {/* Initial state: Mascot and welcome text */}
            {!isLoading && !error && !currentWeather && (
              <>
                <Mascot />
                <div className="animate-fade-in mt-4">
                  <h1 className="text-3xl sm:text-4xl font-bold text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]">I'm Stormy, your weather guide!</h1>
                  <p className="text-white/90 mt-1 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">Where are we looking up the weather for today?</p>
                </div>
              </>
            )}

            {/* Loading state: Skeleton UI */}
            {isLoading && (
              <div className="animate-fade-in">
                <WeatherCardSkeleton />
                <ForecastSkeleton />
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="mt-8 bg-red-500/30 backdrop-blur-sm border border-red-500/50 p-4 rounded-lg animate-fade-in text-white dark:text-red-200">
                <p className="font-bold">Oh no!</p>
                <p>{error}</p>
              </div>
            )}
            
            {/* Success state: Weather data */}
            {!isLoading && !error && currentWeather && forecast && (
              <div className="animate-fade-in">
                <WeatherCard weather={currentWeather} units={units} t={t} />
                <Forecast 
                  forecast={forecast} 
                  units={units} 
                  onDaySelect={(day) => setSelectedDay(day)}
                  onHover={(condition) => setBackgroundOverride(condition)}
                  onLeave={() => setBackgroundOverride(null)}
                />
              </div>
            )}
          </div>
        </main>
        
        <div className="w-full max-w-lg mx-auto pb-4 mt-auto">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} t={t}/>
          {!isChatOpen && currentWeather && (
            <button
                onClick={() => setIsChatOpen(true)}
                className="w-full mt-4 bg-cyan-500/90 hover:bg-cyan-500 text-white font-bold p-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm animate-fade-in"
                aria-label="Ask Stormy about the weather"
            >
                <ChatIcon />
                <span>Ask Stormy about the weather</span>
            </button>
          )}
        </div>
      </div>

      <SettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        currentUnits={units}
        onToggleUnits={() => setUnits(units === 'celsius' ? 'fahrenheit' : 'celsius')}
        currentTheme={theme}
        onSetTheme={(newTheme) => {
          setTheme(newTheme);
          setSettingsModalOpen(false);
        }}
      />
       <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setLanguageModalOpen(false)}
        currentLanguage={language}
        onSelectLanguage={setLanguage}
      />
      {selectedDay && (
        <HourlyForecastModal
          day={selectedDay}
          units={units}
          onClose={() => setSelectedDay(null)}
        />
      )}

      {isChatOpen && (
          <Chatbot
              onClose={() => setIsChatOpen(false)}
              currentWeather={currentWeather}
              forecast={forecast}
          />
      )}
    </div>
  );
};

export default App;
