// first we import our dependencies...
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appConfig = require('./config');
const Comment = require('./model/comments');

// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number
// if you have set it up or 3001
const port = process.env.API_PORT || 3001;

// db config
mongoose.connect(`mongodb://${appConfig.mLab.user}:${appConfig.mLab.pwd}`
  + '@ds129796.mlab.com:29796/champs-coq');

// now we should configure the API to use bodyParser and look for
// JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// To prevent error from Cross Origin Resource Sharing, we will set our
// headers to allow CORS with middleware like so:
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers,Origin,Accept,X-Request-With,'
    + 'Content-Type,Access-Control-Request-Method,'
    + 'Access-Control-Request-Headers');
  // and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// now we can set the route path & initialize the API
router.get('/', (req, res) => {
  res.json({ message: 'API Initialized!' });
});

// Adding the /comments route to our /api router
router.route('/comments')
  // retrieve all comments from the database
  .get((req, res) => {
    // looks at our Comment Schema
    Comment.find((err, comments) => {
      if (err) return res.send(err);
      // responds with a json object of our database comments.
      return res.json(comments);
    });
  })
  // post new comment to the database
  .post((req, res) => {
    const comment = new Comment();
    // body parser lets us use the req.body
    comment.author = req.body.author;
    comment.text = req.body.text;
    comment.save((err) => {
      if (err) res.send(err);
      res.json({ message: 'Comment successfully added!' });
    });
  });

// Adding a route to a specific comment based on the database ID
router.route('/comments/:comment_id')
  // The put method gives us the chance to update our comment based on
  // the ID passed to the route
  .put((req, res) => {
    Comment.findById(req.params.comment_id, (err, commentParam) => {
      if (err) return res.send(err);
      // Setting the new author and text to whatever was changed. If
      // nothing was changed we will not alter the field.
      const comment = commentParam;
      comment.author = req.body.author ? req.body.author : null;
      comment.text = req.body.text ? req.body.text : null;
      // Save comment
      return comment.save((err2) => {
        if (err2) return res.send(err2);
        return res.json({ message: 'Comment has been updated' });
      });
    });
  })
  // Delete method for removing a comment from our database
  .delete((req, res) => {
    // Selects the comment by its ID, then removes it.
    Comment.remove({ _id: req.params.comment_id }, (err) => {
      if (err) return res.send(err);
      return res.json({ message: 'Comment has been deleted' });
    });
  });

// Use our router configuration when we call /api
app.use('/api', router);

// starts the server and listens for requests
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`api running on port ${port}`);
});
