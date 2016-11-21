# Module to integrate Braintree payments with your app 
<br />
<br />


## What you will learn:
* Braintree
* Node.js
* Express

<br />

## Braintree
Braintree is a full-stack payments platform for web and mobile applications. 
It can be integrated into your app to process payments for you with added security and an easy UI.
They provide a lot of the code for you including the UI (shown below) for users to enter their credit card info and an option to pay through paypal as well.
<img src="imgs/braintree-ui.png" />

<br />

## Node.js
Node.js is a ...










## Setup
### Run these on your command line
### (sudo is not needed if you're using Windows cmd)
1. [Install Node.js and npm](https://nodejs.org/en/)
2. Braintree: `sudo npm install braintree`
3. Express: `sudo npm install express --save`
4. Body parser: `sudo npm install body-parser`
5. Nodemon: `sudo npm install -g nodemon`
6. [Install Allow-Control-Allow-Origin for chrome](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?utm_source=gmail)

<br />

## Why do I need to install these?
1. Node.js: back-end for servers built on JavaScript
2. Braintree: package used to integrate payment application
3. Express: web framework used alongside Node.js
4. Body parser: parses incoming request bodies in a middleware before your handlers
5. Nodemon: detects any files changes and automatically restarts your node application.
6. Allow-Control-Allow-Origin: allows JavaScript on a web page to make XMLHttpRequests to another domain so you can have the front-end and back-end both running on your local server on different ports.

<br />

