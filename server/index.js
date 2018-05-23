require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const passport = require('passport');
const passportSetUp = require('./services/passport');
const session = require('express-session');

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./schema');
const resolvers = require('./schema/resolvers');

const dbConnection = require('./db');

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT ? process.env.PORT : 5000;

app.listen(port, () => {
  console.log('Express Server Listening on Port 5000!');
});
