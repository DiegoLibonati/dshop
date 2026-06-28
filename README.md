# DShop

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**DShop** is a fully responsive **fashion / clothing e-commerce storefront** built as a hands-on showcase of a **polyglot micro-frontend (MFE) architecture**. It serves two purposes at once: on the surface it behaves like a real online clothing shop, and under the hood it demonstrates how independently built applications written in **different frameworks - React, Vue and Angular - can be composed into a single, seamless website at runtime** through **Module Federation** (powered by Vite).

The site is made up of **six micro-frontends**. One of them, the `container`, is the orchestrator: it owns routing, the shared layout (header, category navigation, search bar, promotional notification bar and footer) and mounts every other MFE into the page. The rest provide either full pages (Home, Product Detail) or reusable cross-framework component libraries (Shared Core, Shared React, Shared Angular).

### What the application does

From a visitor's point of view, DShop is a small but complete shopping experience:

- **Home page** - a landing page with a hero banner ("Find clothes that matches your style" with a _Shop Now_ call to action and headline stats), a strip of international brands, **New Arrivals** and **Top Selling** product galleries, a **Browse by Dress Style** section, and an **Our Happy Customers** testimonial carousel.
- **Product Detail page** - one page per product with an image gallery, product information (price, star rating, **color** and **size** selectors, a quantity counter and an **Add to Cart** action), an **All Reviews** section, and a **You Might Also Like** carousel of related items.
- **Shared chrome** - a persistent header with category links (Shop, On Sale, New Arrivals, Brands) and a product search box, a top notification bar, and a footer with a newsletter sign-up form and Company / Help / FAQ / Resources link columns.

The catalog (products, prices, images and reviews) is fetched at runtime from the public **[Platzi Fake Store API](https://api.escuelajs.co)**, so the app ships **no backend of its own**; in production an Nginx reverse proxy forwards `/api` requests to that external service.

### What it demonstrates (the goal of the project)

Above all, DShop is an **educational reference** for building real-world micro-frontends. It shows how to:

- **Mix frameworks inside one product** - React (`container`, `home`, `shared-react`, `shared-core`), **Vue 3** (`product-detail`) and **Angular 19** (`shared-angular`) run side by side in the same page and exchange data and components.
- **Share UI across frameworks** - `shared-core` exposes framework-agnostic base building blocks (buttons, SVGs, cards, loaders, skeletons, an error boundary, etc.) that every other MFE reuses, while `shared-react` and `shared-angular` package higher-level components for their respective ecosystems.
- **Compose pages at runtime** - remotes are loaded lazily and mounted through small `RemoteMfe` / `SharedMfe` bridges, with a global loading gate, skeleton fallbacks and per-MFE error boundaries so a slow or failing remote never takes the whole page down.
- **Pass data across boundaries** - each page receives its content through props / mount data injected by the container, which keeps every MFE independently runnable, buildable and testable.

In short, the six micro-frontends are:

1. **Container - REACT JS**: The MFE Container is responsible for displaying the final result, as well as rendering the Home and Product detail pages, as well as various components.
2. **Home - REACT JS**: The Home MFE is responsible for rendering the website's main home page. It receives the information to be rendered through props and also consumes components from other MFEs.
3. **Product Detail - VUE 3**: The Product Detail MFE is responsible for rendering a specific product page on the website. It behaves similarly to the Home MFE, receiving the information to be rendered in props and also consuming components from other MFEs.
4. **Shared React - REACT JS**: The Shared React MFE is an MFE that only consumes `Shared Core MFE` and is used to develop React-based components.
5. **Shared Angular - ANGULAR 19**: The Shared Angular MFE is an MFE that only consumes `Shared Core MFE` and is used to develop Angular-based components.
6. **Shared Core - REACT JS**: The Shared Core MFE doesn't consume any MFE. It's only responsible for exposing basic components for reuse in other MFEs, such as buttons, SVGs, cards, etc.

> The stacks and dependencies below are what power the six microfrontends described above.

## Technologies used

1. Typescript
2. React JS
3. CSS3
4. Docker
5. Vite
6. Module Federation
7. Vue 3
8. Angular 19
9. Nginx

## Libraries used

These are the exact dependencies per microfrontend (one block per `package.json`). The React MFEs pin `react`/`react-dom` to the same exact version (`19.2.6`) to keep them in lockstep.

### Container

#### Dependencies

```
"react": "19.2.6"
"react-dom": "19.2.6"
"react-router": "7.16.0"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@module-federation/vite": "^1.15.5"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/postcss-prefix-selector": "^1.16.3"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"msw": "2.10.4"
"postcss-prefix-selector": "^2.1.1"
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"undici": "^7.25.0"
"vite": "^7.1.6"
```

### Home

#### Dependencies

```
"react": "19.2.6"
"react-dom": "19.2.6"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@module-federation/vite": "^1.15.5"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/postcss-prefix-selector": "^1.16.3"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"postcss-prefix-selector": "^2.1.1"
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
"vite-plugin-css-injected-by-js": "^4.0.1"
```

### Product Detail

#### Dependencies

```
"vue": "^3.5.34"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@module-federation/vite": "^1.15.5"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@testing-library/vue": "^8.1.0"
"@types/node": "^22.0.0"
"@types/postcss-prefix-selector": "^1.16.3"
"@vitejs/plugin-vue": "^6.0.7"
"@vue/test-utils": "^2.4.6"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-vue": "^9.32.0"
"globals": "^15.0.0"
"jsdom": "^26.1.0"
"lint-staged": "^15.0.0"
"postcss-prefix-selector": "^2.1.1"
"prettier": "^3.0.0"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
"vite-plugin-css-injected-by-js": "^4.0.1"
"vitest": "^3.2.0"
"vue-eslint-parser": "^9.4.3"
"vue-tsc": "^2.2.0"
```

### Shared React

#### peerDependencies

```
"react": "^19.0.0"
"react-dom": "^19.0.0"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@module-federation/vite": "^1.15.5"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/postcss-prefix-selector": "^1.16.3"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"postcss-prefix-selector": "^2.1.1"
"prettier": "^3.0.0"
"react": "19.2.6"
"react-dom": "19.2.6"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
"vite-plugin-css-injected-by-js": "^4.0.1"
```

### Shared Angular

#### Dependencies

```
"@angular/common": "^19.2.0"
"@angular/compiler": "^19.2.0"
"@angular/core": "^19.2.0"
"@angular/platform-browser": "^19.2.0"
"zone.js": "^0.15.0"
```

#### devDependencies

```
"@analogjs/vite-plugin-angular": "^1.16.0"
"@angular/build": "^19.2.26"
"@angular/compiler-cli": "^19.2.22"
"@eslint/js": "^9.0.0"
"@module-federation/vite": "^1.15.5"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/postcss-prefix-selector": "^1.16.3"
"angular-eslint": "^19.0.0"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^15.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"postcss-prefix-selector": "^2.1.1"
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
"vite-plugin-css-injected-by-js": "^4.0.1"
```

### Shared Core

#### peerDependencies

```
"react": "^19.0.0"
"react-dom": "^19.0.0"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@module-federation/vite": "^1.15.5"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/postcss-prefix-selector": "^1.16.3"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"postcss-prefix-selector": "^2.1.1"
"prettier": "^3.0.0"
"react": "19.2.6"
"react-dom": "19.2.6"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
"vite-plugin-css-injected-by-js": "^4.0.1"
```

> With the stack and dependencies clear, here's how to get every microfrontend running locally.

## Getting Started

You can run DShop directly on your machine or through Docker. In both cases the shared MFEs must be available before the feature MFEs and the container.

> **Prerequisite:** Node.js `>=22` (an `.nvmrc` is provided, so `nvm use` picks the right version). Each MFE installs and runs independently.

### Local (without Docker)

1. Clone the repository with `git clone "repository link"`.
2. Copy `container/.env.example` to `container/.env` so the container can resolve the remotes and the products API (see [Env Keys](#env-keys)).
3. Enter the `shared-core` folder and run `npm install` (if the dependencies aren't installed). Then run `npm run dev`.
4. Enter the `shared-angular` folder and run `npm install` (if the dependencies aren't installed). Then run `npm run dev`.
5. Enter the `shared-react` folder and run `npm install` (if the dependencies aren't installed). Then run `npm run dev`.
6. Enter the `product-detail` folder and run `npm install` (if the dependencies aren't installed). Then run `npm run dev`.
7. Enter the `home` folder and run `npm install` (if the dependencies aren't installed). Then run `npm run dev`.
8. Enter the `container` folder and run `npm install` (if the dependencies aren't installed). Then run `npm run dev`.

> Start the shared MFEs first (`shared-core` → `shared-angular` → `shared-react`), then the feature MFEs (`product-detail`, `home`), and finally the `container`, which orchestrates them all.

### With Docker

1. Clone the repository with `git clone "repository link"`.
2. In each MFE folder (`shared-core`, `shared-angular`, `shared-react`, `product-detail`, `home`, `container`) run `npm install` or `yarn install`.
3. From the repository root run: `docker-compose -f dev.docker-compose.yml build --no-cache`.
4. Once built, run: `docker-compose -f dev.docker-compose.yml up --force-recreate`.

NOTE: You must run these commands from the folder that contains `dev.docker-compose.yml` (the repository root), and you need `Docker Desktop` installed if you are on Windows.

## Env Keys

The setup above relies on `.env` files. Copy the matching example file before running the app. There are two relevant files.

**`container/.env` — local development** (copy of `container/.env.example`): points the container at each remote running on localhost plus the external products API.

```
VITE_REDIRECT_IF_ROUTE_NOT_EXISTS=false
VITE_APP_NAME=container
VITE_REMOTE_HOME_URL=http://localhost:3010/remoteEntry.js
VITE_REMOTE_PRODUCT_DETAIL_URL=http://localhost:3020/remoteEntry.js
VITE_REMOTE_SHARED_CORE_URL=http://localhost:4000/remoteEntry.js
VITE_REMOTE_SHARED_REACT_URL=http://localhost:4010/remoteEntry.js
VITE_REMOTE_SHARED_ANGULAR_URL=http://localhost:4020/remoteEntry.js
VITE_API_URL=https://api.escuelajs.co

WATCHPACK_POLLING=true
```

**`.env` (root) — production / Nginx** (copy of `.env.example`): the remote URLs point to the Nginx-served paths instead of localhost ports, and `APP_PORT` sets the host port the production stack is published on.

```
VITE_REMOTE_HOME_URL=/mfe/home/remoteEntry.js
VITE_REMOTE_PRODUCT_DETAIL_URL=/mfe/product-detail/remoteEntry.js
VITE_REMOTE_SHARED_CORE_URL=/mfe/shared-core/remoteEntry.js
VITE_REMOTE_SHARED_REACT_URL=/mfe/shared-react/remoteEntry.js
VITE_REMOTE_SHARED_ANGULAR_URL=/mfe/shared-angular/remoteEntry.js

APP_PORT=8180
```

Key reference:

- `VITE_REMOTE_*_URL`: location of the `remoteEntry.js` for each microfrontend the container loads.
- `VITE_API_URL`: base URL of the external products API (escuelajs).
- `VITE_APP_NAME`: identifier the host MFE reports.
- `VITE_REDIRECT_IF_ROUTE_NOT_EXISTS`: when `true`, unknown routes redirect to home.
- `WATCHPACK_POLLING`: enables file-watch polling so hot-reload works inside Docker.
- `APP_PORT`: host port the production `container` service is published on (defaults to `8180`); used only by `prod.docker-compose.yml`.

> Each remote MFE also ships its own example env file (`.example.env`) following the same `VITE_*` convention; copy it to `.env` if you run that MFE standalone.

## Testing

With the app booting from the variables above, you can validate each MFE independently. Each microfrontend runs its own test suite (Jest, except Product Detail which uses Vitest).

### Container

1. Join to `container` folder
2. Execute: `npm run test`

### Home

1. Join to `home` folder
2. Execute: `npm run test`

### Product Detail

1. Join to `product-detail` folder
2. Execute: `npm run test`

### Shared React

1. Join to `shared-react` folder
2. Execute: `npm run test`

### Shared Angular

1. Join to `shared-angular` folder
2. Execute: `npm run test`

### Shared Core

1. Join to `shared-core` folder
2. Execute: `npm run test`

## Continuous Integration

Beyond the local suites above, the repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch, so the same checks you can run locally are enforced on every change.

The pipeline behaves differently depending on the trigger:

- On **pull requests** it is **validation-only** — it lints, tests, builds and smoke-builds the Docker images, but does **not** publish anything.
- On **push to `main`** it goes further: it **publishes the six production images to GHCR** (`ghcr.io/diegolibonati/dshop-<mfe>`) and then **deploys the stack to the server** over SSH (see [Deployment](#deployment)).

### Pipeline overview

```
        ┌──────────────── push / PR to main ────────────────┐
        ▼                                                    ▼
  per microfrontend (x6: shared-core, shared-react, shared-angular,
                         container, home, product-detail)
  ┌────────────────────┐   ┌──────────────┐   ┌──────────────┐
  │   lint-and-audit   │──▶│     test     │──▶│    build     │
  │ eslint · prettier  │   │ jest /vitest │   │  vite build  │
  │ tsc · npm audit    │   │              │   │              │
  └────────────────────┘   └──────────────┘   └──────────────┘
                                                      │
                              (after the 6 builds pass)
                       ┌──────────────────────────────┴───────────────┐
                       ▼                                               ▼
         ┌───────────────────────────┐             ┌───────────────────────────┐
         │      docker-build-dev      │             │     docker-publish-prod    │
         │  6 dev images · smoke test │             │  6 prod images · buildx    │
         │       buildx · push:false  │             │  push to GHCR (main only)  │
         └───────────────────────────┘             └─────────────┬─────────────┘
                                                                  │  (push to main)
                                                                  ▼
                                                    ┌───────────────────────────┐
                                                    │           deploy           │
                                                    │  scp compose · ssh into    │
                                                    │  server · compose pull/up  │
                                                    └───────────────────────────┘
```

### Validation jobs (run for every microfrontend)

Each MFE runs its own three-stage chain; the six chains run in parallel. Every job sets up Node from the MFE's `.nvmrc`, restores the npm cache keyed by `package-lock.json`, and installs the MFE plus its shared siblings with `npm ci --ignore-scripts`.

1. **`<mfe>-lint-and-audit`** — `npm run lint` (ESLint), `npm run format:check` (Prettier), `npm run type-check` (`tsc` / `vue-tsc`) and `npm audit --audit-level=high` (non-blocking).
2. **`<mfe>-test`** — `npm test` (Jest, or Vitest for Product Detail). Depends on `lint-and-audit`.
3. **`<mfe>-build`** — `npm run build` (`vite build`). Depends on `test`.

### Docker & deploy jobs

Both Docker jobs wait for all six `*-build` jobs and then run their own 6-way matrix in parallel.

4. **`docker-build-dev`** — builds the six **development** images with Docker Buildx using each module folder as the build context (`Dockerfile.development`). Images are built but **not pushed** (`push: false`) — a build smoke test only. Runs on every trigger (push and PR).
5. **`docker-publish-prod`** — builds the six **production** images from the repository root (`Dockerfile.production`), baking the federation URLs (`VITE_REMOTE_*_URL`) as build args. On **push to `main`** it logs in to GHCR and **pushes** each image as `ghcr.io/diegolibonati/dshop-<mfe>:latest` and `:sha-<commit>` (GitHub Actions cache enabled). On pull requests it builds without pushing. Requires `packages: write` permission.
6. **`deploy`** — runs only on **push to `main`** (guarded by `if`, `environment: production`). It copies `prod.docker-compose.yml` to the server with `scp`, then over SSH runs `docker compose pull`, `up -d` and `docker image prune -f`. A dedicated `deploy-production` concurrency group (with `cancel-in-progress: false`) prevents overlapping deploys. See [Deployment](#deployment) for the required secrets.

> Superseded runs on the same ref are cancelled automatically (`concurrency`). The workflow runs read-only by default (`contents: read`); only `docker-publish-prod` is granted `packages: write` to push to GHCR.

### Running the same checks locally

From any MFE folder:

```bash
npm run lint           # ESLint
npm run format:check   # Prettier
npm run type-check     # tsc / vue-tsc
npm audit --audit-level=high
npm test               # Jest / Vitest
npm run build          # vite build
```

To run the test suites across all MFEs at once, use the helper script from the repository root:

```bash
./run-tests.sh
```

## Deployment

Production runs entirely from images published to **GitHub Container Registry (GHCR)** — the server never builds from source. The [`prod.docker-compose.yml`](prod.docker-compose.yml) stack pulls one image per microfrontend (`ghcr.io/diegolibonati/dshop-<mfe>:latest`) onto a private `dshop-prod-net` network. Only the **`container`** service is published to the host; its Nginx reverse-proxies every other MFE under `/mfe/<mfe>/`, so the remotes stay internal (no published ports).

### How it works

1. A push to `main` triggers the `docker-publish-prod` job, which builds and pushes the six production images to GHCR (`:latest` and `:sha-<commit>`).
2. The `deploy` job then copies `prod.docker-compose.yml` to the server and runs `docker compose pull && docker compose up -d` over SSH, so the server only ever pulls pre-built images.

### Published port

Only the `container` service exposes a port. It maps the host port **`APP_PORT` (default `8180`)** to the container's internal Nginx port `8080`:

```yaml
ports:
  - "${APP_PORT:-8180}:8080"
```

Override it by setting `APP_PORT` in the server's `.env` (or environment) next to the compose file. The app is then reachable at `http://<host>:8180`.

### Required setup

- **Repository secrets** (Settings → Secrets and variables → Actions): `SSH_HOST`, `SSH_USER`, `SSH_KEY`, `DEPLOY_PATH`, and optionally `SSH_PORT` (defaults to `22`). `GITHUB_TOKEN` is provided automatically and is used to push images to GHCR.
- **GHCR read access on the server**: `docker compose pull` must be able to read the six packages. Either make the GHCR packages **public**, or run `docker login ghcr.io` once on the server with a PAT that has `read:packages`. Packages are created **private** on the first push to `main`.

### Running the prod stack manually

From the directory holding `prod.docker-compose.yml` (after authenticating to GHCR if the packages are private):

```bash
docker compose -f prod.docker-compose.yml pull
docker compose -f prod.docker-compose.yml up -d
```

## Security Audit

Beyond functional tests, you can also audit the project for vulnerabilities and overall health:

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### React Doctor

Run a health check on the project (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Known issues

None at the moment.

## Version

```ts
APP VERSION: 1.0.0
README UPDATED: 28/06/2026
AUTHOR: Diego Libonati
```

## Portfolio Link

[`https://diegolibonati.com.ar/#/project/dshop`](https://diegolibonati.com.ar/#/project/dshop)

## App Link

[`https://dshop.libonatis.com.ar/#/`](https://dshop.libonatis.com.ar/#/)
