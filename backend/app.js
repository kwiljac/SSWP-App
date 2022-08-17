const express = require('express');

const app = express();

app.use(
  (request, response, next) => {
    console.log('My first middleware response.')
    next();
  }
);

app.use(
  (request, response, next) => {
    response.send('Hello from Express!')
    next();
  }
);

module.exports = app;
