// backend/auth.js
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/User.js'; // Assume you have a User model defined

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
