# example-kitchen-orders

This is an example app using Hapi.js on the server and React.js on the client

### Running the app

Clone this repo and `npm install` both in the root and `client/` directories

```bash
npm install
npm start
```

### Running the tests

```
npm test
npm test:client
```

### Running in production mode

```
npm run build
npm run server:prod
```

## Server Routes

 * `GET /orders` responds with all orders that are not picked up and where the ETA is in the future.
 * `POST /orders` creates a new order. Responds with the created order. Accepts the following optional parameters.
   * `name` : `String`
   * `address` : `String`
   * `eta` : `Date`
   * `courierId` : `Integer`
 * `PUT /orders/{orderId}/pickup` mark an order as picked up. Responds with a `200` status for success.


## Other libraries

Here are some other libraries this project uses

### Server

 * **sqlite** This is just an example so I wanted to use something that would allow persistent storage without needing to setup a full database.
 * **faker.js** Generate names and addresses that look realistic.
 * **lab** and **code** for testing

 ### Client

 * **create-react-app**
 * **glamor** CSS-in-JS library
 * **redux**
 * **redux-thunk**
 * **react-modal**
 * **jest** for testing
