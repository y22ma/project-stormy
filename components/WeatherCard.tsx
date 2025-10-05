import React from 'react';
import type { CurrentWeather } from '../types';
import type { TranslationKey } from '../utils/translations';

interface WeatherCardProps {
  weather: CurrentWeather;
  units: 'celsius' | 'fahrenheit';
  t: (key: TranslationKey) => string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, units, t }) => {
  const unitSymbol = units === 'celsius' ? '°C' : '°F';
  const speedUnit = units === 'celsius' ? 'km/h' : 'mph';

  // Tailwind JIT classes for text shadow to ensure readability on any background
  const textShadow = '[text-shadow:0_2px_4px_rgba(0,0,0,0.5)]';
  const largeTextShadow = '[text-shadow:0_3px_6px_rgba(0,0,0,0.5)]';
  const smallTextShadow = '[text-shadow:0_1px_3px_rgba(0,0,0,0.6)]';

  return (
    <div className="flex flex-col items-center justify-center text-center mt-4">
      <h2 className={`text-3xl sm:text-4xl font-bold text-white tracking-wide ${textShadow}`}>{weather.location}</h2>
      <p className={`text-lg capitalize text-white/90 ${smallTextShadow}`}>{weather.condition}</p>
      
      <div className={`text-8xl sm:text-9xl font-black text-white my-2 tracking-tighter ${largeTextShadow}`}>
        {weather.temperature}°
      </div>

      <div className="flex gap-5 text-lg">
        <span className={`text-white/90 ${smallTextShadow}`}>H: {weather.high}{unitSymbol}</span>
        <span className={`text-white/80 ${smallTextShadow}`}>L: {weather.low}{unitSymbol}</span>
      </div>

       <div className="flex gap-8 text-center mt-6">
        <div>
          <p className={`text-sm text-white/80 ${smallTextShadow}`}>{t('humidity')}</p>
          <p className={`font-bold text-lg text-white ${smallTextShadow}`}>{weather.humidity}%</p>
        </div>
        <div>
          <p className={`text-sm text-white/80 ${smallTextShadow}`}>{t('wind')}</p>
          <p className={`font-bold text-lg text-white ${smallTextShadow}`}>{weather.windSpeed} {speedUnit}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
