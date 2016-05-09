var express = require('express');
var router = express.Router();

var request = require('request');
var qs = require('querystring');
var User = require('../models/user');

//  auth.js
//  /auth  router

router.post('/login', (req, res) => {
  User.authenticate(req.body, (err, token) => {
    if(err) return res.status(400).send(err);

    res.send({ token: token });
  });
});

router.post('/signup', (req, res) => {
  User.register(req.body, (err, user) => {
    if(err) return res.status(400).send(err);

    var token = user.makeToken();
    res.send({ token: token });
  });
});

router.post('/github', (req, res) => {
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var userApiUrl = 'https://api.github.com/user';

  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    client_secret: process.env.GITHUB_SECRET
  };

  // use code to request access token
  request.get({ url: accessTokenUrl, qs: params }, (err, response, body) => {
    if(err) return res.status(400).send(err);

    var accessToken = qs.parse(body);
    var headers = { 'User-Agent': 'satellizer' };

    //  use access token to request user profile
    request.get({ url: userApiUrl, qs: accessToken, headers: headers, json: true }, (err, response, profile) => {
      if(err) return res.status(400).send(err);

      User.findOne({ github: profile.id }, (err, existingUser) => {
        if(err) return res.status(400).send(err);

        if(existingUser) {
          var token = existingUser.makeToken();
          res.send({ token: token });

        } else {
          var user = new User();
          user.github = profile.id;

          user.save((err, savedUser) => {
            var token = savedUser.makeToken();
            res.send({ token: token });
          });
        }
      });
    });
  });
});


module.exports = router;
