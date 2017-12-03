'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './studyGroup.events';

var StudyGroupSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(StudyGroupSchema);
export default mongoose.model('StudyGroup', StudyGroupSchema);
