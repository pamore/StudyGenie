'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './studyGroup.events';

var StudyGroupSchema = new mongoose.Schema({
  name: String,
  description: String,
  domain: String,
  members: [
    {user: String, timestamp: String}
  ]
});

registerEvents(StudyGroupSchema);
export default mongoose.model('Group', StudyGroupSchema);
