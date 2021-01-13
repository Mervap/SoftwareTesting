## Software testing
[Checklist](Checklist.md)\
[Github pages](https://mervap.github.io/SoftwareTesting/)

### Build
Run at `app/client`
```
npm install
```
to install client dependencies\
\
Run at `app/client`
```
npm build
```
Or at `app/api`
```
./gradlew buildClient
```
to build client app.\
\
Run at `app/api`
```
./gradlew build -x tests
```
to build server

### Run
At `app/api`
```
./gradlew bootRun
```

### Deploy
At `app/api`
```
./gradlew awsDeploy
```

