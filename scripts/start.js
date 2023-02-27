/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err;
});

// Ensure environment variables are read.
require("../config/env");

const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles");
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require("react-dev-utils/WebpackDevServerUtils");

const paths = require("../config/paths");
const webpackConfig = require("../config/webpack.config");
const createDevServerConfig = require("../config/webpackDevServer.config");

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

if (process.env.HOST) {
  console.log(`Attempting to bind to env.HOST: ${process.env.HOST}`);
}

// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicPath = "/";

// We attempt to use the default port but if it is busy, we offer the user
// to run on a different port. `choosePort()` Promise resolves to the next
// free port.
choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    if (port == null) {
      return;
    }

    const protocol = process.env.HTTPS === "true" ? "https" : "http";
    const appName = require(paths.appPackageJson).name;

    const urls = prepareUrls(protocol, HOST, port, publicPath.slice(0, -1));
    // Create a webpack compiler that is configured with custom messages.
    const compiler = createCompiler({
      appName,
      config: webpackConfig({publicPath}),
      urls,
      useTypeScript: true,
      webpack,
    });
    // Load proxy config
    const proxySetting = require(paths.appPackageJson).proxy;
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic, publicPath);
    // Serve webpack assets generated by the compiler over a web server.
    const serverConfig = {
      ...createDevServerConfig(proxyConfig, urls.lanUrlForConfig, publicPath),
      host: HOST,
      port,
    };
    const devServer = new WebpackDevServer(serverConfig, compiler);
    devServer.start();

    ["SIGINT", "SIGTERM"].forEach(function (sig) {
      process.on(sig, function () {
        devServer.close();
        process.exit();
      });
    });
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });
