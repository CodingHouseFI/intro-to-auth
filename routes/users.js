var express = require('express');
var router = express.Router();

var User = require('../models/user');


router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    res.status(err ? 400 : 200).send(err || users);
  });
});

//   /api/users/register
router.post('/register', (req, res) => {
  User.register(req.body, err => {
    res.cookie('cadecookie', 'yup. cookie.');
    res.status(err ? 400 : 200).send(err);
  });
});


// //   /api/users/login

// router.post('/login', (req, res) => {



//   if(loginIsValid()) {

//     res.cookie('accessToken', {username: 'mrbob'})

//   }


// })



module.exports = router;
