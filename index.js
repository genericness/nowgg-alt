// backend/server.js
import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import { config } from './srv/config/index.js';
import { initDockerManager } from './srv/docker/index.js';
import routes from './srv/routes/index.js';
import './srv/auth/index.js';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect(config.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(session({ secret: config.secret, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes
app.use('/', routes);

// Initialize Docker Manager for managing containers
initDockerManager(io);

server.listen(config.port, () => console.log(`Server is running on port ${config.port}`));
