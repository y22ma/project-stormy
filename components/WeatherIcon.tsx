
import React from 'react';

interface WeatherIconProps {
  condition: string;
}

const SunnyIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full text-yellow-400">
    <path d="M32,18.7c-7.4,0-13.3,6-13.3,13.3s6,13.3,13.3,13.3s13.3-6,13.3-13.3S39.4,18.7,32,18.7z" fill="currentColor"/>
    <path d="M32,15V9.4" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/>
    <path d="M32,48.6V55" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/>
    <path d="M18,32H9.4" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/>
    <path d="M54.6,32H46" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/>
    <line x1="21.5" y1="21.5" x2="16.9" y2="16.9" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/>
    <line x1="47.1" y1="47.1" x2="42.5" y2="42.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/>
    <line x1="21.5" y1="42.5" x2="16.9" y2="47.1" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/>
    <line x1="47.1" y1="16.9" x2="42.5" y2="21.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/>
  </svg>
);

const CloudyIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full text-slate-300">
    <path d="M47.7,21.9c-0.2-2.8-1.1-5.3-2.8-7.5c-1.7-2.2-4-3.7-6.8-4.3c-2.7-0.6-5.5-0.2-8,1c-2.5,1.2-4.5,3.2-5.9,5.6 c-1.4,2.4-2,5.1-1.7,7.8c-2.5,0-4.8,0.7-6.7,2.2c-2,1.5-3.4,3.6-4.1,6c-0.7,2.4-0.6,5,0.4,7.3c1,2.3,2.8,4.2,5.1,5.3 c2.3,1.1,4.9,1.4,7.4,0.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
    <path d="M52.8,32.4c1.9-0.3,3.8,0.3,5.1,1.7c1.3,1.4,2,3.3,1.8,5.2c-0.2,1.9-1.1,3.7-2.6,4.8 c-1.5,1.2-3.4,1.7-5.3,1.4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
    <path d="M37.9,48.4c-0.1,0-0.2,0-0.3,0c-5.1,0-9.2-4.1-9.2-9.2c0-4.3,3-7.9,6.9-8.9" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
  </svg>
);

const PartlyCloudyIcon = () => (
    <svg viewBox="0 0 64 64" className="w-full h-full">
        <path d="M32 20.7c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11" fill="#fcc419"/>
        <path d="M32 18v-5m0 29v5m-11-14.5h-5m27 0h-5m-7.8-7.8l-3.5-3.5m11.3 11.3l-3.5-3.5m-7.8 0l-3.5 3.5m11.3-11.3l-3.5 3.5" fill="none" stroke="#fcc419" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/>
        <path d="M47.7 33.9c-0.2-2.8-1.1-5.3-2.8-7.5 -1.7-2.2-4-3.7-6.8-4.3 -2.7-0.6-5.5-0.2-8 1 -2.5 1.2-4.5 3.2-5.9 5.6 -1.4 2.4-2 5.1-1.7 7.8 -2.5 0-4.8 0.7-6.7 2.2 -2 1.5-3.4 3.6-4.1 6 -0.7 2.4-0.6 5 0.4 7.3 1 2.3 2.8 4.2 5.1 5.3 2.3 1.1 4.9 1.4 7.4 0.8" fill="#e0e7ff" stroke="#e0e7ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
    </svg>
);

const RainIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full text-blue-400">
    <path d="M47.7,21.9c-0.2-2.8-1.1-5.3-2.8-7.5c-1.7-2.2-4-3.7-6.8-4.3c-2.7-0.6-5.5-0.2-8,1c-2.5,1.2-4.5,3.2-5.9,5.6 c-1.4,2.4-2,5.1-1.7,7.8c-2.5,0-4.8,0.7-6.7,2.2c-2,1.5-3.4,3.6-4.1,6c-0.7,2.4-0.6,5,0.4,7.3c1,2.3,2.8,4.2,5.1,5.3 c2.3,1.1,4.9,1.4,7.4,0.8" fill="none" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
    <line x1="24" y1="48" x2="24" y2="55" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/>
    <line x1="32" y1="48" x2="32" y2="55" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/>
    <line x1="40" y1="48" x2="40" y2="55" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/>
  </svg>
);

const ThunderstormIcon = () => (
    <svg viewBox="0 0 64 64" className="w-full h-full text-yellow-400">
        <path d="M47.7,21.9c-0.2-2.8-1.1-5.3-2.8-7.5c-1.7-2.2-4-3.7-6.8-4.3c-2.7-0.6-5.5-0.2-8,1c-2.5,1.2-4.5,3.2-5.9,5.6 c-1.4,2.4-2,5.1-1.7,7.8c-2.5,0-4.8,0.7-6.7,2.2c-2,1.5-3.4,3.6-4.1,6c-0.7,2.4-0.6,5,0.4,7.3c1,2.3,2.8,4.2,5.1,5.3 c2.3,1.1,4.9,1.4,7.4,0.8" fill="none" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
        <polyline points="32,40 28,46 34,46 30,52" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
    </svg>
);


const SnowIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full text-sky-200">
    <path d="M47.7,21.9c-0.2-2.8-1.1-5.3-2.8-7.5c-1.7-2.2-4-3.7-6.8-4.3c-2.7-0.6-5.5-0.2-8,1c-2.5,1.2-4.5,3.2-5.9,5.6 c-1.4,2.4-2,5.1-1.7,7.8c-2.5,0-4.8,0.7-6.7,2.2c-2,1.5-3.4,3.6-4.1,6c-0.7,2.4-0.6,5,0.4,7.3c1,2.3,2.8,4.2,5.1,5.3 c2.3,1.1,4.9,1.4,7.4,0.8" fill="none" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
    <path d="M24,51.5l-3-3l3-3 M21,48.5h6 M24,45.5v6" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
    <path d="M34,51.5l-3-3l3-3 M31,48.5h6 M34,45.5v6" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
    <path d="M44,51.5l-3-3l3-3 M41,48.5h6 M44,45.5v6" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
  </svg>
);

const FogIcon = () => (
    <svg viewBox="0 0 64 64" className="w-full h-full text-slate-400">
        <path d="M22.4,44h19.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
        <path d="M20.1,38h23.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
        <path d="M17.7,32h28.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
        <path d="M47.7,21.9c-0.2-2.8-1.1-5.3-2.8-7.5c-1.7-2.2-4-3.7-6.8-4.3c-2.7-0.6-5.5-0.2-8,1c-2.5,1.2-4.5,3.2-5.9,5.6 c-1.4,2.4-2,5.1-1.7,7.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
    </svg>
);


const WeatherIcon: React.FC<WeatherIconProps> = ({ condition }) => {
  const normalizedCondition = condition.toLowerCase();

  if (normalizedCondition.includes('thunder') || normalizedCondition.includes('storm')) {
    return <ThunderstormIcon />;
  }
  if (normalizedCondition.includes('rain') || normalizedCondition.includes('drizzle') || normalizedCondition.includes('shower')) {
    return <RainIcon />;
  }
  if (normalizedCondition.includes('snow') || normalizedCondition.includes('sleet') || normalizedCondition.includes('flurr')) {
    return <SnowIcon />;
  }
  if (normalizedCondition.includes('sun') || normalizedCondition.includes('clear')) {
    return <SunnyIcon />;
  }
  if (normalizedCondition.includes('partly cloudy')) {
    return <PartlyCloudyIcon />;
  }
   if (normalizedCondition.includes('fog') || normalizedCondition.includes('mist') || normalizedCondition.includes('haze')) {
    return <FogIcon />;
  }
  if (normalizedCondition.includes('cloud') || normalizedCondition.includes('overcast')) {
    return <CloudyIcon />;
  }
  
  return <CloudyIcon />; // Default icon
};

export default WeatherIcon;
