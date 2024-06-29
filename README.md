wrangler dev ./src/index.tsx --remote

npm install
npm run dev
npm run build
npm run deploy

npx wrangler d1 create db123
npx wrangler d1 migrations create db123 init
npx wrangler d1 migrations apply db123 --local
npx wrangler d1 execute db123 --local --command "CREATE TABLE IF NOT EXISTS users ( user_id INTEGER PRIMARY KEY, email_address TEXT, created_at INTEGER, deleted INTEGER, settings TEXT);"
