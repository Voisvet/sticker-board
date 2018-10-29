const express = require('express');

var stubs = express.Router();

/*
 * Methods-helpers
 */

stubs.get('/login', (req, res, next) => {});

stubs.get('/logout', (req, res, next) => {});

/*
 * Administrators management
 */

stubs.get('/admins/list', (req, res, next) => {});

stubs.get('/admins/info/:id', (req, res, next) => {});

stubs.put('/admins/info/:id', (req, res, next) => {});

stubs.post('/admins/create', (req, res, next) => {});

/*
 * Messages management
 */

stubs.get('/messages/list', (req, res, next) => {});

stubs.post('/messages/create', (req, res, next) => {});

stubs.get('/messages/info/:id', (req, res, next) => {});

stubs.put('/messages/info/:id', (req, res, next) => {});

/*
 * Messages management
 */

stubs.get('/rekognition/list', (req, res, next) => {});

// Export module
module.exports = stubs;
