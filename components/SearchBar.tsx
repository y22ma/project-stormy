import React, { useState, useRef, useEffect, useMemo } from 'react';
import { TranslationKey, translations } from '../utils/translations';

interface SearchBarProps {
  onSearch: (params: { location: string; startDate: string; endDate: string; weather: string }) => void;
  isLoading: boolean;
  t: (key: TranslationKey) => string;
}

const staticSuggestedLocations = ["New York", "London", "Tokyo", "Paris", "Sydney", "Cairo"];
const weatherOptions = ["Any", "Sunny", "Cloudy", "Rain", "Snow", "Thunderstorm", "Foggy"];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading, t }) => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [weather, setWeather] = useState('');
  const [isLocationFocused, setLocationFocused] = useState(false);

  const searchBarRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setLocationFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ location, startDate, endDate, weather: weather === 'Any' ? '' : weather });
    setLocationFocused(false);
  };
  
  const handleSuggestionClick = (loc: string) => {
      setLocation(loc);
      setLocationFocused(false);
  }
  
  const today = new Date().toISOString().split('T')[0];

  const maxEndDate = useMemo(() => {
    if (!startDate) return '';
    const start = new Date(startDate);
    // Limit end date to one year after start date
    start.setFullYear(start.getFullYear() + 1);
    return start.toISOString().split('T')[0];
  }, [startDate]);

  return (
    <form ref={searchBarRef} onSubmit={handleSubmit} className="w-full mx-auto p-4 bg-white/60 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-white/20">
      <div className="flex flex-col gap-3">
        
        {/* Location Input with Suggestions */}
        <div className="relative">
          <label htmlFor="location-input" className="text-sm font-bold text-slate-600 dark:text-slate-300 ml-1">{t('locationPlaceholder')}</label>
          <input
            id="location-input"
            type="text"
            value={location}
            onFocus={() => setLocationFocused(true)}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search for a city..."
            className="w-full mt-1 p-3 bg-slate-200/50 dark:bg-black/20 rounded-lg border-none focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all duration-300 placeholder-slate-500 dark:placeholder-slate-400 text-base"
            disabled={isLoading}
            aria-label="Location search"
            required
            autoComplete="off"
          />
          {isLocationFocused && (
            <div className="absolute z-10 top-full left-0 right-0 mt-2 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-lg shadow-xl animate-fade-in">
                <p className="text-xs text-slate-500 dark:text-slate-400 px-2 pb-1 font-semibold">Popular cities</p>
                <div className="flex flex-wrap gap-2">
                    {staticSuggestedLocations.map(loc => (
                        <button key={loc} type="button" onClick={() => handleSuggestionClick(loc)} className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-700 hover:bg-cyan-400 dark:hover:bg-cyan-500 hover:text-white dark:hover:text-black rounded-full transition-colors">
                            {loc}
                        </button>
                    ))}
                </div>
            </div>
          )}
        </div>

        {/* Date Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="start-date-input" className="text-sm font-bold text-slate-600 dark:text-slate-300 ml-1">{t('startDatePlaceholder')}</label>
                {startDate && (
                  <button type="button" onClick={() => { setStartDate(''); setEndDate(''); }} className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline pr-1">
                    Reset
                  </button>
                )}
              </div>
              <input
                id="start-date-input"
                type="date"
                value={startDate}
                min={today}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full mt-1 p-3 bg-slate-200/50 dark:bg-black/20 rounded-lg border-none focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all duration-300 placeholder-slate-500 dark:placeholder-slate-400 text-base"
                disabled={isLoading}
                aria-label="Start date search"
                required
              />
            </div>
             <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="end-date-input" className="text-sm font-bold text-slate-600 dark:text-slate-300 ml-1">{t('endDatePlaceholder')}</label>
                  {endDate && (
                    <button type="button" onClick={() => setEndDate('')} className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline pr-1">
                      Reset
                    </button>
                  )}
                </div>
              <input
                id="end-date-input"
                type="date"
                value={endDate}
                min={startDate || today}
                max={maxEndDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full mt-1 p-3 bg-slate-200/50 dark:bg-black/20 rounded-lg border-none focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all duration-300 placeholder-slate-500 dark:placeholder-slate-400 text-base disabled:opacity-50"
                disabled={isLoading || !startDate}
                aria-label="End date search"
              />
            </div>
        </div>

        {/* Weather Select */}
        <div>
            <label htmlFor="weather-select" className="text-sm font-bold text-slate-600 dark:text-slate-300 ml-1">{t('weatherPlaceholder')}</label>
            <div className="relative mt-1">
                <select
                    id="weather-select"
                    value={weather}
                    onChange={(e) => setWeather(e.target.value)}
                    className="w-full p-3 bg-black dark:bg-black text-white rounded-lg border-none focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all duration-300 appearance-none text-base"
                    disabled={isLoading}
                    aria-label="Weather condition search"
                >
                    {weatherOptions.map(option => (
                        <option key={option} value={option} className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white">{t(`weather${option}` as TranslationKey) || option}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 dark:bg-white/90 dark:hover:bg-white text-white dark:text-slate-800 font-bold p-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-2"
          disabled={isLoading || !location || !startDate}
          aria-label="Search"
        >
          {isLoading ? (
              <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
          ) : (
             <span className="flex items-center gap-2">
                 {t('searchButton')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
             </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;