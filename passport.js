import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from './config/config.js';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import mongoose from 'mongoose';
import {User} from './models/user.js';

const passportStrategy = passport.use(
	new GoogleStrategy(
		{
			clientID: config.google.clientid,
			clientSecret: config.google.clientsecret,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			console.log(profile);
      		// profile has all google login data
      		/* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: START =========  */

      		// check if user id already inserted
      		User.findOne({ userId: profile.id }).then(existingUser => {
        		if (existingUser) {
          		done(null, existingUser);
        		} else {
          		// new user case
          		// insert new user id
          		new User({
            		userId: profile.id,
            		username: profile.displayName,
            		picture: profile._json.picture
          		})
            	.save()
            	.then(user => {
              	done(null, user);
            	});
        	}
      	});
      /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: END =========  */
		}
	)
);

// For facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: config.fb.appid,
      clientSecret: config.fb.appsecret,
      callbackURL: "/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: START =========  */
      // check if user id already inserted
      User.findOne({ userId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          // new user case
          // insert new user id
          new User({
            userId: profile.id,
            username: profile.displayName,
            picture: profile._json.picture
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
      /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: END =========  */
    }
  )
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
    done(null, user);
  });
});

export default passport