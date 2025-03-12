import { z } from "zod"
import { j, publicProcedure } from "../jstack"
import { Weather } from "@/models/weather"

//Expected response interface from the api
interface APIWeatherResponse {
  coord: {
    lon: number
    lat: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  },
  name: string
}

//Response interface for the client
interface WeatherResponse {
  data?: Weather
  error?: string
}

//Router for the weather api
export const weatherRouter = j.router({
  fetch: publicProcedure
    .input(z.object({
      name: z.string()
    }))
    .query(async ({ c, input }) => {
      //Get the api key from the environment variables
      const API_KEY = process.env.API_KEY;
      if (!API_KEY) {
        return c.json({ error: 'OpenWeather API key not configured' } as WeatherResponse);
      }

      //Set the url for the api call with the name encoded, with the correct api key and units set to metric
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(input.name)}&appid=${API_KEY}&units=metric`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          if (response.status === 404) {
            return c.json({ error: 'City not found' } as WeatherResponse);
          }
          const errorData: { message: string } = await response.json();
          return c.json({ error: `Weather API error: ${errorData.message}` } as WeatherResponse);
        }

        const data: APIWeatherResponse = await response.json();

        if (!data.weather?.[0]) {
          //Not sure if this can actually happen, but because we return, typescript won't complain about accessing this array index
          return c.json({ error: 'Weather data is missing' } as WeatherResponse);
        }

        //Success return the data
        return c.json({
          data: {
            cityName: data.name,
            temperature: data.main.temp,
            condition: data.weather[0].main,
            conditionIcon: 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '.png',
            description: data.weather[0].description,
          }
        } as WeatherResponse);
      } catch (error: any) {
        return c.json({ error: `Weather API error: ${error.message}` } as WeatherResponse);
      }
    }),
})
