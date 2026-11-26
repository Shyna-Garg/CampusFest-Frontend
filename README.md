# CampusFest setup

## Local development

1. In `CampusFest-Backend`, run `npm ci`. If you are setting up a new environment, copy `.env.example` to `.env` and supply your own MongoDB, JWT, and ImageKit settings. Keep any existing `.env` in place. Use an isolated, transaction-capable MongoDB instance for checkout testing.
2. In `CampusFest-Backend`, start the API with `node server.js`. It listens on port 3000.
3. In `CampusFest-Frontend`, run `npm ci` and `npm run dev`. Vite serves the frontend on port 5173 by default. Local development defaults to `http://localhost:3000/api` for the API and trusts `http://localhost:5173` for CORS.
4. If you change the frontend host or port, set the backend's `CORS_ALLOWED_ORIGINS` to that exact origin and restart the backend. If the API address changes, set `VITE_API_URL` in the frontend's `.env.local` and restart Vite.

## Event banners

Event records can supply complete HTTP(S) banner URLs. For records with uploaded filenames, set `VITE_EVENT_BANNER_BASE_URL` to the full directory URL of the service that hosts the files. For example, use `https://media.example.invalid/uploads/events/` for production. Root-relative paths use the configured media origin. The bundled Express API does not serve an event upload directory.

For local development with a separate upload server, set `VITE_EVENT_BANNER_BASE_URL=http://localhost:5000/uploads/events/` in `.env.local` and restart Vite. If the setting is absent, filename-only banners use the default image. Complete URLs work independently of this setting. Use HTTPS image URLs for HTTPS deployments.

## Production configuration

- Set `VITE_API_URL` before running `npm run build` in the frontend. It is a public build-time value. Use the full API base URL, including the API path, for example `https://api.example.invalid/api`. Set the value through the build environment or a local `.env.production.local` file.
- Set `NODE_ENV=production` and `CORS_ALLOWED_ORIGINS` before starting the backend. Use a comma-separated list of exact trusted origins, for example `https://campusfest.example.invalid,https://staff.example.invalid`. Use the scheme, hostname and any non-default port. Omit paths and trailing slashes. Credentialed CORS is enabled only for the configured origins.
- Keep backend secrets in the runtime environment or an ignored local `.env`. Set only public values under the `VITE_` prefix.
- Verify the intended frontend/API hostnames in a browser before releasing. Existing authentication cookie settings still apply. Use same-site HTTPS hostnames for the frontend and API with the current cookie policy.

Run `npm test` in each package for its configuration checks. The backend suite includes the authentication regression tests.
