const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/User'); 

// passport.use(new GoogleStrategy(
// //   {
// //   clientID:,
// //   clientSecret: ,
// //   callbackURL: ,
// // },
// async (token, tokenSecret, profile, done) => {
//   try {
//     let user = await User.findOne({ googleId: profile.id });
//     if (user) {
//       return done(null, user);
//     }

//     // Create a new user
//     user = new User({
//       firstName: profile.name.givenName,
//       lastName: profile.name.familyName,
//       email: profile.emails[0].value,
//       googleId: profile.id,
//       // Add any additional fields if necessary
//     });

//     await user.save();
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// }));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

module.exports = passport;
