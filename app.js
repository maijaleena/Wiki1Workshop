const express = require('express');
const morgan = require('morgan');
const {main} = require('./views')
const bodyParser = require('body-parser');
const { db, Page, User } = require('./models');
const { Sequelize } = require('sequelize');
const PORT = 5432;
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');
//initialized app
const app = express();



//logging midware
app.use(morgan('dev'));
app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));



app.get('/', function (req, res) {
  res.send('hi');
});

db.authenticate()
.then(() => {
  console.log('connected to the database');
})


const init = async () => {
  //can do indiv:
  // await Page.sync();
  // await User.sync();
  //or
  await db.sync();
  //make sure you have a PORT constant

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
}

init();

 app.listen(3000);



