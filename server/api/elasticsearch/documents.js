/* eslint-disable indent,camelcase */
const express = require('express');
const router = express.Router();

// const fs = require('fs');
const elastic = require('./elasticsearch');
const ElasticsearchCSV = require('elasticsearch-csv');

// const query_data = require('../data');

/* GET suggestions */
// router.get('/suggest/:input', function (req, res, next) {
//   elastic.getSuggestions(req.params.input).then(function (result) {
//     res.json(result)
//   }, function (err) {
//     console.log(err);
//   });
// });
//
// router.get('/search', function (req, res, next) {
//   let promises = [];
//   for (let i = 0; i < query_data.length; i++) {
//     promises.push(elastic.getSuggestions(query_data[i]));
//   }
//   Promise.all(promises).then(function(values) {
//     console.log(values.length);
//     res.json(values);
//   })
// });
//
// /* POST document to be indexed */
// router.post('/', function (req, res, next) {
//   elastic.addDocument(req.body).then(function (result) {
//     res.json(result)
//   });
// });
//
// router.post('/addAllDocuments', function (req, res, next) {
//   elastic.indexExists().then(function (exists) {
//     if (exists) {
//       return elastic.deleteIndex();
//     }
//   }).then(function () {
//     return elastic.initIndex().then(elastic.initMapping).then(function (resp) {
//       //Add a few titles for the autocomplete
//       //elasticsearch offers a bulk functionality as well, but this is for a different time
//       console.log(resp);
//       let bulkAddDocs = prepareJsonToIndex([]);
//       return elastic.bulkAdd(bulkAddDocs);
//     }, function (err) {
//       console.log(err);
//     });
//   }).then((resp) => res.json(resp), (err) => res.err(err));
// });
//
function prepareJsonToIndex(bulk_request, notes) {
  // console.log('here');
  // console.log(notes);
  for(let i = 1; i < notes.length; i++) {
    // let currentJsonFile = JSON.parse(fs.readFileSync("./json_files/" + i + ".json"));
    bulk_request.push({index: {_index: 'adaptivewebfinalproject', _type: 'document', _id: i}});
    delete notes[i]._id;
    bulk_request.push(notes[i]);
  }
  return bulk_request;
}
// create an instance of the importer with options
let esCSV = new ElasticsearchCSV({
  es: {index: 'adaptivewebfinalproject', type: 'document', host: 'localhost:9200'},
  csv: {filePath: './assets/notecards.csv', headers: true}
});

/* POST document to be indexed */
router.post('/addAllDocuments', (req, res, next) => {
  elastic.indexExists().then(function(exists) {
    if(exists) {
      return elastic.deleteIndex();
    }
  })
    .then(function() {
    // return esCSV.import()
    //   .then(function(response) {
    //     // Elasticsearch response for the bulk insert
    //     console.log('csv imported');
    //   }, function(err) {
    //     // throw error
    //     throw err;
    //   });
      return elastic.initIndex().then(elastic.initMapping)
        .then(function(resp) {
      //Add a few titles for the autocomplete
      //elasticsearch offers a bulk functionality as well, but this is for a different time
      // console.log(resp);
      // console.log(notescontroller.getCurrentNotes());
      let bulkAddDocs = prepareJsonToIndex([], req.body.notes);
      // return new Promise((resolve, reject) => {
      //   resolve(elastic.bulkAdd(bulkAddDocs));
        return elastic.bulkAdd(bulkAddDocs);
      // });
      // let promises = [];
      // for(let i = 0; i <= bulkAddDocs.length / 100; i++) {
      //   promises.push(elastic.bulkAdd(bulkAddDocs));
      // }
      // // console.log(bulkAddDocs);
      //     Promise.all(promises).then(function(values) {
      //       console.log(values.length);
      //       res.json(values);
      // })
    }, function(err) {
      console.log(err);
    });
  })
    .then(resp => res.json(resp), err => res.json(err));
});

router.get('/search/:searchstring', function(req, res, next) {
  console.log(req.params);
  elastic.getSuggestions(req.params.searchstring).then(function(response) {
    console.log(response);
    res.json(response);
  });
});

module.exports = router;
