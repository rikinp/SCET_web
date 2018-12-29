const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
var db


const express = require('express');
const app = express();
app.set('view engine', 'ejs')


app.use(bodyParser.urlencoded({extended: true}))



MongoClient.connect('mongodb://aditdoshi:Adoshi123@ds119853.mlab.com:19853/scet', (err, client) => {
  if (err) return console.log(err)
  db = client.db('scet') 
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})



app.get('/', function(req, res) {
  res.send('Welcome to Scet buy/sell stuff')
})

app.get('/sell', (req, res) => {
  res.sendFile(__dirname + '/scet.html')

})


app.post('/sell', (req, res) => {
  db.collection('book').save(req.body, (err, result) => {
     if (err) return console.log(err)

     console.log('saved to database')
     res.redirect('/')
   })
 })




app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
