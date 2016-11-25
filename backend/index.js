const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const elasticsearch = require('elasticsearch');


// elasticsearch instance
var es = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
});

// it will server static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
  res.send('Hey I am working');
});

// user info
app.get('/user/:id', (req, res) => {
  es.get({
    index: 'ghoomakad',
    type: 'userdata',
    id: req.params.id,
  }, (error, response) => {
    if (error) res.send(error);
    else res.send(response);
  });
});

app.put('/user/:id', (req, res) => {
  // update
  console.log(req.body);
  es.update({
    index: 'ghoomakad',
    type: 'userdata',
    id: req.params.id,
    body: {
      doc: {
          f_name: req.body.f_name,
          l_name: req.body.l_name,
          mobile_no: req.body.mobile_no,
          email: req.body.email,
          nationality: req.body.nationality,
          passport: req.body.passport,
          visa: req.body.visa,
          stay_from: req.body.stay_from,
          stay_to: req.body.stay_to,
          intend: req.body.intend,
        },
    },
  }, (error, response) => {
    if (error) res.send(error);
    else res.send(response);
  });
});

app.delete('/user/:id', (req, res) => {
  es.delete({
    index: 'ghoomakad',
    type: 'userdata',
    id: req.params.id,
  }, (error, response) => {
    if (error) res.send(error);
    else res.send(response);
  });
});

app.post('/user', (req, res) => {
  es.create({
    index: 'ghoomakad',
    type: 'userdata',
    id: req.body.id,
    body: {
      f_name: req.body.f_name,
      l_name: req.body.l_name,
      mobile_no: req.body.mobile_no,
      email: req.body.email,
      nationality: req.body.nationality,
      passport: req.body.passport,
      visa: req.body.visa,
      stay_from: req.body.stay_from,
      stay_to: req.body.stay_to,
      intend: req.body.intend,
    },
  }, (error, response) => {
      res.send(req.body);
    });
});

app.listen(3030, () => {
  console.log('Server is running on port 3030');
});
