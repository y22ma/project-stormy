
import React from 'react';
import type { ForecastDay } from '../types';
import WeatherIcon from './WeatherIcon';

interface ForecastProps {
  forecast: ForecastDay[];
  units: 'celsius' | 'fahrenheit';
  onDaySelect: (day: ForecastDay) => void;
  onHover: (condition: string) => void;
  onLeave: () => void;
}

const ForecastCard: React.FC<{
  day: ForecastDay,
  units: 'celsius' | 'fahrenheit',
  onDaySelect: (day: ForecastDay) => void,
  onHover: (condition: string) => void;
  onLeave: () => void;
}> = ({ day, units, onDaySelect, onHover, onLeave }) => {
    const unitSymbol = units === 'celsius' ? '°C' : '°F';
    return (
        <button
            onClick={() => onDaySelect(day)}
            onMouseEnter={() => onHover(day.condition)}
            onMouseLeave={onLeave}
            className="flex-1 flex flex-col items-center gap-2 p-4 bg-black/5 dark:bg-black/10 backdrop-blur-sm rounded-2xl border border-black/10 dark:border-white/10 min-w-[100px] text-left w-full hover:bg-black/10 dark:hover:bg-black/30 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
            <p className="font-bold text-slate-700 dark:text-slate-200">{day.day.substring(0, 3)}</p>
            <div className="w-14 h-14 my-1">
            <WeatherIcon condition={day.condition} />
            </div>
            <div className="flex gap-2 text-md">
            <span className="font-bold text-slate-800 dark:text-white">{day.high}{unitSymbol}</span>
            <span className="text-slate-600 dark:text-slate-300">{day.low}{unitSymbol}</span>
            </div>
        </button>
    );
};


const Forecast: React.FC<ForecastProps> = ({ forecast, units, onDaySelect, onHover, onLeave }) => {
  return (
    <div className="w-full mt-8">
      <div className="flex flex-row gap-3 sm:gap-4 overflow-x-auto pb-2">
        {forecast.map((day, index) => (
          <ForecastCard key={index} day={day} units={units} onDaySelect={onDaySelect} onHover={onHover} onLeave={onLeave}/>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
