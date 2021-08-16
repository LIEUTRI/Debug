var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */

router.post('/log', function(req, res, next) {
  fs.writeFileSync('./vpdtlog.txt', JSON.stringify(req.body));  
  res.send(req.body)
});

router.get('/', function(req, res, next) {
  fs.exists('./vpdtlog.txt', (exists) => {
    console.log(exists ? 'Found' : 'Not Found!');
    if(exists){
      fs.readFile('./vpdtlog.txt', function read(err, data) {
      if (err) {
        throw err;
      }
      const content = data;

      // Invoke the next step here however you like
      console.log(content);   // Put all of the code here (not the best solution)
      res.render('index', { title: 'CTU eOffice', data: content });
      });
    } else {
	res.render('index', { title: 'CTU eOffice', data: 'empty' });
    }
  });
});

module.exports = router;
