/**
 * Notes model events
 */

'use strict';

import {EventEmitter} from 'events';
var NotesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
NotesEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Notes) {
  for(var e in events) {
    let event = events[e];
    Notes.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    NotesEvents.emit(event + ':' + doc._id, doc);
    NotesEvents.emit(event, doc);
  };
}

export {registerEvents};
export default NotesEvents;
