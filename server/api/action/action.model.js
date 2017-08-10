'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './action.events';

var ActionSchema = new mongoose.Schema({
  function: {name: String, parameters: [String], result: String},
  description: String
});

registerEvents(ActionSchema);
export default mongoose.model('Action', ActionSchema);
