const express = require("express");
const fs = require("fs");
const path = require('path');

const stubs = require('./routes');

const app = express();


app.listen(8090, () => console.log("Listening on port 8090!"));
app.use(stubs);


module.exports = app;
