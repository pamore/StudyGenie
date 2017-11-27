/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/notes              ->  index
 * POST    /api/notes              ->  create
 * GET     /api/notes/:id          ->  show
 * PUT     /api/notes/:id          ->  upsert
 * PATCH   /api/notes/:id          ->  patch
 * DELETE  /api/notes/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Notes from './notes.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Notess
export function index(req, res) {

  return Notes.find().limit(10).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));

}

// Gets a single Notes from the DB
export function show(req, res) {
  return Notes.findById(req.params.id).limit(10).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Notes in the DB
export function create(req, res) {
  return Notes.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Notes in the DB at the specified ID
export function upsert(req, res) {
  if(req.body.n_id) {
    Reflect.deleteProperty(req.body, 'n_id');
  }
  return Notes.findOneAndUpdate({n_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Notes in the DB
export function patch(req, res) {
  if(req.body.n_id) {
    Reflect.deleteProperty(req.body, 'n_id');
  }
  return Notes.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Notes from the DB
export function destroy(req, res) {
  return Notes.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
