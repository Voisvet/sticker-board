const express = require('express');
const fs = require('fs');
const path = require('path');

var stubs = express.Router();

/*
 * Methods-helpers
 */

stubs.get('/login', (req, res, next) => {
  if (req.query.login == 'Andrey' && req.query.password == '123') {
    response = fs.readFileSync(path.join(__dirname, './json/login.json'));
  } else {
    response = fs.readFileSync(path.join(__dirname, './json/login_failed.json'));
  }
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
  try {
    fileName = req.params.id + '.json'
    response = fs.readFileSync(path.join(__dirname, './json/admins/info', fileName));
  } catch (err) {
    response = fs.readFileSync(path.join(__dirname, './json/id_not_found.json'));
  }
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

stubs.get('/messages/chats_list', (req, res, next) => {
  response = fs.readFileSync(path.join(__dirname, './json/messages/chats_list.json'));
  res.send(response);
});

stubs.get('/messages/info/:id', (req, res, next) => {
  try {
    fileName = req.params.id + '.json'
    response = fs.readFileSync(path.join(__dirname, './json/messages/info', fileName));
  } catch (err) {
    response = fs.readFileSync(path.join(__dirname, './json/id_not_found.json'));
  }
  res.send(response);
});

stubs.put('/messages/info/:id', (req, res, next) => {
  try {
    // Stupid check that this id exists
    fileName = req.params.id + '.json'
    response = fs.readFileSync(path.join(__dirname, './json/messages/info', fileName));
    // Read actual response content
    response = fs.readFileSync(path.join(__dirname, './json/messages/info.json'));
  } catch (err) {
    response = fs.readFileSync(path.join(__dirname, './json/id_not_found.json'));
  }
  res.send(response);
});

stubs.delete('/messages/info/:id', (req, res, next) => {
  res.send(JSON.stringify({
    "status_code": 0,
    "error": ""
  }));
});

stubs.get('/messages/payload/:id', (req, res, next) => {
  try {
    fileName = req.params.id + '.json'
    response = fs.readFileSync(path.join(__dirname, './json/messages/payload', fileName));
  } catch (err) {
    response = fs.readFileSync(path.join(__dirname, './json/id_not_found.json'));
  }
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
  try {
    fileName = req.params.id + '.json'
    response = fs.readFileSync(path.join(__dirname, './json/messages/stickers/preview', fileName));
  } catch (err) {
    response = fs.readFileSync(path.join(__dirname, './json/id_not_found.json'));
  }
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
