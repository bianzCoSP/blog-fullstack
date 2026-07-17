# Blog Repository

This is the repository for Software Engineering Training Weeks 3-4 Portfolio Project

## Getting Started

### Local Setup

To start, run `pnpm install`

Ensure that DATABASE_URL is present in .env

`pnpm dev` starts the dev build.
`pnpm build` and `pnpm start` will start the production build

### Running Migrations and Seeding

Database seeding and migration can be done after `pnpm install` with:

```
pnpm exec drizzle-kit generate
pnpm exec drizzle-kit migrate
pnpm db:seed
```
