import { Elysia, t } from 'elysia'

export const app = new Elysia()
  .get('/', () => 'API corriendo correctamente')
  .get('/hello/:name', ({ params: { name } }) => `Hola, ${name}!`)
  .post('/mirror', ({ body }) => body, {
    body: t.Object({
      id: t.Number(),
      name: t.String()
    })
  });

app.listen(3000);

console.log('Servidor backend iniciado en http://localhost:3000');

export type App = typeof app;