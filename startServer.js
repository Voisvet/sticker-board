// External dependencies
const path = require('path');
const hotClient = require('webpack-hot-client');
const middleware = require('webpack-dev-middleware');
const webpack = require('webpack');

// Internal dependencies
const config = require('./webpack.config');
const app = require('./stub');

// Initialize webpack compiler
const compiler = webpack(config);
// webpack-hot-client options
const options = { };

// we recommend calling the client _before_ adding the dev middleware
const client = hotClient(compiler, options);
const { server } = client;

// Starting server
server.on('listening', () => {
  app.use(middleware(compiler, config.output));
  // Fallback when no previous route was matched
  app.get('*', (req, res, next) => {
    const filename = path.resolve(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type','text/html');
      res.send(result);
      res.end();
    });
  });
});
