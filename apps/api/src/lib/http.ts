import { ofetch } from 'ofetch'

export const apiFetch = ofetch.create({
  async onRequest({ request, options }) {
    console.log(`🌐 Requesting: ${options.method || 'GET'} ${request}`)
  },

  async onResponse({ response }) {
    console.log(`Response: ${response.status} ${response.url}`)
  },

  async onRequestError({ error }) {
    console.error('Error en solicitud:', error.message)
  },

  async onResponseError({ response }) {
    console.error(`Error HTTP: ${response.status} ${response.url}`)
  },
})
