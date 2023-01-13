import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
const GoogleStrategy = Strategy;
import { config } from './config/config.js';


const passportStrategy = passport.use(
	new GoogleStrategy(
		{
			clientID: config.google.clientid,
			clientSecret: config.google.clientsecret,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

export default passport