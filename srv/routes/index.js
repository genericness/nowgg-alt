// backend/routes/index.js
import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post('/register', async (req, res) => {
    // Handle user registration and email verification
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/dashboard');
});

router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Welcome to your dashboard!');
    } else {
        res.redirect('/login');
    }
});

export default router;
