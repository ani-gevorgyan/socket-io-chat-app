Socket-io-chat-app

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

In client directory run `node client ${Bearer auth_token}`.<br />

Put the authorization token obtained from login endpoint insead of `auth_token` as mentioned above. <br />

This will handle the authorized access to the chat app. <br />

### Command Line chat commands


Type `joinRoom ${chatroomId}` if you want to join a room.<br />
You can get the list of all the chatrooms by following the correspoding endpoing provided in the postman link.<br />

Type `chatroomMessage ${message}` if you want to send a message.<br />
Insert the desired message instead of `${message}`.<br />

Type `leaveRoom` to leave the current chatroom. <br />


## Postman link

#### 


