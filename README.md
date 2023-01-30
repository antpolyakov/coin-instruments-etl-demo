# coin-instruments-etl-demo
Demo job for coin instruments data storage, load and minimal user access

### Current issues/limitations (aka "Release Notes"):
- no API Key to bypass user/JWT auth implemented (yet)
- no users check after JWT issue, `users.instrument_access` flag is being ignored (implementation incomplete so far) 
- no session on the server side (purely JWT auth)
- no JWT expiration control, no refresh/renewal
- very few of validation / jsonSchema and such stuff
- better error handling would be much better 
- code organization is far from perfect, some repeats...

## Preparing

```
yarn install
yarn bootstrap
```
This executes the only DB migration.

## Start-up

Run all:
```
yarn start
```

For server and/or loader separately:
```
yarn start:server
yarn start:loader-job
```

## Clean-up

```
yarn clean
```
Just removes the database file.
