import "dotenv/config"
import { describe, it, expect } from "vitest"
import { apiFetch } from "../src/lib/http"

describe("Weather API", () => {
  it("debería obtener datos válidos de OpenWeatherMap", async () => {
    const data = await apiFetch("https://api.openweathermap.org/data/2.5/weather", {
      query: {
        q: "Madrid",
        appid: process.env.OPENWEATHERMAP_KEY,
        units: "metric",
        lang: "es",
      },
    })

    expect(data).toHaveProperty("name")
    expect(data.main).toHaveProperty("temp")
    expect(typeof data.name).toBe("string")
  })
})