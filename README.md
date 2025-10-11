# DShop

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started without Docker

1. Clone the repository with `git clone "repository link"`
2. Enter the share_core folder (MFE) and run `npm install` if the dependencies aren't installed. Then run the command `npm run dev`.
3. Enter the share_angular folder (MFE) and run `npm install` if the dependencies aren't installed. Then run the command `npm run dev`.
4. Enter the share_react folder (MFE) and run `npm install` if the dependencies aren't installed. Then run the command `npm run dev`.
5. Enter the product_detail folder (MFE) and run `npm install` if the dependencies aren't installed. Then run the command `npm run dev`.
6. Enter the home folder (MFE) and run `npm install` if the dependencies aren't installed. Then run the command `npm run dev`.
7. Enter the container folder (MFE) and run `npm install` if the dependencies aren't installed. Then run the command `npm run dev`.

## Getting Started with Docker

1. Clone the repository with `git clone "repository link"`
2. Join to `shared_core`, `shared_angular`, `shared_react`, `product_detail`, `home` and `container` folders (MFEs) and execute: `npm install` or `yarn install` in the terminal.
3. Go to the previous folder and execute: `docker-compose -f dev.docker-compose.yml build --no-cache` in the terminal
4. Once built, you must execute the command: `docker-compose -f dev.docker-compose.yml up --force-recreate` in the terminal

NOTE: You have to be standing in the folder containing the: `dev.docker-compose.yml` and you need to install `Docker Desktop` if you are in Windows.

## Description

This project is a fun project that allowed me to learn `MicroFrontends (MFEs)` with the `ModuleFederationPlugin`. We basically have six Microfrontends, one of which serves as the orchestrator for the rest, i.e., the `container` MFE.

1. **Container - REACT JS**: The MFE Container is responsible for displaying the final result, as well as rendering the Home and Product detail pages, as well as various components.
2. **Home - REACT JS**: The Home MFE is responsible for rendering the website's main home page. It receives the information to be rendered through props and also consumes components from other MFEs.
3. **Product Detail - VUE 3**: The Product Detail MFE is responsible for rendering a specific product page on the website. It behaves similarly to the Home MFE, receiving the information to be rendered in props and also consuming components from other MFEs.
4. **Shared React - REACT JS**: The Shared React MFE is an MFE that only consumes `Shared Core MFE` and is used to develop React-based components.
5. **Shared Angular - ANGULAR 14**: The Shared Angular MFE is an MFE that only consumes `Shared Core MFE` and is used to develop Angular-based components.
6. **Shared Core - REACT JS**: The Shared Core MFE doesn't consume any MFE. It's only responsible for exposing basic components for reuse in other MFEs, such as buttons, SVGs, cards, etc.

## Technologies used

1. Typescript
2. React JS
3. CSS3
4. Docker
5. Webpack 5
6. Vue 3
7. Angular 14
8. Nginx

## Libraries used

### Container

#### Dependencies

```
"@babel/runtime": "^7.27.6"
"axios": "^1.11.0"
"react": "^19.1.0"
"react-dom": "^19.1.0"
"react-router-dom": "^7.6.3"
```

#### devDependencies

```
"@babel/core": "^7.28.0"
"@babel/plugin-transform-runtime": "^7.28.0"
"@babel/preset-env": "^7.28.0"
"@babel/preset-react": "^7.27.1"
"@babel/preset-typescript": "^7.27.1"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.3.0"
"@testing-library/user-event": "^14.6.1"
"@types/jest": "^29.5.14"
"@types/node": "^24.0.10"
"@types/react": "^19.1.8"
"@types/react-dom": "^19.1.6"
"babel-loader": "^10.0.0"
"clean-webpack-plugin": "^4.0.0"
"css-loader": "^7.1.2"
"home": "file:../home-types"
"html-webpack-plugin": "^5.6.3"
"jest": "^29.7.0"
"jest-environment-jsdom": "^29.7.0"
"product_detail": "file:../product_detail-types"
"shared_angular": "file:../shared_angular-types"
"shared_core": "file:../shared_core-types"
"shared_react": "file:../shared_react-types"
"style-loader": "^4.0.0"
"ts-jest": "^29.2.5"
"ts-node": "^10.9.2"
"typescript": "^5.8.3"
"webpack": "^5.99.9"
"webpack-cli": "^6.0.1"
"webpack-dev-server": "^5.2.2"
"webpack-merge": "^6.0.1"
```

### Home

#### Dependencies

```
"@babel/runtime": "^7.27.6"
"react": "^19.1.0"
"react-dom": "^19.1.0"
"react-router-dom": "^7.6.3"
```

#### devDependencies

```
"@babel/core": "^7.28.0"
"@babel/plugin-transform-runtime": "^7.28.0"
"@babel/preset-env": "^7.28.0"
"@babel/preset-react": "^7.27.1"
"@babel/preset-typescript": "^7.27.1"
"@types/node": "^24.0.10"
"@types/react": "^19.1.8"
"@types/react-dom": "^19.1.6"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.3.0"
"@testing-library/user-event": "^14.6.1"
"@types/jest": "^29.5.14"
"babel-loader": "^10.0.0"
"clean-webpack-plugin": "^4.0.0"
"css-loader": "^7.1.2"
"html-webpack-plugin": "^5.6.3"
"jest": "^29.7.0"
"jest-environment-jsdom": "^29.7.0"
"style-loader": "^4.0.0"
"ts-jest": "^29.2.5"
"ts-node": "^10.9.2"
"typescript": "^5.8.3"
"webpack": "^5.99.9"
"webpack-cli": "^6.0.1"
"webpack-dev-server": "^5.2.2"
"webpack-merge": "^6.0.1"
"shared_core": "file:../shared_core-types"
"shared_react": "file:../shared_react-types"
"shared_angular": "file:../shared_angular-types"
```

### Product Detail

#### Dependencies

```
"@babel/runtime": "^7.28.0"
"vue": "^3.5.0"
"vue-router": "^4.4.5"
```

#### devDependencies

```
"@babel/core": "^7.28.0"
"@babel/plugin-transform-runtime": "^7.28.0"
"@babel/preset-env": "^7.28.0"
"@babel/preset-typescript": "^7.27.1"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/vue": "^8.1.0"
"@types/jest": "^29.5.14"
"@types/node": "^24.0.10"
"@vue/compiler-sfc": "^3.5.0"
"@vue/test-utils": "^2.4.6"
"babel-loader": "^10.0.0"
"clean-webpack-plugin": "^4.0.0"
"css-loader": "^7.1.2"
"file-loader": "^6.2.0"
"html-webpack-plugin": "^5.6.3"
"jest": "^29.7.0"
"jest-environment-jsdom": "^29.7.0"
"style-loader": "^4.0.0"
"ts-jest": "^29.2.5"
"ts-loader": "^9.5.2"
"ts-node": "^10.9.2"
"typescript": "^5.8.3"
"vue-loader": "^17.4.2"
"vue-style-loader": "^4.1.2"
"webpack": "^5.99.9"
"webpack-cli": "^6.0.1"
"webpack-dev-server": "^5.2.2"
"webpack-merge": "^6.0.1"
"shared_core": "file:../shared_core-types"
"shared_react": "file:../shared_react-types"
"shared_angular": "file:../shared_angular-types"
```

### Shared React

#### Dependencies

```
"@babel/runtime": "^7.27.6"
"react": "^19.1.0"
"react-dom": "^19.1.0"
```

#### devDependencies

```
"@babel/core": "^7.28.0"
"@babel/plugin-transform-runtime": "^7.28.0"
"@babel/preset-env": "^7.28.0"
"@babel/preset-react": "^7.27.1"
"@babel/preset-typescript": "^7.27.1"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.3.0"
"@testing-library/user-event": "^14.6.1"
"@types/jest": "^29.5.14"
"@types/node": "^24.0.13"
"@types/react": "^19.1.8"
"@types/react-dom": "^19.1.6"
"babel-loader": "^10.0.0"
"clean-webpack-plugin": "^4.0.0"
"css-loader": "^7.1.2"
"html-webpack-plugin": "^5.6.3"
"jest": "^29.7.0"
"jest-environment-jsdom": "^29.7.0"
"style-loader": "^4.0.0"
"ts-jest": "^29.2.5"
"ts-node": "^10.9.2"
"typescript": "^5.8.3"
"webpack": "^5.99.9"
"webpack-cli": "^6.0.1"
"webpack-dev-server": "^5.2.2"
"webpack-merge": "^6.0.1"
"shared_core": "file:../shared_core-types"
```

### Shared Angular

#### Dependencies

```
"@angular/animations": "^14.2.0"
"@angular/common": "^14.2.0"
"@angular/compiler": "^14.2.0"
"@angular/core": "^14.2.0"
"@angular/platform-browser": "^14.2.0"
"@angular/platform-browser-dynamic": "^14.2.0"
"@angular/router": "^14.2.0"
"rxjs": "^7.5.0"
"zone.js": "^0.11.4"
```

#### devDependencies

```
"@testing-library/angular": "^12.1.0"
"@testing-library/jest-dom": "^6.6.4"
"@testing-library/user-event": "^14.6.1"
"@types/jest": "^29.5.14"
"@types/node": "^24.7.1"
"css-loader": "^6.8.1"
"html-loader": "^5.1.0"
"html-webpack-plugin": "^5.6.3"
"jest": "^29.7.0"
"jest-environment-jsdom": "^29.7.0"
"sass": "^1.64.2"
"sass-loader": "^13.3.2"
"shared_core": "file:../shared_core-types"
"style-loader": "^3.3.4"
"ts-jest": "^29.2.5"
"ts-loader": "^9.5.2"
"ts-node": "^10.9.2"
"typescript": "^5.9.2"
"webpack": "^5.99.9"
"webpack-cli": "^5.1.4"
"webpack-dev-server": "^5.2.2"
"webpack-merge": "^5.9.0"
```

### Shared Core

#### Dependencies

```
"@babel/runtime": "^7.27.6"
"react": "^19.1.0"
"react-dom": "^19.1.0"
```

#### devDependencies

```
"@babel/core": "^7.28.0"
"@babel/plugin-transform-runtime": "^7.28.0"
"@babel/preset-env": "^7.28.0"
"@babel/preset-react": "^7.27.1"
"@babel/preset-typescript": "^7.27.1"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.3.0"
"@testing-library/user-event": "^14.6.1"
"@types/jest": "^29.5.14"
"@types/node": "^24.7.1"
"@types/react": "^19.1.8"
"@types/react-dom": "^19.1.6"
"babel-loader": "^10.0.0"
"clean-webpack-plugin": "^4.0.0"
"css-loader": "^7.1.2"
"html-webpack-plugin": "^5.6.3"
"jest": "^29.7.0"
"jest-environment-jsdom": "^29.7.0"
"style-loader": "^4.0.0"
"ts-jest": "^29.2.5"
"ts-node": "^10.9.2"
"typescript": "^5.8.3"
"webpack": "^5.99.9"
"webpack-cli": "^6.0.1"
"webpack-dev-server": "^5.2.2"
"webpack-merge": "^6.0.1"
```

## Portfolio Link

[`https://diegolibonati.com.ar/#/project/DShop`](https://diegolibonati.com.ar/#/project/DShop)

## App Link

[`https://dshop.libonatis.com.ar/#/`](https://dshop.libonatis.com.ar/#/)

## Video

https://github.com/user-attachments/assets/2758b45c-2699-4e52-b604-2be29c70346b

## Testing

### Container

1. Join to `container` folder
2. Execute: `npm run test`

### Home

1. Join to `home` folder
2. Execute: `npm run test`

### Product Detail

1. Join to `product_detail` folder
2. Execute: `npm run test`

### Shared React

1. Join to `shared_react` folder
2. Execute: `npm run test`

### Shared Angular

1. Join to `shared_angular` folder
2. Execute: `npm run test`

### Shared Core

1. Join to `shared_core` folder
2. Execute: `npm run test`

## Documentation APP

### **Version**

```ts
APP VERSION: 1.0.0
README UPDATED: 10/10/2025
AUTHOR: Diego Libonati
```

### **Env Keys**

1. `WATCHPACK_POLLING`: This env key is used to load the content when saving a change to it. (Docker)

```ts
# Container Envs
WATCHPACK_POLLING=true

# Container Envs
WATCHPACK_POLLING=true

# Container Envs
WATCHPACK_POLLING=true

# Container Envs
WATCHPACK_POLLING=true

# Container Envs
WATCHPACK_POLLING=true

# Container Envs
WATCHPACK_POLLING=true
```

## Known issues

### Container MFE

1. Typing error in Header.

### Shared Angular MFE

1. Error when running tests

### Shared Vue MFE

1. Modularization of tsconfig files does not work
