# Next.js Auth from scratch

- [Youtube - Next.js App Router Authentication (Sessions, Cookies, JWTs)](https://www.youtube.com/watch?v=DJvM2lSPn6w&t=173s)
- [Documentation - Authentication](https://nextjs.org/docs/app/building-your-application/authentication)

## Initialize SQLite

```bash
npx prisma generate
npx prisma db push
node prisma/seed.mjs
```

## Start server

``` bash
pnpm run dev
```

## Test User

- name: `test1`
- password: `test12345!`
