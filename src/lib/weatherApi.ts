import axios from 'axios';
import { WeatherData } from '../types';

const API_KEY = import.meta.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeatherData(city: string, state: string, date: string): Promise<WeatherData | null> {
  try {
    // For current weather (if date is today or in the future)
    const today = new Date().toISOString().split('T')[0];
    const isCurrentOrFuture = date >= today;
    
    if (isCurrentOrFuture && API_KEY && API_KEY !== 'your-openweather-api-key') {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: `${city},${state},US`,
          appid: API_KEY,
          units: 'imperial'
        }
      });
      
      return {
        temperature: response.data.main.temp,
        conditions: response.data.weather[0].description,
        windSpeed: response.data.wind.speed,
        icon: response.data.weather[0].icon
      };
    } else {
      // For historical data or when API key is not set, return simulated data
      const weatherData = {
        temperature: Math.floor(Math.random() * 30) + 50, // Random temp between 50-80°F
        conditions: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 4)],
        windSpeed: Math.floor(Math.random() * 15) + 1, // Random wind speed 1-15 mph
        icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)]
      };
      
      return weatherData;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Return simulated data as fallback
    return {
      temperature: Math.floor(Math.random() * 30) + 50,
      conditions: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 4)],
      windSpeed: Math.floor(Math.random() * 15) + 1,
      icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)]
    };
  }
}