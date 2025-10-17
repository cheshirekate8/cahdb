This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


TO FIX
- Card aesthetics fixes
  - Cards currently sliced to 20, make a "Load more..." button, card pagination
  - Center grids with consistent gaps
- toaster alerts
- drag and drop
- Get supabase calls for 
  - how many decks created
  - how many users
  - shared decks
  - downloads
- Better drawer button, too basic
- fix localStorage hydration warning, only on refresh 
- Reveiw every file for consistency
- cart functionality?
- Upload custom decks from json (copy technically works for that, but I want to download/upload)
- About Page
  - Get rid of why this project
  - Rethink project highlights
  - Reconsider Development journey
  - Make languages used cooler, with icons and stuff
- Landing Page
- Light Dark Mode
- Cute 404 page
- Testing