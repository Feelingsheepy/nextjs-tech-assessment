"use client"

import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { client } from "@/lib/client"

export const CurrentWeather = () => {
  const [cityName, setCityName] = useState<string>("")

  //Query to proxy the api request. Enabled and retry are false to only fetch the data when the user submits the form
  const { data: currentWeather, isFetching: isLoadingWeather, refetch: fetchWeather } = useQuery({
    queryKey: ["get-weather"],
    queryFn: async () => {
      const res = await client.weather.fetch.$get({ name: cityName })
      return await res.json()
    },
    enabled: false,
    retry: false,
  })

  return (
    <div className="w-full max-w-sm backdrop-blur-lg bg-black/15 px-8 py-6 rounded-md text-zinc-100/75 space-y-2">
      {isLoadingWeather ? (
        <p className="text-[#ececf399] text-base/6">
          Loading weather...
        </p>
      ) : currentWeather?.data ? (
        <div className="text-[#ececf399] text-base/6">
          <p className="text-lg font-bold">{currentWeather.data.cityName}</p>
          <div className="flex items-center gap-2">
            <img className="rounded-full" src={currentWeather.data.conditionIcon} title={currentWeather.data.condition} />
            <div>
              <p>{currentWeather.data.condition}</p>
            </div>
          </div>
          <p>{currentWeather.data.description} with a temperature of ~{Math.round(currentWeather.data.temperature)}°C</p>
        </div>
      ) : (
        <p className="text-[#ececf399] text-base/6">
          No weather data to display.
        </p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchWeather();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            fetchWeather();
          }
        }}
        className="flex flex-col gap-4"
      >
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter a city..."
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="w-full text-base/6 rounded-md bg-black/50 hover:bg-black/75 focus-visible:outline-none ring-2 ring-transparent  hover:ring-zinc-800 focus:ring-zinc-800 focus:bg-black/75 transition h-12 px-4 py-2 text-zinc-100"
          />
          {currentWeather && currentWeather.error && (
            <p className="text-red-500 text-sm px-1">
              {currentWeather.error}
            </p>
          )}
        </div>
        <button
          disabled={isLoadingWeather}
          type="submit"
          className="rounded-md text-base/6 ring-2 ring-offset-2 ring-offset-black focus-visible:outline-none focus-visible:ring-zinc-100 ring-transparent hover:ring-zinc-100 h-12 px-10 py-3 bg-brand-700 text-zinc-800 font-medium bg-gradient-to-tl from-zinc-300 to-zinc-200 transition hover:bg-brand-800"
        >
          {isLoadingWeather ? "Fetching..." : "Fetch Weather"}
        </button>
      </form>
    </div>
  )
}
