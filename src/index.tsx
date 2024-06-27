import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono<{
  Bindings: {
    MY_KV: KVNamespace
    DB: D1Database
  }
}>()

// 在应用启动时调用创建表的函数
app.on('fetch', '', async (c) => {
  const tableCreationQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  );
`
  try {
    await c.env.DB.prepare(tableCreationQuery).all();
    console.log('Table created successfully.')
  } catch (error) {
    console.error('Error creating table:', error)
  }
})

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
