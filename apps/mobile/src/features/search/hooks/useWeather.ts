import { useEffect, useState } from 'react'
import { api } from '../../../lib/api'
import { WeatherResponse } from '../../../types/weather'

export const useWeather = (city: string) => {
  const [data, setData] = useState<WeatherResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { data, error } = await api.weather.get({
          query: { city },
        })
        if (error) throw new Error(error.message)
        setData(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchWeather()
  }, [city])

  return { data, loading, error }
}