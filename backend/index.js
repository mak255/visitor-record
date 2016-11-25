const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const elasticsearch = require('elasticsearch');


// elasticsearch instance
var es = new elasticsearch.Client({
  host: '192.168.1.135:9200',
  log: 'trace',
});

// it will server static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hey I am working');
});

app.get('/user', (req, res) => {
    console.log(req);
    res.send('I have received your request');
});

app.post('/user', (req, res) => {
  es.create({
    index: 'users',
    type: 'user',
    id: req.body.id,
    body: {
      username: req.body.username,
      password: req.body.password,
    },
  }, (err, response) => {
      res.send(req.body);
    });
});

app.listen(3030, () => {
  console.log('Server is running on port 3030');
});
