const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const User = require('../../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get('/test', (req, res) => res.json({ msg: 'This is the users route' }));

//* register new user

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ email: 'A user is already registered with that email' });
    } else {
      const newUser = new User({
        password: req.body.password,
        email: req.body.email,
        username: req.body.username,
        avatarUrl: req.body.avatarUrl,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = { id: user.id, email: user.email };
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 24 * 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    user: user,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//* user login

router.post('/signin', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = 'This user does not exist';
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, email: user.email };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 24 * 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
              user: user,
            });
          }
        );
      } else {
        errors.password = 'invalid combination of email and password';
        return res.status(400).json(errors);
      }
    });
  });
});
//show other user profile
router.get('/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(err));
});

//* update user

router.patch(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({ _id: req.params.userId }).then((user) => {
      if (!user) {
        errors.email = 'This user does not exist';
        return res.status(400).json(errors);
      }
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          const newUser = {
            password: req.body.newPassword,
            email: req.body.email,
            username: req.body.username,
            avatarUrl: req.body.avatarUrl,
          };

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;

              User.findOneAndUpdate({ _id: req.params.userId }, newUser, {
                new: true,
              })
                .then((user) => {
                  res.json(user);
                })
                .catch((err) => res.status(400).json(err));
            });
          });
        } else {
          errors.password = 'invalid combination of email and password';
          return res.status(400).json(errors);
        }
      });
    });
  }
);

router.get('/', (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
