# Express server with sqlite3 

Implement web server in nodejs using express server. 
The web server manage list of users persistently.  
The server provide interface to view list of users. 
The server allow to add new user. When new user added , all the web clients display immediately the added user in the list. 

### Installing

Install npm packages

```
npm install
```

## Running the server

```
npm start
```
## Project structure

```
├── views
│   ├── layouts
│   │   ├── base.handlebars - master layout( express-handlebars ). template where we generate main html doc
│   ├── home.handlebars - layout that is rendered ito master layout. add user form template.
├── package.json - npm packages
├── server.js - Express server /w module dependencies
├── users.db - sqllite table in bindary (generated after create table)
```

## Dependencies
```
 "dependencies": {
    "body-parser": "^1.18.2",
    "express": "^4.16.2",
    "express-handlebars": "^3.0.0",
    "express-longpoll": "0.0.4",
    "nodemon": "^1.15.1",
    "sqlite3": "^3.1.13"
  }
```


```
"body-parser": "^1.18.2" - BODY PARSERS URLENCODED/JSON - PARSING AJAX REQUESTS
```
```
"express": "^4.16.2" - Express is a minimal and flexible Node.js web application framework that provides  
a robust set of features for web and mobile applications.
```
```
"express-handlebars": "^3.0.0" - Seems to be the most popular package at the moment. 
One difference in comparison with other packages is an ability to use Hooks. In this way you can  
override some functionality of ExpressHandlebars instances. 
```
```
"express-longpoll": "0.0.4" - Lightweight long polling module for express.js. Sets up basic long  
poll with subscribe and publish functionality.
```
```
"nodemon": "^1.15.1" - Nodemon is a utility that will monitor for any changes in your source and  
automatically restart your server.
```
```
"sqlite3": "^3.1.13" - SQLite is an in-process library that implements a self-contained, serverless,  
zero-configuration, transactional SQL database engine.
```
