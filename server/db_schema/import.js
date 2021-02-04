const fs = require('fs');
const pool = require('../db');
const fastcsv = require('fast-csv');

let stream = fs.createReadStream('books.csv')
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    const query = `INSERT INTO books (isbn, title, author, year) VALUES ($1, $2, $3, $4)`;

    pool.connect((err, client, done) => {
      if (err) throw err;
      try {
        csvData.forEach(row => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done(); // releases the pg client pool when process is all finished.
      }
    });
  });

  stream.pipe(csvStream);
