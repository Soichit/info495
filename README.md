# Integrate Braintree payments with your app
## Using JavaScript (front-end) and Node.js (back-end) 
<br />


## What you will learn:
### (You should already know JavaScript, HTML for the front-end)
* Braintree
* Node.js
* Express

<br />

## Braintree
* a full-stack payments platform for web and mobile applications. 
* It can be integrated into your app to process payments for you with added security and an easy UI.
* They provide a lot of the code for you including the UI (shown below) for users to enter their credit card info and an option to pay through paypal as well.

<br />

## Node.js
* JavaScript runtime environment.
* event-driven framework used to develop I/O intensive and scalable server-side web applications.
* comes with lots of useful modules.
* comes with NPM (node package manager).

<br />

## Express
* the most popular web framework for Node.
* a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications.

<br />
<br />




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
<br />

# There are 2 main steps to complete Braintree integration
1. Client-side (front-end)
2. Server-side (back-end)

## Client-side steps:
1. Build braintree payment form
2. Request client token from server side (XML format)
3. Embed client token into braintree form.
4. Send payment nounce to server-side

## Server side steps:
1. Generate client token
2. Send client token response to client
3. Receive payment nounce from client-side
4. Create a transaction

## BrainTree vocabulary
**Client token** =  contains all authorization and configuration information your client needs to initialize the client SDK to communicate with Braintree. 
<br />
**Payment nounce** = a one time use value that represents that payment method. On your server, the payment method nonce is used with a Braintree server SDK to charge a card or update a customer's payment methods.

<br />
<br />

# Let's get started!

## Client-side (part 1 / 2)
Create a `index.html` file for your front-end


### Step 1: Build braintree payment form
Copy this code and paste it in. If you want to create a seperate JavaScript file, that's fine.


```
<form id="checkout" method="post" action="/checkout">
  <div id="payment-form"></div>
  <input type="submit" value="Pay $10">
</form>

<script src="https://js.braintreegateway.com/js/braintree-2.30.0.min.js"></script>
<script>
// This is just an initial client token value you can use to test if your UI is working.
// We need to generate a client token on our server, so in step 2,
// we will replace this with an AJAX call that retrieves the client token from your server.
var clientToken = "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiIzNWI2NjMwOGNkYjM1MjFjZWY3MTI0ZTZkOGI2YTQwOTMzMjA2YTcwYjc5OTY0OTVkMzI3ZWI1MTkwZjdjYjNkfGNyZWF0ZWRfYXQ9MjAxNi0xMS0yMVQwMDo1MDozNS44MTMyMjU0MTYrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0=";

braintree.setup(clientToken, "dropin", {
  container: "payment-form"
});
</script>
```
Run this code and see if the UI is displayed on the front-end. If the client token isn't valid, it will not show up so make sure your client token value is valid. The UI should like this:
<img src="imgs/braintree-ui.png" />


### Step 2:  Request client token from server side (XML format)
We will use jQuery to do an AJAX request to your server-side code (which will be created next).
<br />
For now, we will do a request to our localhost:3001 port to test it. When we create our back-end code,
we need to make sure we host on the same port, localhost:3001.
```
var clientToken;
$.ajax({url: "http://localhost:3001/client_token",
		success: function(result) {
        	console.log(result);
        	clientToken = result;
        }});
```


### Step 3:  Embed client token into braintree form
```
braintree.setup(CLIENT_TOKEN_FROM_SERVER, 'dropin', {
  container: 'payment-form'
});
```


### Combining Steps 2 and 3
You need to build the form within the AJAX request.
```
var clientToken;
// ajax request to recieve client token
$.ajax({url: "http://localhost:3001/client_token",
		success: function(result) {
        	console.log(result);
        	clientToken = result;

        	// embedding the client token into the braintree template
         	braintree.setup(clientToken, "dropin", {
			    container: "payment-form"
		    });
        }});

```


### Step 4:  Send payment nounce to server-side
The payment nounce is automatically recieved when the client submits the form and it is automatically sent to the server side. In the server side, the payment nounce will be used to create a transaction. We will not be needing any more code written in the client side.

### Client side complete code
```
<form id="checkout" method="post" action="/checkout">
  <div id="payment-form"></div>
  <input type="submit" value="Pay $10">
</form>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://js.braintreegateway.com/js/braintree-2.29.0.min.js"></script>

<script>

// AJAX call to retrieve client token from server
var clientToken;
$.ajax({url: "http://localhost:3001/client_token",
    success: function(result) {
          console.log(result);
          clientToken = result;

          // embedding the client token into the braintree template
          braintree.setup(clientToken, "dropin", {
        container: "payment-form"
      });
        }});
</script>
```

<br />

## Server-side (part 2 / 2)
Create a `app.js` file. It doesn't have to be in the same folder as the index.html, but you will need to run both on different local servers to test your code. Make sure to install the Allow-Control-Allow-Origin for chrome (link provided at the top under Setup)

### Step 0: Setting up our Node file
Make sure we have all packages and dependencies installed. Go back to Setup to see the commands to npm install braintree and express. Then copy and paste the code below so our app.js file actually reads in these packages.
```
var braintree = require("braintree");
var express = require('express');
var app = express();

```
And go make a free Sandbox account on braintreepayments.com to get your API credentials. Once you sign up, go to Account tab > My User > under API Keys, Tokenization Keys, Encryption Keys, click View Authorizations. Once you get your API key for node.js, just copy and paste that in your server-side code. It should look something like this:
```
// configure API credentials
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "d7b6q5dgx6hdjhhw",
  publicKey: "mmjpwtk9k5mmvswv",
  privateKey: "dc0774e8ea6663588750b7993e4cf1c0"
});
```

### Step 1 & 2: Generate client token and send it to client side
Include this code after your API credentials in app.js

```
app.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});
```
If the client tries to do an AJAX request for "http://localhost:3001/client_token", it should recieve the client token. Test this by running app.js under your local port 3001, it doesn't matter what port index.html is running in as long as it's different.

### Step 3 & 4: Receive payment nounce from client-side and create a transaction with it
Paste this code under the one generating the client token.
```
app.post("/checkout", function (req, res) { 
  // recieve payment method nounce from client
  var nonceFromTheClient = req.body.payment_method_nonce;
  console.log(nonceFromTheClient);

   //creating a transaction
  gateway.transaction.sale({
    amount: "10.00",
    paymentMethodNonce: nonceFromTheClient,
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
    console.log("Success!");
  });
});
```
Here your server recieves the payment nounce from the client, then sends that to Braintree's servers to complete the transaction. The amount created here was $10 but you may use the bodyparser to change it. For any of this to work, you will need to do app.listen. Add this code to the end:
```
app.listen(3001, function () {
  console.log('listening on port 3001!')
})
```
### Server side complete code
```
var braintree = require("braintree");
var express = require('express');
var app = express();

// configure API credentials
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "d7b6q5dgx6hdjhhw",
  publicKey: "mmjpwtk9k5mmvswv",
  privateKey: "dc0774e8ea6663588750b7993e4cf1c0"
});

// generate a client token
// include customerId for returning customers
app.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});

// recieve payment method nounce from client
app.post("/checkout", function (req, res) { 
  var nonceFromTheClient = req.body.payment_method_nonce;
  console.log(nonceFromTheClient);

   //creating a transaction
  gateway.transaction.sale({
    amount: "10.00",
    paymentMethodNonce: nonceFromTheClient,
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
    console.log("Success!");
  });
});


app.listen(3001, function () {
  console.log('listening on port 3001!')
})
```
















