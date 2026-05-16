import { Hono } from 'hono';
import { cors } from "hono/cors"

const app = new Hono()
  .basePath('api')
  .use(cors({ origin: (origin) => origin ?? "*", credentials: true, exposeHeaders: ["set-auth-token"] }))
  .get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }))
  .get('/health', (c) => c.json({ status: 'ok' }))
  .post('/leads', async (c) => {
    const body = await c.req.json().catch(() => null);

    if (!body?.name || !body?.phone || !body?.email || body?.consent !== true) {
      return c.json({ status: 'error', message: 'Invalid lead payload' }, 400);
    }

    return c.json({ status: 'ok' });
  });

export type AppType = typeof app;
export default app;
