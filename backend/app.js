const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://admin:GCROHO3OzaiT13K3@cluster0.vpn4v8h.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then ( () => {console.log('Connected to database.')} )
  .catch( () => {console.log('Connection failed.')} )

app.use(bodyParser.json());

app.use(
  (request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    response.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  }
);

app.post('/api/posts',
  (request, response, next) => {
    //const post = request.body;
    const post = new Post({
      title:    request.body.title,
      content:  request.body.content
    });
    //console.log(post);

    post.save();

    response.status(201).json({
      message: "Post added successfully."
    });
  }
);

app.use('/api/posts',
  (request, response, next) => {

    const posts = [
    {
      id: '1',
      title: 'First server-side post',
      content: 'This is from the server.'
    },
    {
      id: '2',
      title: 'Second server-side post',
      content: 'This is from the server.'
    },
    {
      id: '3',
      title: 'Third server-side post',
      content: 'This is from the server.'
    }
  ];

    response.status(200).json(
      {
        message: 'Posts fetched successfully',
        posts: posts
      }
    );
  }
);

module.exports = app;
