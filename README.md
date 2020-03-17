# webstack

## Overview

Frameworks litter the JavaScript ecosystem, each with specific organization techniques and different abstractions.

Because of plethora of solutions, developers may not be able to differentiate framework abstractions and native bindings!

In reality, setting up a simple web server and template engine is actually extremely minimal!

In [`src/`](https://github.com/syall/webstack/tree/master/src), there are simple functions that set up a basic web server in [Node.js](https://nodejs.org/en/), implement a simple router similar to the [Express API](https://expressjs.com/en/4x/api.html#router), and set up a simple template engine.

## Using the API

A sample application is written in [`index.js`](https://github.com/syall/webstack/blob/master/index.js) which shows how easy it is to write a server with native functions.

The `config` is loaded in via [`dotenv`](https://www.npmjs.com/package/dotenv) in a `.env` file:

Name | Description
---- | ----------------------------------
PORT | Port to run on
HOST | Host Name
SSL  | Folder with `.key` and `.cert` files

## [Simple Server](https://github.com/syall/webstack/blob/master/src/SimpleServer.js)

Creating a server is extremely simple!

Based on `SSL` enviroment variable, either an [`https`](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener) or [`http`](https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener) server will be created.

The `HOST` and `PORT` default to `127.0.0.1` and `3000` respectively if not defined.

A `run` function is attached to the server, in which the native [`listen`](https://nodejs.org/api/net.html#net_server_listen) method is called and attaches an `error` event listener.

## [Simple Router](https://github.com/syall/webstack/blob/master/src/SimpleRouter.js)

Routes are defined as a pair of values: regex to match against the request URL and handlers as behavior when matched.

Additional routes are added using the `add` function which push a pair of values `[regex, handler]` to the list of routes.

On requests, data is assumed and assigned to the [`IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage).

After the data is attached, the request URL is matched across the routes and if matched, the handler is run with the `request` and `response` as arguments.

## Template Engine

The template engine is written in the function [`render`](https://github.com/syall/webstack/blob/master/src/render.js) and is copied from [`AbsurdJS`](https://github.com/krasimir/absurd/blob/master/lib/processors/html/helpers/TemplateEngine.js) from [a blog post the owner wrote](https://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line).

Essentially, HTML files can be templated with the `<%(.*)?%>` pattern.

A meaningful subset of JavaScript code can be written between these brackets, translated by a function generated from the Code Generator/Compiler.

The input template is continuously matched against the brackets, then the JavaScript/HTML lines are added to the generated code.

## Process Handling

In [`src/utils.js`](https://github.com/syall/webstack/blob/master/src/utils.js), the function `handleSignals` handles `SIGINT` and `SIGTERM` [signals](https://nodejs.org/api/process.html#process_signal_events) by calling the native [`close`](https://nodejs.org/api/net.html#net_server_close_callback) method on the server to properly shut the server down.

## Personal Notes

I was studying some parts of the [`node`](https://nodejs.org/en/) runtime that I might need to build a video streaming server.

When I was studying [`http`](https://nodejs.org/api/http.html), I realized it was very easy to build a web server, totally unrelated to the original project.

However, I became familiar with the [`Event`](https://nodejs.org/api/events.html) model that is usually used in streams and servers.
