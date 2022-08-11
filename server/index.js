const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const port = process.env.PORT || 3000;

const app = express();


app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema,
}));

app.listen(port, console.log('Loading!'));

