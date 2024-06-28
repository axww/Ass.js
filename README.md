wrangler dev ./src/index.tsx

npm install
npm run dev
npm run build
npm run deploy

npx prisma generate
npx prisma migrate dev
npx prisma studio

npx wrangler d1 migrations apply db --local
