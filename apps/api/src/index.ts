import { Elysia, t } from 'elysia'
import { config } from 'dotenv'
import { apiFetch } from './lib/http'

config()

const PORT = Number(process.env.PORT) || 3000
const API_KEY = process.env.OPENWEATHERMAP_KEY

const app = new Elysia()
  .get('/', () => 'API corriendo correctamente')

  .get(
    '/weather',
    async ({ query: { city } }) => {
      console.log(`Consulta recibida para ciudad: ${city}`)

      if (!city) {
        return { error: 'Debe indicar una ciudad' }
      }

      try {
        const data = await apiFetch('https://api.openweathermap.org/data/2.5/weather', {
          query: {
            q: city,
            appid: API_KEY,
            units: 'metric',
            lang: 'es',
          },
          timeout: 8000,
        })

        return {
          ciudad: data.name,
          temperatura: data.main.temp,
          descripcion: data.weather[0]?.description ?? 'Sin descripción',
          icono: data.weather[0]?.icon ?? '01d',
          humedad: data.main.humidity,
          viento: data.wind.speed,
        }
      } catch (err: any) {
        console.error('Error consultando OpenWeatherMap:', err.message)
        return { error: err.message ?? 'Error interno del servidor' }
      }
    },
    {
      query: t.Object({
        city: t.String(),
      }),
    }
  )

  .listen({
    port: PORT,
    hostname: '0.0.0.0',
  })

console.log(`Servidor backend iniciado en http://localhost:${PORT}`)

export type App = typeof app