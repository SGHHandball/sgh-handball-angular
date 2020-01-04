# SG Hainhausen Website

Angular web application for SGH Handball club.

## Build the application

You can build this application with the command:

Dev:
```npm run ng build```

Stage:
```npm run ng build:stage```

Prod:
```npm run ng build:prod```

## Deployment

To deploy the application to firebase do this:

Go to directory /dist/dev and run ```firebase deploy --only hosting```.
This will deploy the application to the dev environment. 
Beware that you need to do ``firebase login`` first to get asccess to you the firebase project.
