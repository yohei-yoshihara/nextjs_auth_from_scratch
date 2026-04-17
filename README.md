# Next.js Auth from scratch

- [Youtube - Next.js App Router Authentication (Sessions, Cookies, JWTs)](https://www.youtube.com/watch?v=DJvM2lSPn6w&t=173s)
- [Documentation - Authentication](https://nextjs.org/docs/app/building-your-application/authentication)

## Initialize SQLite

```bash
pnpm dlx prisma generate
pnpm dlx prisma db push
pnpm dlx tsx seed.ts
```

## Start server

``` bash
pnpm run dev
```

## Test User

- name: `test1`
- password: `test12345!`
