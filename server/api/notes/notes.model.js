'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './notes.events';

var NotesSchema = new mongoose.Schema({
  n_id: Number,
  author_id: String,
  title: String,
  content: String,
  type: Number
});

registerEvents(NotesSchema);
export default mongoose.model('Note', NotesSchema);
