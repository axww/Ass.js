import { Hono } from 'hono'
import { renderer } from './renderer'
import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client'

const app = new Hono<{
  Bindings: {
    MY_KV: KVNamespace
    DB: D1Database
  }
}>()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>Hello!</h1>)
})

app.get("/user/:id", async (c) => {
  const userId = c.req.param("id");
  try {
    let { results } = await c.env.DB.prepare(
      "SELECT * FROM users WHERE user_id = ?",
    ).bind(userId).all();
    return c.json(results);
  } catch (e) {
    console.log(Object.keys(e))
    return c.json({ err: e.message }, 500);
  }
});

app.get('/test', async (c) => {
  const adapter = new PrismaD1(c.env.DB)
  const prisma = new PrismaClient({ adapter })
  const users = await prisma.user.findMany();
  return c.json(users);
});

export default app
