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
    const post = new Post({
      title:    request.body.title,
      content:  request.body.content
    });

    post.save().then(createdPost => {
      response.status(201).json({
        message:  "Post added successfully.",
        postId:   createdPost._id
      });
    });
  }
);

app.get('/api/posts',(request, response, next) =>
{
  Post.find()
    .then(
      documents => {
        console.log(documents);
        response.status(200).json(
          {
            message: 'Posts fetched successfully',
            posts: documents
          }
        );
      }
    )
    .catch();
});

app.delete("/api/posts/:id", (request, response, next) => {
  //console.log(request.params.id);
  Post.deleteOne({_id: request.params.id})
    .then(result => {
      console.log(result);
      response.status(200).json({message: "Post deleted."});
    })
});

module.exports = app;
