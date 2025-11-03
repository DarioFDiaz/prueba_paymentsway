export interface WeatherResponse {
  name: string
  weather: { description: string }[]
  main: {
    temp: number
    humidity: number
    pressure: number
  }
  wind: {
    speed: number
  }
}