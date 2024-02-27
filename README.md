# Socket-io-chat-app

This is a Socket.io chat application. The application uses command line commands to communicate.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all the required packages.

## Create chat_app database

### 1. `sudo -u postgres psql`

### 2. `CREATE DATABASE chat_app;`

### 3. `\connect chat_app;`

## Run Migrations

### `npm run typeorm migration:run`

Runs migrations

## Start server
In the app directory run.<br />
### `npm run start:dev`

Runs the app in the development mode on port 4000.<br />

The server will reload if you make edits.<br />

## Start client
#### `Open a new terminal and follow the instructions below.`<br />

To start the client.<br />

One should be in `client` directory.<br />
`cd client` command will set the current directory to be the `client` directory.<br />

In client directory run `node client Bearer ${auth_token}`.<br />

Put the authorization token obtained from login endpoint instead of `auth_token` as mentioned above. <br />

This will handle the authorized access to the chat app. <br />

### Command Line chat commands


Type `joinRoom ${chatroomId}` to join a room to be able to chat.<br />
You can get the list of all the chatrooms by requesting the corresponding endpoint provided in the postman link.<br />

Type `chatroomMessage ${message}` if you want to send a message in the chatroom.<br />
Insert the desired message instead of `${message}`.<br />

Type `leaveRoom` to leave the current chatroom. <br />


## Postman link

#### https://www.postman.com/gold-space-386125/workspace/socket-io-chat-app


