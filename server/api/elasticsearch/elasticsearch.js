var elasticsearch = require('elasticsearch');
const express = require('express');
const router = express.Router();
var elasticClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'info'
});

var indexName = "adaptivewebfinalproject";

/**
 * Delete an existing index
 */
function deleteIndex() {
  return elasticClient.indices.delete({
    index: indexName
  });
}

exports.deleteIndex = deleteIndex;

/**
 * create the index
 */
function initIndex() {
  return elasticClient.indices.create({
    index: indexName
  });
}

exports.initIndex = initIndex;

/**
 * check if the index exists
 */
function indexExists() {
  return elasticClient.indices.exists({
    index: indexName
  });
}

exports.indexExists = indexExists;

function initMapping() {
  return elasticClient.indices.putMapping({
    index: indexName,
    type: "document",
    body: {
      properties: {
        title: {type: "text", "similarity": "BM25"},
        content: {type: "text", "similarity": "BM25"},
        suggest: {
          type: "completion",
          analyzer: "english",
          search_analyzer: "english"
          // payloads: true
        }
      }
    }
  });
}

exports.initMapping = initMapping;

function addDocument(document) {
  return elasticClient.index({
    index: indexName,
    type: "document",
    body: {
      title: document.title,
      content: document.content,
      suggest: {
        input: document.title.split(" "),
        // output: document.title,
        // payload: document.metadata || {}
      }
    }
  });
}

exports.addDocument = addDocument;

function getSuggestions(input) {
  let query;
  if(input !== '' && input !== ' ' && input !== 'empty') {
    query = {
      multi_match: {
        query: input,
        type: 'best_fields',
        fields: ['title', 'content']
      }
    };
  }
  else {
    query = {
      match_all: {}
    };
  }
  return elasticClient.search({
    index: indexName,
    //type: "document",
    body: {
      //   docsuggest: {
      //     text: input,
      //     completion: {
      //         field: "content",
      //        // fuzzy: true
      //     }
      // }
      from: 0,
      size: 10000,
      query: query
      // }
    }
  });
}

exports.getSuggestions = getSuggestions;


function bulkAdd(document) {
  return elasticClient.bulk(
    {
      body: document
    });
}

exports.bulkAdd = bulkAdd;
