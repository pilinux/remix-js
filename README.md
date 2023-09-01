# Remix JS

Build modern web apps using Remix and built-in browser APIs without relying too much on deprecated
dependencies.

## About this Repository

This repository serves as a comprehensive guide to building *Backend for Frontend (BFF)* web
applications using Remix, to help create high-performance and maintainable apps. It will cover
a wide range of topics, from project setup and routing to data fetching, authentication, and
deployment.

## Walkthrough

- Home: `app/routes/_index.jsx`
- Set Session: `app/routes/session-set.jsx`
- Delete Session: `app/routes/session-delete.jsx`
- Set Cookie: `app/routes/cookie-set.jsx`
- Delete Cookie: `app/routes/cookie-delete.jsx`
- Remote API Status [HTTP GET]: `app/routes/status/index.jsx`
- Login [HTTP POST]: `app/routes/login/index.jsx`
- Logout [HTTP POST]: `app/routes/logout/index.jsx`
- Test JWT [HTTP GET]: `app/routes/protected/index.jsx`

### Note

- Password handling in this repo code: `user pass` -> `sha2 (client-side)` ->
  `sha3 (remix server-side)` -> `argon2id (in the database)`

### Demo App

Link: [remixjs.pilinux.me](https://remixjs.pilinux.me)

### Demo User for Testing Auth

- Email: `apidev-no-reply@pilinux.me`
- Password: `1234.Abc!`

# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over relevant code/assets from your current app to the new project that's pre-configured for your target server.

Most importantly, this means everything in the `app/` directory, but if you've further customized your current application outside of there it may also include:

- Any assets you've added/updated in `public/`
- Any updated versions of root files such as `.eslintrc.js`, etc.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```

### Using Docker

`docker-compose.yml`

```
# syntax=docker/dockerfile:1

version: '3.9'
name: remix
services:
  myapp:
    image: node:20.5.1-bookworm
    container_name: myapp
    working_dir: /app
    restart: unless-stopped:10s
    command: sh -c "npm ci && npm run build && npm run start"
    ports:
      - '127.0.0.1:3000:3000'
    volumes:
      - ./myapp:/app
```

`.env`

```
HOST=0.0.0.0
NODE_ENV=production
```
