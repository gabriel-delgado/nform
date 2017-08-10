'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './field.events';

var FieldSchema = new mongoose.Schema({
  name: String,
  description: String,
  properties: { x: Number, y: Number, sizeX: Number, sizeY: Number },
  type: String,
  behaviors: [{event: String, action: mongoose.Schema.Types.ObjectId}]
});

registerEvents(FieldSchema);
export default mongoose.model('Field', FieldSchema);
