const express = require('express');
const path = require('path');
const cors = require('cors')
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const dbUrl = 'mongodb://localhost:27017/AdsDB';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(session({
  secret: process.env.sessionSecret,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/AdsDB' }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV == 'production',
  }
}))

//import router
const adsRoutes = require('./routes/ads.routes')
const usersRoutes = require('./routes/users.routes')
const authRotes = require('./routes/auth.routes')

app.use('/api', adsRoutes);
app.use('/api', usersRoutes);
app.use('/auth', authRotes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


app.use((req, res) => {
  res.status(404).json({ message: 'not found' });
})

server.prependListener("request", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
});

module.exports = server;