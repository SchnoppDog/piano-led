# Create self-signed Certificates for the App

If you wish to use this application with ssl, you can create your own self-signed certificates. In order to create self-signed certificates you have to do the following steps.

## 1. Install OpenSSL for the raspberry pi

First, update your raspberry pi:

```bash
sudo apt-get updage && apt-get upgrade
```

Second, install openssl:

```bash
sudo apt-get install libssl-dev
```

## 2. Create the self-signed Certificates

Type the follwing command in a terminal:

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -nodes
```

After that you will be ask a few questions. You can leave all of these questions empty. Just remember the next two things:

Set this to `localhost`:

```bash
Common Name (e.g. server FQDN or YOUR name) []: localhost
```

Add here your e-mail address:

```bash
Email Address []:
```

That's it. Now you habe two files called `key.pem` (private-key) and `cert.pem` (public-key). You will need those two files to establish a ssl connection. Store these certificates into a seperate folder (it can be in this application or anywhere else on the system).

## 3. Import your self-signed Certificates

Open `main.js` in `backend/` of this application. Find the following entries (should be near the top):

```javascript
const privKey           = fs.readFileSync('/usr/local/certs/keys/pianoled.local.pem')
const pubKey            = fs.readFileSync('/usr/local/certs/pianoled.local.pem')
```

Insert the full directory-path (like shown here) for each key into the corresponding variable. The variable `privKey` expects the `private certificate` and the variable `pubKey` expects the `public certificate`. After that you need to comment the following line of code: 

```javascript
const pianoServer       = require('http').createServer(colorApp)
```

To use the ssl-server, un-comment the following lines of code:

```javascript
const pianoServer       = require('https').createServer({
    key: privKey,
    cert: pubKey
}, colorApp)
```

Save and close main.js. Now restart the application (provided that you already installed the entire application):

```bash
pm2 restart LED-Piano
```

## Finish

When you visit the websites GUI you will first be greeted with an error like:

```txt
NET::ERR_CERT_AUTHORITY_INVALID
```

This is the common behaviour since you use a self-signed certificate which is not trusted by the browser. Just ignore this error and visit the website. Now you can visit the website securely via self-signed certificates (ssl).