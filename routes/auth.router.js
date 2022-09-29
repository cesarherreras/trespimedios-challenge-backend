const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      res.json('Correct information ¡Welcome!');
    } catch (error) {
      next(error);
    }
});

module.exports = router;