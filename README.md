# Cain React UI

[![cain-react-ui Status](http://54.169.30.142:8111/app/rest/builds/buildType:Cain_CainReactUi_1Build/statusIcon "cain-react-ui")](http://54.169.30.142:8111/viewType.html?buildTypeId=Cain_CainReactUi_1Build)

Cain

## Usage
### Build & Test
    $ npm run build
### Build & Publish Docker
    $ ./scripts/docker.sh [version] cain-react-ui
### Package Elastic Beanstalk
    $ ./scripts/package.sh [version] [environment] [logstash-server]
### Deploy
    $ ./scripts/deploy.sh [version] [environment]
### Smoke Test
    $ npm run smoke
### Debug (dev environment)
    $ cp dev.env .env
    $ npm start