const express = require('express');
const cors = require('cors');
require('dotenv').config();
const colors = require('colors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');

connectDB();

const port = process.env.PORT || 4000;

const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema,
}));

app.listen(port, console.log('Loading!'));

