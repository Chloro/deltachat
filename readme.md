** Deltachat
===================

> A simple chat application using sockets

## Requirements

You will need to setup mongodb in order to run this application. Check out the following article for an easy setup:
`https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04`

## Setup
Run `npm install` in both the front directory and the back directory. Once complete run `pm2 server.js` from the back
directory to start the server. From the front directory do `npm run dev` and the dev server will start. Enter
`localhost:3000` into the browser to see the app running.

## Notes

This application is currently being rewritten. Changes include moving from bootstrap to angular-material and converting
the node code to ES6. It should not be used in a production setting in it's current state! Feel free to submit PRs.
