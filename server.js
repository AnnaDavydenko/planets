import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import * as https from 'https';
import { readFileSync } from 'node:fs';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

const AUTH_OPTIONS = {
  callbackURL: '/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  console.log('Google profile', profile);
  done(null, profile);
};

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
const PORT = 3000;
const app = express();

app.use(helmet());
app.use(passport.initialize());

const checkLoggedIn = (req, res, next) => {
  const isLoggedIn = true; //todo
  if (!isLoggedIn) {
    return res.status(401).json({
      error: 'Not logged in',
    });
  }
  next();
};

app.get('/auth/google/',
  passport.authenticate('google', {
    scope: ['email'],
  }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: false,
  }),
  (req, res) => {
    console.log('Google called us back!'); // res.redirect()
  },
);

app.get('/auth/logout', (req, res) => {
});

app.get('/secret', checkLoggedIn, (req, res) => {
  return res.send('Your secret value is 42!');
});

app.get('/failure', (req, res) => {
  return res.send('Failed to log in!');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public' + '/index.html');
});

https.createServer({
  key: readFileSync('key.pem'),
  cert: readFileSync('cert.pem'),
}, app).listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
