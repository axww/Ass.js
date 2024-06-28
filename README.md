wrangler dev ./src/index.tsx

npm install
npm run dev
npm run build
npm run deploy

npx prisma studio
npx prisma generate
npx prisma migrate dev --name init

npx wrangler d1 migrations create db init
npx wrangler d1 migrations apply db --local
