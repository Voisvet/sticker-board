const express = require('express');
const fs = require('fs');
const path = require('path');

var stubs = express.Router();

/*
 * Methods-helpers
 */

stubs.get('/login', (req, res, next) => {
  response = fs.readFileSync(path.join(__dirname, './json/login.json'));
  res.send(response);
});

// Middleware for checking authorization token
stubs.use((req, res, next) => {
  if (req.query.token != 'VGhpcyBpcyB0b2tlbg==') {
    response = fs.readFileSync(path.join(__dirname, './json/auth_error.json'));
    res.send(response);
  } else {
    next();
  }
});

stubs.get('/logout', (req, res, next) => {
  response = fs.readFileSync(path.join(__dirname, './json/logout.json'));
  res.send(response);
});

/*
 * Administrators management
 */

stubs.get('/admins/list', (req, res, next) => {
  response = fs.readFileSync(path.join(__dirname, './json/admins/list.json'));
  res.send(response);
});

stubs.get('/admins/info/:id', (req, res, next) => {
  fileName = req.params.id + '.json'
  response = fs.readFileSync(path.join(__dirname, './json/admins/info', fileName));
  res.send(response);
});

stubs.put('/admins/info/:id', (req, res, next) => {
  response = fs.readFileSync(path.join(__dirname, './json/admins/info/put.json'));
  res.send(response);
});

stubs.post('/admins/create', (req, res, next) => {
  response = fs.readFileSync(path.join(__dirname, './json/admins/create.json'));
  res.send(response);
});

/*
 * Messages management
 */

stubs.get('/messages/list', (req, res, next) => {
  response = fs.readFileSync(path.join(__dirname, './json/messages/list.json'));
  res.send(response);
});

stubs.post('/messages/create', (req, res, next) => {
  response = fs.readFileSync(path.join(__dirname, './json/messages/create.json'));
  res.send(response);
});

stubs.get('/messages/payload/:id', (req, res, next) => {
  fileName = req.params.id + '.json'
  response = fs.readFileSync(path.join(__dirname, './json/messages/payload', fileName));
  res.send(response);
});

stubs.put('/messages/payload/:id', (req, res, next) => {
  fileName = req.params.id + '.json'
  response = fs.readFileSync(path.join(__dirname, './json/messages/payload/put.json'));
  res.send(response);
});

stubs.get('/messages/stickers/recent', (req, res, next) => {
  response = fs.readFileSync(path.join(__dirname, './json/messages/stickers/recent.json'));
  res.send(response);
});

stubs.get('/messages/stickers/preview/:id', (req, res, next) => {
  fileName = req.params.id + '.json'
  response = fs.readFileSync(path.join(__dirname, './json/messages/stickers/preview', fileName));
  res.send(response);
});

/*
 * Messages management
 */

stubs.get('/rekognition/list', (req, res, next) => {
  response = fs.readFileSync(path.join(__dirname, './json/rekognition/list.json'));
  res.send(response);
});

// Export module
module.exports = stubs;
