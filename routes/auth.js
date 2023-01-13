import { Router } from 'express';
const router = Router();
import passport from 'passport';
import { config } from '../config/config.js';

router.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "https://worrisome-shift-frog.cyclic.app");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "*");
        next();
    });

router.get("/login/success", (req, res) => {
	console.log('login/success')
	if (req.user) {
		console.log('log')
		res.status(200).json({
			error: false,
			message: "Successfully Logged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: config.google.redirecturl,
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(config.google.redirecturl);
});

export default router;