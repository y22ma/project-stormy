import React, { useState, useMemo } from 'react';
import type { ForecastDay, HourlyData } from '../types';
import WeatherIcon from './WeatherIcon';

interface HourlyForecastModalProps {
  day: ForecastDay;
  units: 'celsius' | 'fahrenheit';
  onClose: () => void;
}

const HourlyCard: React.FC<{
  hour: HourlyData;
  isSelected: boolean;
  onClick: () => void;
  units: 'celsius' | 'fahrenheit';
}> = ({ hour, isSelected, onClick, units }) => {
  const unitSymbol = units === 'celsius' ? '°C' : '°F';
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 flex flex-col items-center gap-1 p-3 rounded-lg w-20 transition-all duration-200 ${
        isSelected
          ? 'bg-cyan-400/30 dark:bg-cyan-400/30 ring-2 ring-cyan-400'
          : 'bg-black/5 dark:bg-black/20 hover:bg-black/10 dark:hover:bg-black/30'
      }`}
    >
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{hour.time}</span>
      <div className="w-10 h-10 my-1">
        <WeatherIcon condition={hour.condition} />
      </div>
      <span className="font-bold text-slate-800 dark:text-white">{hour.temperature}{unitSymbol}</span>
    </button>
  );
};

const TemperatureChart: React.FC<{
    hourlyData: HourlyData[];
    selectedIndex: number;
    units: 'celsius' | 'fahrenheit';
}> = ({ hourlyData, selectedIndex, units }) => {
    const unitSymbol = units === 'celsius' ? '°C' : '°F';
    const chartData = useMemo(() => {
        if (hourlyData.length < 2) return null;

        const temps = hourlyData.map(h => h.temperature);
        const minTemp = Math.min(...temps);
        const maxTemp = Math.max(...temps);
        const tempRange = maxTemp - minTemp;
        
        // Add padding to the range to avoid points touching the SVG edges
        const paddedMin = minTemp - (tempRange === 0 ? 5 : tempRange * 0.2);
        const paddedMax = maxTemp + (tempRange === 0 ? 5 : tempRange * 0.2);
        const displayRange = paddedMax - paddedMin;

        const svgWidth = 500;
        const svgHeight = 150;
        const padding = { top: 20, right: 20, bottom: 30, left: 35 };

        const chartWidth = svgWidth - padding.left - padding.right;
        const chartHeight = svgHeight - padding.top - padding.bottom;

        const getX = (index: number) => padding.left + (index / (hourlyData.length - 1)) * chartWidth;
        const getY = (temp: number) => padding.top + chartHeight - ((temp - paddedMin) / displayRange) * chartHeight;

        const points = hourlyData.map((hour, index) => ({
            x: getX(index),
            y: getY(hour.temperature),
            temp: hour.temperature,
            time: hour.time,
        }));

        const pathD = points.map((p, i) => (i === 0 ? 'M' : 'L') + `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
        const areaPathD = pathD + ` L ${points[points.length - 1].x.toFixed(2)} ${svgHeight - padding.bottom} L ${points[0].x.toFixed(2)} ${svgHeight - padding.bottom} Z`;

        const yAxisLabels = [
            { value: Math.ceil(maxTemp), y: getY(Math.ceil(maxTemp)) },
            { value: Math.floor(minTemp), y: getY(Math.floor(minTemp)) },
        ];
        
        const xAxisLabels = hourlyData.filter((_, i) => i % 6 === 0 || i === hourlyData.length -1).map((h, index) => {
            const actualIndex = hourlyData.indexOf(h);
            return {
                value: h.time,
                x: getX(actualIndex),
            }
        });

        return { svgWidth, svgHeight, pathD, areaPathD, points, padding, yAxisLabels, xAxisLabels };
    }, [hourlyData]);

    if (!chartData) return null;
    const { svgWidth, svgHeight, pathD, areaPathD, points, padding, yAxisLabels, xAxisLabels } = chartData;

    return (
        <div className="mt-6">
            <h3 className="font-bold text-lg mb-2 text-slate-700 dark:text-slate-200">Temperature Summary</h3>
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto text-slate-800 dark:text-white" aria-label="Hourly temperature chart">
                <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" className="text-cyan-400" stopOpacity="0.3" />
                        <stop offset="100%" className="text-cyan-400" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Y-Axis Labels & Grid Lines */}
                {yAxisLabels.map(label => (
                    <g key={label.value}>
                        <text x={padding.left - 8} y={label.y} textAnchor="end" alignmentBaseline="middle" className="text-xs fill-current text-slate-500 dark:text-slate-400">
                            {label.value}{unitSymbol}
                        </text>
                        <line x1={padding.left} y1={label.y} x2={svgWidth - padding.right} y2={label.y} className="stroke-current text-slate-200 dark:text-slate-700" strokeWidth="1" strokeDasharray="2,3"/>
                    </g>
                ))}
                
                 {/* X-Axis Labels */}
                {xAxisLabels.map(label => (
                    <text key={label.value} x={label.x} y={svgHeight - padding.bottom + 15} textAnchor="middle" className="text-xs fill-current text-slate-500 dark:text-slate-400">
                        {label.value}
                    </text>
                ))}

                {/* Gradient Area */}
                <path d={areaPathD} fill="url(#areaGradient)" />

                {/* Temperature Line */}
                <path d={pathD} fill="none" className="stroke-cyan-500 dark:stroke-cyan-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                {/* Data Points */}
                {points.map((p, index) => (
                    <circle
                        key={index}
                        cx={p.x}
                        cy={p.y}
                        r={index === selectedIndex ? 5 : 3}
                        className={`transition-all duration-300 ${index === selectedIndex ? 'fill-cyan-500 dark:fill-cyan-400 stroke-white dark:stroke-slate-800' : 'fill-white dark:fill-slate-600 stroke-cyan-500/50'}`}
                        strokeWidth="1.5"
                    />
                ))}
            </svg>
        </div>
    );
};


const HourlyForecastModal: React.FC<HourlyForecastModalProps> = ({ day, units, onClose }) => {
  const [selectedHourIndex, setSelectedHourIndex] = useState(new Date().getHours());

  if (!day.hourly || day.hourly.length === 0) {
    return (
       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-lg m-4 text-center" onClick={e => e.stopPropagation()}>
           <h3 className="text-xl font-bold mb-4">Hourly Forecast</h3>
           <p className="text-slate-600 dark:text-slate-300">No hourly data available for this day.</p>
           <button onClick={onClose} className="mt-6 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-bold py-2 px-4 rounded-lg transition-colors">
            Close
          </button>
        </div>
      </div>
    );
  }

  const selectedHour = day.hourly[selectedHourIndex] ?? day.hourly[0];
  const unitSymbol = units === 'celsius' ? '°C' : '°F';
  const formattedDate = new Date(day.date).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
      <div
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-4 sm:p-6 w-full max-w-2xl text-slate-800 dark:text-white border border-white/20 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">Hourly Forecast</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">{formattedDate}</p>
          </div>
          <button onClick={onClose} className="p-2 -mt-2 -mr-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-around text-center sm:text-left p-4 mb-4 rounded-lg bg-black/5 dark:bg-black/20">
            <div className="flex items-center gap-4">
                 <div className="w-20 h-20">
                    <WeatherIcon condition={selectedHour.condition} />
                </div>
                <div>
                    <p className="text-5xl font-bold">{selectedHour.temperature}{unitSymbol}</p>
                    <p className="text-lg capitalize text-slate-700 dark:text-slate-200">{selectedHour.condition}</p>
                </div>
            </div>
            <div className="text-lg mt-4 sm:mt-0 font-semibold">{selectedHour.time}</div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-3">
          {day.hourly.map((hour, index) => (
            <HourlyCard
              key={index}
              hour={hour}
              isSelected={index === selectedHourIndex}
              onClick={() => setSelectedHourIndex(index)}
              units={units}
            />
          ))}
        </div>

        <TemperatureChart hourlyData={day.hourly} selectedIndex={selectedHourIndex} units={units} />

      </div>
    </div>
  );
};

export default HourlyForecastModal;