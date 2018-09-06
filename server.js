const express = require('express');
const bodyParser = require('body-parser');
const { isEqual } = require('lodash');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/api/compareFiles', (req, res) => {
  const file = fs.readFileSync('compareFile.json');
  const fileData = JSON.parse(file.toString());
  const condition = isEqual(fileData, req.body);
  let data = {};

  if (condition) {
    data = { success: true };

    fs.writeFile("approved.json", Buffer.from(JSON.stringify(data)), function(err) {
      if (err) {
        data = { error: true };
        return console.log(err);
      }

      console.log('created approve');
    });
  } else {
    data = { success: false }

    fs.writeFile("rejected.json", Buffer.from(JSON.stringify(data)), function(err) {
      if (err) {
        data = { error: true };
        return console.log(err);
      }

      console.log('created reject');
    });
  }

  res.send({ data });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
