'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './form.events';

var FormSchema = new mongoose.Schema({
  name: String,
  fields: [mongoose.Schema.Types.ObjectId],
  behaviors: [{ event: String, action: mongoose.Schema.Types.ObjectId}],
  controls: [mongoose.Schema.Types.ObjectId],
  description: String
});

registerEvents(FormSchema);
export default mongoose.model('Form', FormSchema);
