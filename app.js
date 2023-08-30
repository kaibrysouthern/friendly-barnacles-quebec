const express = require('express')
const app = express()

app.set('view engine', 'ejs');

let myVariableServer = "soft coded server data";

app.get('/view', function (req, res) {
  res.render('index', 
  {
    'myVariableClient': myVariableServer
  });
})

app.get('/', function (req, res) {
  res.send('Hello World From Express and a Paas/Render' )
})

app.get('/whatever', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})


app.listen(4000);