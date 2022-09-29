const passport = require('passport');
//Local strategy
const LocalStrategy = require('./strategies/local.strategy');

passport.use(LocalStrategy);