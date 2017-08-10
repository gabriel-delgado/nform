/**
 * Control model events
 */

'use strict';

import {EventEmitter} from 'events';
var ControlEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ControlEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Control) {
  for(var e in events) {
    let event = events[e];
    Control.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ControlEvents.emit(event + ':' + doc._id, doc);
    ControlEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ControlEvents;
