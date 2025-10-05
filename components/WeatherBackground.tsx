
import React, { useMemo, useState, useEffect } from 'react';
import type { Theme } from '../types';

interface WeatherBackgroundProps {
  baseCondition: string | null;
  hoverCondition: string | null;
  theme: Theme;
}

const backgrounds: Record<Theme, Record<string, string>> = {
    dark: {
        default: 'from-slate-800 to-slate-900',
        sunny: 'from-sky-500 to-blue-700',
        cloudy: 'from-slate-500 to-slate-700',
        rainy: 'from-slate-700 to-gray-800',
        thunderstorm: 'from-slate-800 to-indigo-900',
        snowy: 'from-sky-300 to-slate-500',
        foggy: 'from-slate-400 to-slate-600',
    },
    light: {
        default: 'from-sky-300 to-blue-400',
        sunny: 'from-cyan-300 to-sky-500',
        cloudy: 'from-slate-300 to-slate-400',
        rainy: 'from-slate-400 to-gray-500',
        thunderstorm: 'from-slate-500 to-indigo-600',
        snowy: 'from-sky-200 to-slate-400',
        foggy: 'from-slate-300 to-slate-500',
    },
    storm: {
        default: 'from-indigo-900 via-slate-800 to-black',
        sunny: 'from-indigo-700 to-slate-900',
        cloudy: 'from-slate-800 to-slate-900',
        rainy: 'from-slate-900 via-blue-900 to-black',
        thunderstorm: 'from-black via-purple-900 to-indigo-900',
        snowy: 'from-slate-700 via-sky-800 to-slate-900',
        foggy: 'from-slate-700 to-slate-900',
    },
    sunset: {
        default: 'from-orange-400 via-red-500 to-indigo-800',
        sunny: 'from-yellow-300 via-orange-500 to-red-600',
        cloudy: 'from-orange-500 via-purple-600 to-indigo-900',
        rainy: 'from-red-600 via-indigo-700 to-slate-900',
        thunderstorm: 'from-indigo-800 via-purple-900 to-black',
        snowy: 'from-pink-400 via-indigo-500 to-slate-800',
        foggy: 'from-red-400 via-gray-600 to-indigo-800',
    },
    forest: {
        default: 'from-emerald-300 to-teal-600',
        sunny: 'from-green-300 via-cyan-400 to-emerald-600',
        cloudy: 'from-teal-400 to-slate-500',
        rainy: 'from-green-600 to-slate-700',
        thunderstorm: 'from-teal-700 to-slate-900',
        snowy: 'from-cyan-200 to-teal-500',
        foggy: 'from-slate-400 to-green-600',
    },
    ocean: {
        default: 'from-cyan-400 to-blue-600',
        sunny: 'from-sky-300 to-cyan-500',
        cloudy: 'from-blue-500 to-slate-600',
        rainy: 'from-slate-600 to-blue-800',
        thunderstorm: 'from-blue-800 to-slate-900',
        snowy: 'from-cyan-200 to-blue-400',
        foggy: 'from-slate-400 to-blue-500',
    },
    sakura: {
        default: 'from-pink-200 to-rose-300',
        sunny: 'from-rose-200 to-orange-200',
        cloudy: 'from-pink-300 to-slate-400',
        rainy: 'from-rose-400 to-slate-500',
        thunderstorm: 'from-purple-400 to-slate-600',
        snowy: 'from-pink-100 to-indigo-200',
        foggy: 'from-rose-200 to-gray-400',
    },
    synthwave: {
        default: 'from-purple-600 via-pink-500 to-cyan-400',
        sunny: 'from-yellow-400 via-orange-500 to-pink-500',
        cloudy: 'from-indigo-700 to-purple-800',
        rainy: 'from-blue-700 via-indigo-800 to-purple-900',
        thunderstorm: 'from-black via-fuchsia-800 to-indigo-900',
        snowy: 'from-cyan-300 via-purple-500 to-indigo-700',
        foggy: 'from-slate-600 via-purple-700 to-indigo-800',
    },
    mono: {
        default: 'from-gray-200 to-gray-400',
        sunny: 'from-white to-gray-300',
        cloudy: 'from-gray-400 to-gray-600',
        rainy: 'from-gray-500 to-slate-700',
        thunderstorm: 'from-slate-700 to-black',
        snowy: 'from-gray-100 to-gray-400',
        foggy: 'from-gray-300 to-gray-500',
    }
};

const Raindrop: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div className="rain-drop" style={style} />
);

const RainAnimation: React.FC = React.memo(() => {
  const drops = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        animationDuration: `${0.5 + Math.random() * 0.5}s`,
        animationDelay: `${Math.random() * 5}s`,
      };
      return <Raindrop key={i} style={style} />;
    });
  }, []);

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{drops}</div>;
});

const Snowflake: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div className="snow-flake" style={style} />
);

const SnowAnimation: React.FC = React.memo(() => {
  const flakes = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => {
      const size = 2 + Math.random() * 4;
      const style = {
        left: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${5 + Math.random() * 5}s`,
        animationDelay: `${Math.random() * 10}s`,
        opacity: `${0.4 + Math.random() * 0.6}`,
      };
      return <Snowflake key={i} style={style} />;
    });
  }, []);

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{flakes}</div>;
});

const LightningBolt: React.FC<{ style: React.CSSProperties, className: string }> = ({ style, className }) => {
    const [path, setPath] = useState('');

    const generateLightningPath = () => {
        let pathData = "M0 0";
        let x = 0;
        let y = 0;
        const segments = 15 + Math.floor(Math.random() * 5); // More segments for longer bolts
        for (let i = 0; i < segments; i++) {
            const lastX = x;
            const lastY = y;
            x += (Math.random() - 0.5) * 40;
            y += Math.random() * 50; // Taller segments for ground strikes
            pathData += ` L${x.toFixed(2)} ${y.toFixed(2)}`;

            // Branching logic
            if (Math.random() > 0.6) {
                let bx = x;
                let by = y;
                const branchSegments = 3 + Math.floor(Math.random() * 3);
                pathData += ` M${x.toFixed(2)} ${y.toFixed(2)}`;
                for (let j = 0; j < branchSegments; j++) {
                    bx += (Math.random() - 0.5) * 40;
                    by += Math.random() * 40;
                    pathData += ` L${bx.toFixed(2)} ${by.toFixed(2)}`;
                }
            }
        }
        return pathData;
    };
    
    useEffect(() => {
        setPath(generateLightningPath());
    }, []);

    return (
        <svg viewBox="-50 0 100 800" className={`lightning-bolt ${className} pointer-events-none`} style={style}>
            <path d={path} stroke="white" strokeWidth="2" fill="none" />
        </svg>
    );
};

const LightningAnimation: React.FC = React.memo(() => {
  const [bolts, setBolts] = useState<any[]>([]);

  useEffect(() => {
    const generateBolts = () => {
      const newBolts = [];
      
      // Primary Bolt
      newBolts.push({
        key: `main-${Date.now()}`,
        className: 'lightning-bolt--primary',
        style: {
          left: `${20 + Math.random() * 60}%`,
          transform: `scale(${0.9 + Math.random() * 0.4}) rotate(${-15 + Math.random() * 30}deg)`,
        }
      });

      // Secondary Bolt
      if (Math.random() > 0.3) { // 70% chance of a secondary bolt
        newBolts.push({
          key: `secondary-${Date.now()}`,
          className: 'lightning-bolt--secondary',
          style: {
            left: `${10 + Math.random() * 80}%`,
            transform: `scale(${0.4 + Math.random() * 0.3}) rotate(${-30 + Math.random() * 60}deg)`,
          }
        });
      }
      
      setBolts(newBolts);
    };

    generateBolts();
    const intervalId = setInterval(generateBolts, 8000); // Sync with CSS animation duration

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="lightning-flash" />
      {bolts.map(bolt => (
        <LightningBolt key={bolt.key} className={bolt.className} style={bolt.style} />
      ))}
    </div>
  );
});

const SunAnimation: React.FC = React.memo(() => {
    return (
        <div className="sun-container">
            <div className="sun-core" />
        </div>
    );
});


const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ baseCondition, hoverCondition, theme }) => {
  const { backgroundClass, showRain, showLightning, showSnow } = useMemo(() => {
    const condition = hoverCondition || baseCondition;
    const themeBackgrounds = backgrounds[theme];
    if (!condition) return { backgroundClass: themeBackgrounds.default, showRain: false, showLightning: false, showSnow: false };

    const normalized = condition.toLowerCase();
    
    let bgClass = themeBackgrounds.default;
    let rain = false;
    let lightning = false;
    let snow = false;

    if (normalized.includes('thunder') || normalized.includes('storm')) {
      bgClass = themeBackgrounds.thunderstorm;
      rain = true;
      lightning = true;
    } else if (normalized.includes('rain') || normalized.includes('drizzle') || normalized.includes('shower')) {
      bgClass = themeBackgrounds.rainy;
      rain = true;
    } else if (normalized.includes('sun') || normalized.includes('clear')) {
      bgClass = themeBackgrounds.sunny;
    } else if (normalized.includes('cloud') || normalized.includes('overcast')) {
       bgClass = themeBackgrounds.cloudy;
    } else if (normalized.includes('snow') || normalized.includes('sleet')) {
      bgClass = themeBackgrounds.snowy;
      snow = true;
    } else if (normalized.includes('fog') || normalized.includes('mist')) {
      bgClass = themeBackgrounds.foggy;
    }
    
    return { backgroundClass: bgClass, showRain: rain, showLightning: lightning, showSnow: snow };
  }, [baseCondition, hoverCondition, theme]);

  const showSunOnHover = useMemo(() => {
      if (!hoverCondition) return false;
      const normalized = hoverCondition.toLowerCase();
      return normalized.includes('sun') || normalized.includes('clear');
  }, [hoverCondition]);

  return (
    <div 
        className={`absolute inset-0 w-full h-full bg-gradient-to-br transition-all duration-1000 ease-in-out ${backgroundClass}`}
    >
      {showSunOnHover && <SunAnimation />}
      {showRain && <RainAnimation />}
      {showSnow && <SnowAnimation />}
      {showLightning && <LightningAnimation />}
    </div>
  );
};

export default WeatherBackground;