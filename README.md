# Daylog API
## Node JS API server with SQL for CRUD operations

### Installation
* Make a `.env` file on the `.env.example`, fill out properly (SQL access infos)
* `$ nvm use` (Node version is stored in `.nvmrc` file)
* `$ yarn install`

### Start db and phpMyAdmin
* `$ docker-compose -d up`

### Init db
* `$ yarn run init-db`

### If you want to tear down the database, just keep repeating until you reach the initial state
* `$ NODE_ENV=development npx knex migrate:down`

### Run server in development environment (with `nodemon`)
* `$ yarn run dev`

### Run server in production environment
* `$ yarn start`

## How does this JWT thingy works anyway?

When you log in, the server responds you back with both access token and a refresh token.
### access token
use it to access the resources on the server, u just need to set the Authorization header to "Bearer [access token]" (see request.rest, how that looks like)
if the access token is expired, you can use the refresh token what you received before, to get a brand new access token, using the `POST /users/token` endpoint.

### refresh token
use it to get a new access token. the token is stored in the user record and it needs to be present to be used - when you log in, it is set, when you log out, it is deleted.

### middleware
An express middleware is used to authenticate the JWT access token. If the authentication is successful, the user data is attached to the request object, so your controllers can use it by just simply referring to `req.user`.
It is an async, middleware, so using it is a little different from the nmormal ones:
for example in the logs routes:
```
router.get('/:id', jwtAccesTokenAuth, (req, res) => getLog(req, res) )
```
so as u can see, the getLog controller function is wrapped in a callback function here (even though we are using a promise for the middleware, I mean WTF express?)

U need to use this auth middleware for all the routes you want to "protect" (so no login, create user and token endpoints but all the others)

### Author
Miklós Szilas - szilas.miklos@gmail.com
