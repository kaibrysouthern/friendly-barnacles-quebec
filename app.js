const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World From Express and a Paas/Render' )
})

app.listen(3000)