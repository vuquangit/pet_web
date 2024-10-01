# Getting Started

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `yarn build:dev`

Builds the app for dev to the `build` folder.

### `yarn build:dtg`

Builds the app for staging to the `build` folder.

### `yarn build:prod`

Builds the app for production to the `build` folder.

## Requires:
```
  node: v20
```

<br><br><br>

## Deploy using GitAction
- Add ENV to /settings/secrets/actions -> Repository secrets
- .github -> Copy env from secrets to .env... file (dev, staging, production)
```
  cp .env.development.sample .env.development
  echo APP_API_ENDPOINT=${{ secrets.APP_API_ENDPOINT_DEV }} >> .env.development
  echo ...
```
