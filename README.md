This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Or access it here [https://paperless-documentation-app.vercel.app](https://paperless-documentation-app.vercel.app).

## TODO:

- add nav bar
- remove useSession if middleware implemented
- unauthorized access to /admin should redirect to /
- create a login homepage for logged in users
- pagination/filtering/sorting for retrieval columns, either next page or load more (tumblr/twitter style)
- ability to unapprove a form (ie an undo)
- prevent rejection submission without comment
- use bcrypt to encrypt passwords
- form filtering, sorting, pagination
- use SQL querying instead of supabase-js library
- Multi Language support, theming, dark/light mode, accessibility
- static page for Visual/Audio SOP/Training Material
