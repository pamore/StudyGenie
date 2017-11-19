'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './notes.events';

var NotesSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(NotesSchema);
export default mongoose.model('Notes', NotesSchema);
