'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './control.events';

var ControlSchema = new mongoose.Schema({
  name: String,
  description: String,
  position: { x: Number, y: Number },
  behaviors: [{event: String, action: mongoose.Schema.Types.ObjectId}]
});

registerEvents(ControlSchema);
export default mongoose.model('Control', ControlSchema);
