wrangler dev ./src/index.tsx

npm install
npm run dev
npm run build
npm run deploy

npx wrangler d1 migrations create db123 init
npx wrangler d1 migrations apply db123 --local
