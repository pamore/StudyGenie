/**
 * StudyGroup model events
 */

'use strict';

import {EventEmitter} from 'events';
var StudyGroupEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StudyGroupEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(StudyGroup) {
  for(var e in events) {
    let event = events[e];
    StudyGroup.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    StudyGroupEvents.emit(event + ':' + doc._id, doc);
    StudyGroupEvents.emit(event, doc);
  };
}

export {registerEvents};
export default StudyGroupEvents;
