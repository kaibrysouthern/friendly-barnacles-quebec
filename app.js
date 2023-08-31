const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

let myVariableServer = "soft coded server data";

app.get('/view', function (req, res) {
  res.render('index', 
  {
    'myVariableClient': myVariableServer
  });
})

app.post('/postClientData', function (req, res) {
  console.log("body: ", req.body)
   console.log("user Name: ", req.body.userName)
  //  console.log("params: ", req.params['userName']);

  //myVariableServer = "now we have posted"

  res.render('index', 
  {
    'myVariableClient': req.body.userName 
  });
})

app.get('/', function (req, res) {
  res.send('Hello World From Express and a Paas/Render' )
})

app.get('/whatever', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})


app.listen(4000);