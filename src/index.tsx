import { Hono } from 'hono'
import { renderer } from './renderer'

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

export default app
