
import type { WeatherApiResponse, ForecastDay, CurrentWeather, HourlyData } from '../types';

interface FetchWeatherParams {
  location: string;
  startDate: string;
  endDate?: string;
  weather?: string;
  language: string;
  units: 'celsius' | 'fahrenheit';
}

// --- MOCK DATA GENERATION ---

const weatherPool = [
  { condition: 'Sunny', tempRange: [25, 35], humidityRange: [40, 60], windRange: [5, 15] },
  { condition: 'Partly Cloudy', tempRange: [22, 30], humidityRange: [50, 70], windRange: [10, 20] },
  { condition: 'Cloudy', tempRange: [18, 25], humidityRange: [60, 80], windRange: [15, 25] },
  { condition: 'Rain', tempRange: [15, 22], humidityRange: [75, 95], windRange: [20, 30] },
  { condition: 'Thunderstorm', tempRange: [20, 28], humidityRange: [80, 100], windRange: [25, 40] },
  { condition: 'Snow', tempRange: [-5, 2], humidityRange: [80, 100], windRange: [15, 25] },
  { condition: 'Foggy', tempRange: [10, 18], humidityRange: [90, 100], windRange: [0, 10] },
];

const locationsWithoutSnow = ['cairo', 'dubai', 'sahara', 'bangkok', 'singapore', 'riyadh', 'miami'];

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFromPool = <T>(pool: T[]): T => {
    return pool[Math.floor(Math.random() * pool.length)];
}

const convertCelsiusToFahrenheit = (c: number): number => Math.round(c * 9/5 + 32);
const convertKmhToMph = (kmh: number): number => Math.round(kmh / 1.609);

const generateMockHourlyData = (dayHigh: number, dayLow: number, condition: string): HourlyData[] => {
    const hourly: HourlyData[] = [];
    const tempAmplitude = (dayHigh - dayLow) / 2;
    const averageTemp = dayLow + tempAmplitude;
    
    for (let i = 0; i < 24; i++) {
        // Simulate a sine wave for temperature variation through the day
        // Peaks around 2 PM (hour 14)
        const sineValue = Math.sin((i - 8) * (Math.PI / 12)); 
        const temperature = Math.round(averageTemp + sineValue * tempAmplitude);
        
        hourly.push({
            time: `${String(i).padStart(2, '0')}:00`,
            temperature,
            condition: condition, // Keep condition consistent for the day for simplicity
        });
    }
    return hourly;
};


const generateMockWeatherData = (params: FetchWeatherParams): WeatherApiResponse | null => {
    const { location, startDate, endDate, weather, language, units } = params;
    
    // Realism Check: If user asks for snow in a hot place, return null to simulate "not found".
    if (weather?.toLowerCase() === 'snow' && locationsWithoutSnow.some(l => location.toLowerCase().includes(l))) {
        console.log(`Simulating "not found" for snow in ${location}`);
        return null;
    }

    // Determine the weather type for the CURRENT day. If a filter is applied, use it.
    const requestedWeatherType = weather ? weatherPool.find(w => w.condition.toLowerCase() === weather.toLowerCase()) : undefined;
    const currentWeatherType = requestedWeatherType || getRandomFromPool(weatherPool);
    
    let currentTemp = getRandomInt(currentWeatherType.tempRange[0], currentWeatherType.tempRange[1]);
    let currentLow = currentTemp - getRandomInt(3, 8);
    let currentHigh = currentTemp + getRandomInt(3, 8);
    let currentWind = getRandomInt(currentWeatherType.windRange[0], currentWeatherType.windRange[1]);

    const currentWeather: CurrentWeather = {
        location: location.split(',')[0].trim().replace(/\b\w/g, l => l.toUpperCase()),
        temperature: units === 'fahrenheit' ? convertCelsiusToFahrenheit(currentTemp) : currentTemp,
        condition: currentWeatherType.condition,
        humidity: getRandomInt(currentWeatherType.humidityRange[0], currentWeatherType.humidityRange[1]),
        windSpeed: units === 'fahrenheit' ? convertKmhToMph(currentWind) : currentWind,
        high: units === 'fahrenheit' ? convertCelsiusToFahrenheit(currentHigh) : currentHigh,
        low: units === 'fahrenheit' ? convertCelsiusToFahrenheit(currentLow) : currentLow,
    };

    // Determine forecast length
    let numDays = 5;
    if (endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        // +1 to include the end date itself. Forecast starts the day after current.
        numDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    
    // Generate a full, random forecast first
    const fullForecast: ForecastDay[] = [];
    for (let i = 1; i <= numDays; i++) {
        const forecastDate = new Date(startDate);
        // Adjust for timezone offset to prevent date from shifting
        const timezoneOffset = forecastDate.getTimezoneOffset() * 60000;
        forecastDate.setTime(forecastDate.getTime() + timezoneOffset);
        forecastDate.setDate(forecastDate.getDate() + i);

        // Always randomize weather for each forecast day to create a varied base forecast
        const dayWeatherType = getRandomFromPool(weatherPool);
        
        const dayHigh = getRandomInt(dayWeatherType.tempRange[0], dayWeatherType.tempRange[1]);
        const dayLow = dayHigh - getRandomInt(8, 15);

        const hourlyData = generateMockHourlyData(dayHigh, dayLow, dayWeatherType.condition);
        
        // Convert hourly data if needed
        const processedHourlyData = hourlyData.map(h => ({
            ...h,
            temperature: units === 'fahrenheit' ? convertCelsiusToFahrenheit(h.temperature) : h.temperature,
        }));

        fullForecast.push({
            day: new Intl.DateTimeFormat(language, { weekday: 'short' }).format(forecastDate),
            date: forecastDate.toISOString().split('T')[0],
            high: units === 'fahrenheit' ? convertCelsiusToFahrenheit(dayHigh) : dayHigh,
            low: units === 'fahrenheit' ? convertCelsiusToFahrenheit(dayLow) : dayLow,
            condition: dayWeatherType.condition,
            hourly: processedHourlyData,
        });
    }

    // Now, filter the generated forecast if a weather condition was specified
    const finalForecast = weather
        ? fullForecast.filter(day => day.condition.toLowerCase() === weather.toLowerCase())
        : fullForecast;

    return { currentWeather, forecast: finalForecast };
};


/**
 * Creates a unique cache key based on the search parameters.
 * Normalizes location to prevent cache misses due to casing.
 * @param params - The weather search parameters.
 * @returns A unique string key for caching.
 */
const createCacheKey = (params: FetchWeatherParams): string => {
  const { location, startDate, endDate = '', weather = '', language, units } = params;
  return `weather-cache-${location.toLowerCase().trim()}-${startDate}-${endDate}-${weather}-${language}-${units}`;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchWeatherData = async (params: FetchWeatherParams): Promise<WeatherApiResponse | null> => {
  const cacheKey = createCacheKey(params);

  // 1. Check the session cache first
  try {
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      console.log("Serving weather data from cache:", cacheKey);
      // Check for a cached "not found" response
      if (cachedData === 'null') return null;
      return JSON.parse(cachedData) as WeatherApiResponse;
    }
  } catch (error) {
    console.error("Error reading from session storage cache:", error);
  }
  
  // 2. If not cached, generate mock data
  try {
    // Simulate network delay for a better UX, allowing the skeleton to be seen
    await sleep(getRandomInt(800, 1500)); 

    const weatherData = generateMockWeatherData(params);
    
    // Handle the "not found" case from the generator (e.g. snow in Cairo)
    if (weatherData === null) {
      try {
        // Cache the "not found" result to be consistent
        sessionStorage.setItem(cacheKey, 'null');
        console.log("Stored 'not found' in cache:", cacheKey);
      } catch (error) {
        console.error("Error writing 'not found' to cache:", error);
      }
      return null;
    }
    
    if (!weatherData.currentWeather || !weatherData.forecast) {
        console.error("Generated mock data is missing required fields.");
        return null;
    }
    
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(weatherData));
      console.log("Stored new mock weather data in cache:", cacheKey);
    } catch (error) {
      console.error("Error writing to session storage cache:", error);
    }

    return weatherData;

  } catch (error) {
    console.error('Error generating mock weather data:', error);
    // This is unlikely to happen with mock data, but good practice to keep.
    throw new Error('Failed to generate mock weather data.');
  }
};
